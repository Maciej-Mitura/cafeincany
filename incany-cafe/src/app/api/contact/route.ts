import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// This route is for LOCAL DEVELOPMENT only
// When deployed to Cloudflare Pages, it uses src/functions/api/contact.ts instead

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field
  turnstileToken?: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

// HTML entity escaping for email template
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

// Verify Turnstile token
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return false;
  }

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
  } catch (error) {
    console.error("Turnstile verification failed");
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = (await request.json()) as Partial<ContactFormData>;
    const { name, email, message, website, turnstileToken } = body;

    // Honeypot check - reject if filled
    if (website) {
      return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Alle velden zijn verplicht" }, { status: 400 });
    }

    // Validate field lengths and formats
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json({ error: "Naam moet tussen 2 en 100 karakters bevatten" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json({ error: "Voer een geldig e-mailadres in" }, { status: 400 });
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      return NextResponse.json({ error: "Bericht moet tussen 10 en 5000 karakters bevatten" }, { status: 400 });
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json({ error: "Veiligheidscontrole is verplicht" }, { status: 403 });
    }

    // Get visitor IP (for local dev, use a fallback)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";

    const isTurnstileValid = await verifyTurnstile(turnstileToken, ip);
    if (!isTurnstileValid) {
      return NextResponse.json({ error: "Veiligheidscontrole mislukt. Probeer het opnieuw." }, { status: 403 });
    }

    // Get current date and time
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

    // Escape HTML in user inputs
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

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (err) {
    // Log error without exposing details
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });
    }

    console.error("Contact form submission failed");
    return NextResponse.json({ error: "Er ging iets mis bij het verzenden van het bericht" }, { status: 500 });
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method niet toegestaan" }, { status: 405 });
}
