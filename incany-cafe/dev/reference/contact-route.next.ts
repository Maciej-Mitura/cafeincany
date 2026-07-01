/**
 * Reference only — former Next.js App Router contact handler.
 *
 * This file is NOT part of the App Router and is not executed at runtime.
 * Production uses: functions/api/contact.ts (Cloudflare Pages Function)
 *
 * For local end-to-end contact-form testing, use:
 *   npm run preview:pages
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website?: string;
  turnstileToken?: string;
}

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
  } catch {
    console.error("Turnstile verification failed");
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;
    const { name, email, message, website, turnstileToken } = body;

    if (website) {
      return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Alle velden zijn verplicht" }, { status: 400 });
    }

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

    if (!turnstileToken) {
      return NextResponse.json({ error: "Veiligheidscontrole is verplicht" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";

    const isTurnstileValid = await verifyTurnstile(turnstileToken, ip);
    if (!isTurnstileValid) {
      return NextResponse.json({ error: "Veiligheidscontrole mislukt. Probeer het opnieuw." }, { status: 403 });
    }

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
          <body>
            <p>${safeMessage}</p>
            <p>Naam: ${safeName}</p>
            <p>E-mail: ${safeEmail}</p>
            <p>Verzonden op: ${dateStr} om ${timeStr}</p>
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
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });
    }

    console.error("Contact form submission failed");
    return NextResponse.json({ error: "Er ging iets mis bij het verzenden van het bericht" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method niet toegestaan" }, { status: 405 });
}
