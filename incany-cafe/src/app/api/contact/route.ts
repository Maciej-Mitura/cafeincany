import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// This route is for LOCAL DEVELOPMENT only
// When deployed to Cloudflare Pages, it uses src/functions/api/contact.ts instead

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<ContactFormData>;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Alle velden zijn verplicht' },
        { status: 400 }
      );
    }

    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('nl-BE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('nl-BE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const result = await resend.emails.send({
      from: 'Incany Website <info@incany.be>',
      to: 'info@incany.be',
      replyTo: email,
      subject: `Nieuw contactbericht van ${name}`,
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
              
              <div class="message-content">${message.replace(/\n/g, '<br/>')}</div>
              
              <div class="footer">
                <div class="footer-line">Naam: ${name}</div>
                <div class="footer-line">E-mail: ${email}</div>
                <div class="footer-line">Verzonden op: ${dateStr} om ${timeStr}</div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Nieuw contactbericht

${message}

---
Naam: ${name}
E-mail: ${email}
Verzonden op: ${dateStr} om ${timeStr}
      `,
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het verzenden van het bericht' },
      { status: 500 }
    );
  }
}
