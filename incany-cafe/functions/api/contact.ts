/**
 * Cloudflare Pages Function — production handler for POST /api/contact
 *
 * Deployed from: functions/api/contact.ts (project root)
 * Local E2E test: npm run preview:pages (see CLOUDFLARE_PAGES_DEPLOYMENT.md)
 */
import { Resend } from "resend";

export interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

type ContactBody = {
  name: string;
  email: string;
  message: string;
  website?: string;
  turnstileToken?: string;
};

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

async function verifyTurnstile(token: string, ip: string, secretKey: string): Promise<boolean> {
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const data = (await response.json()) as TurnstileVerifyResponse;
    return data.success;
  } catch {
    console.error("Turnstile verification failed");
    return false;
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as Partial<ContactBody>;
    const { name, email, message, website, turnstileToken } = body;

    if (website) {
      return new Response(JSON.stringify({ error: "Ongeldig verzoek" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Alle velden zijn verplicht" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return new Response(JSON.stringify({ error: "Naam moet tussen 2 en 100 karakters bevatten" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      return new Response(JSON.stringify({ error: "Voer een geldig e-mailadres in" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      return new Response(JSON.stringify({ error: "Bericht moet tussen 10 en 5000 karakters bevatten" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: "Veiligheidscontrole is verplicht" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";

    const isTurnstileValid = await verifyTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET_KEY);
    if (!isTurnstileValid) {
      return new Response(JSON.stringify({ error: "Veiligheidscontrole mislukt. Probeer het opnieuw." }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(env.RESEND_API_KEY);

    const now = new Date();
    const dateStr = now.toLocaleDateString("nl-BE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("nl-BE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br/>");

    const result = await resend.emails.send({
      from: "Incany Website <info@incany.be>",
      to: "info@incany.be",
      replyTo: trimmedEmail,
      subject: `Nieuw contactbericht van ${trimmedName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                font-size: 18px;
                font-weight: 600;
                color: #8B4513;
                margin-bottom: 24px;
                padding-bottom: 16px;
                border-bottom: 2px solid #8B4513;
              }
              .message-content {
                font-size: 15px;
                color: #333;
                margin-bottom: 32px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                font-size: 12px;
                color: #666;
                padding-top: 16px;
                border-top: 1px solid #e0e0e0;
              }
              .footer-line {
                margin: 4px 0;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                Nieuw contactbericht
              </div>
              
              <div class="message-content">${safeMessage}</div>
              
              <div class="footer">
                <div class="footer-line">Naam: ${safeName}</div>
                <div class="footer-line">E-mail: ${safeEmail}</div>
                <div class="footer-line">Verzonden op: ${dateStr} om ${timeStr}</div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Nieuw contactbericht

${trimmedMessage}

---
Naam: ${trimmedName}
E-mail: ${trimmedEmail}
Verzonden op: ${dateStr} om ${timeStr}
      `,
    });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return new Response(JSON.stringify({ error: "Ongeldig verzoek" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Contact form submission failed");
    return new Response(JSON.stringify({ error: "Er ging iets mis bij het verzenden van het bericht" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ error: "Method niet toegestaan" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};
