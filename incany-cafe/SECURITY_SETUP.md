# Contact Form Security Setup Guide

## Overview

The contact form now implements **production-grade security** with multiple protection layers:

1. **Cloudflare Turnstile** - Bot protection (CAPTCHA alternative)
2. **Honeypot Field** - Hidden spam trap
3. **Server-side Validation** - Strict input validation
4. **HTML Sanitization** - XSS prevention in email templates
5. **Rate Limiting** - Manual Cloudflare configuration (see below)

---

## 1. Cloudflare Turnstile Setup

### What is Turnstile?

Cloudflare Turnstile is a privacy-friendly CAPTCHA alternative that runs invisible challenges to verify humans without annoying interactions.

### Create Turnstile Widget

1. Log into **Cloudflare Dashboard**
2. Navigate to **Turnstile** (in the left sidebar)
3. Click **Add Site** or **Create Widget**
4. Configure:
   - **Site Name**: Café Incany Contact Form
   - **Domain**: `incany.be` (or your domain)
   - **Widget Mode**: Managed (recommended)
5. Click **Create**
6. Copy two keys:
   - **Site Key** (public, visible in browser) → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Secret Key** (private, server-only) → `TURNSTILE_SECRET_KEY`

### For Local Development (Optional)

Cloudflare provides **test keys** that always pass:

```bash
# Always passes validation (for local testing)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Always fails validation (for error testing)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=2x00000000000000000000AB
TURNSTILE_SECRET_KEY=2x0000000000000000000000000000000AA

# Always shows interactive challenge (for UI testing)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=3x00000000000000000000FF
TURNSTILE_SECRET_KEY=3x0000000000000000000000000000000FF
```

---

## 2. Environment Variables Configuration

### Local Development (.env.local)

Create `.env.local` in the project root (this file is gitignored):

```bash
# Resend email API
RESEND_API_KEY=re_your_actual_resend_key_here

# Turnstile keys (use test keys or real keys)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

### Cloudflare Pages (Production)

1. Go to **Cloudflare Dashboard** → **Pages**
2. Select your project (e.g., `incany-cafe`)
3. Go to **Settings** → **Environment Variables**
4. Add these variables for **Production** AND **Preview**:

| Variable Name | Value | Type | Notes |
|---------------|-------|------|-------|
| `RESEND_API_KEY` | `re_xxxxx...` | Secret | Email sending |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key from Turnstile | Public | Safe to expose |
| `TURNSTILE_SECRET_KEY` | Secret key from Turnstile | Secret | Never expose |

5. Click **Save**
6. **Redeploy** your site for changes to take effect

### Important Notes

- `NEXT_PUBLIC_*` variables are **public** and embedded in the browser bundle
- Variables without `NEXT_PUBLIC_` prefix are **server-only** and never exposed
- **Never commit** `.env.local` to Git (it's already in `.gitignore`)
- **Never hardcode** API keys or secrets in code

---

## 3. Cloudflare Rate Limiting Setup

**This MUST be configured manually** in the Cloudflare Dashboard (cannot be done via code).

### Create Rate Limiting Rule

1. Go to **Cloudflare Dashboard** → Select your domain
2. Navigate to **Security** → **WAF** → **Rate limiting rules**
3. Click **Create rule**
4. Configure:

**Rule Name**: `Contact Form Protection`

**Expression (Match)**:
```
(http.request.uri.path eq "/api/contact" and http.request.method eq "POST")
```

**Characteristics**: `IP Address`

**Period**: `10 minutes`

**Requests**: `3`

**Action**: `Block`

**Duration**: `1 hour`

**Response**:
- **Status Code**: `429`
- **Custom Response** (optional):
  ```json
  {
    "error": "Te veel aanvragen. Probeer het later opnieuw."
  }
  ```

5. Click **Deploy**

### What This Does

- Allows **3 form submissions per 10 minutes** per IP address
- Blocks the IP for **1 hour** after exceeding the limit
- Returns HTTP 429 (Too Many Requests) with a Dutch error message
- Prevents spam bots and abuse

---

## 4. Protection Layers Explained

### Layer 1: Honeypot Field

**What it is**: A hidden `website` field that humans never see but bots auto-fill.

**How it works**:
- Field is positioned off-screen (`left: -9999px`)
- Has `aria-hidden="true"` for screen readers
- If filled, request is **silently rejected** with status 400
- No indication given that honeypot was triggered (confuses bots)

**Code location**: `src/components/Contact.tsx` (line ~192)

### Layer 2: Cloudflare Turnstile

**What it is**: Bot detection using browser challenges.

**How it works**:
- Widget loads when user visits page
- Runs invisible challenges (JavaScript, browser fingerprinting, etc.)
- Generates a token if human is detected
- Token is sent with form submission
- Server verifies token with Cloudflare Siteverify API
- Token is **single-use** and expires in 5 minutes

**Security benefits**:
- Blocks automated bots (scrapers, spam tools)
- Prevents credential stuffing
- No impact on legitimate users (invisible most of the time)

**Code locations**:
- Frontend: `src/components/Contact.tsx` (Turnstile widget)
- Backend: `src/app/api/contact/route.ts` + `src/functions/api/contact.ts` (verification)

### Layer 3: Server-side Validation

**What it validates**:

| Field | Rules |
|-------|-------|
| Name | Required, 2-100 characters, trimmed |
| Email | Required, valid format, max 254 characters |
| Message | Required, 10-5000 characters, trimmed |
| Turnstile | Valid token required |

**Why client + server validation**:
- **Client-side**: Fast feedback, better UX
- **Server-side**: Cannot be bypassed, actual security

**Error responses**: Generic Dutch messages, no implementation details exposed

### Layer 4: HTML Sanitization

**What it does**: Escapes HTML entities in user input before inserting into email template.

**Characters escaped**:
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#039;`

**Why it matters**:
- Prevents HTML injection in emails
- Protects against XSS-like attacks in email clients
- Preserves line breaks safely (`\n` → `<br/>`)

**Code location**: `escapeHtml()` function in both API handlers

### Layer 5: Rate Limiting

**What it does**: Limits form submissions per IP address (see Cloudflare setup above).

**Why it matters**:
- Prevents spam floods
- Stops brute force attempts
- Conserves Resend API quota (100 emails/day on free tier)
- Reduces email inbox noise

---

## 5. Testing the Security

### Test Locally

1. Start dev server:
   ```bash
   cd incany-cafe
   npm run dev
   ```

2. Open http://localhost:3000 and scroll to contact form

3. **Test valid submission**:
   - Fill all fields correctly
   - Complete Turnstile challenge
   - Submit
   - Should see "Bericht verzonden!" success message
   - Check `info@incany.be` inbox for email

4. **Test validation errors**:
   - Leave name empty → "Naam is verplicht"
   - Enter invalid email → "Voer een geldig e-mailadres in"
   - Short message (< 10 chars) → "Bericht moet minstens 10 karakters bevatten"

5. **Test Turnstile failure**:
   - Use failing test key: `2x00000000000000000000AB`
   - Submit form
   - Should see "Veiligheidscontrole mislukt"

6. **Test honeypot** (requires browser dev tools):
   - Open browser console
   - Fill form normally
   - Before submitting, run:
     ```javascript
     document.querySelector('input[name="website"]').value = 'bot-filled-this';
     ```
   - Submit form
   - Should be rejected with "Ongeldig verzoek" (but user never sees honeypot triggered)

### Test in Production

1. Deploy to Cloudflare Pages (with environment variables configured)
2. Visit your live site
3. Test form submission end-to-end
4. Verify email arrives at `info@incany.be`
5. Test rate limiting:
   - Submit form 3 times in quick succession
   - 4th attempt should return HTTP 429
   - Wait 10 minutes or use VPN/mobile network to test from different IP

---

## 6. Monitoring and Logs

### What Gets Logged

**Safe to log** (no sensitive data):
- "Contact form submission failed" (generic error)
- "Turnstile verification failed" (when token invalid)

**Never logged**:
- User's name, email, or message content
- API keys or secrets
- Full error stack traces (in production)
- Resend API responses (may contain sensitive data)

### Cloudflare Logs

View real-time logs in **Cloudflare Dashboard** → **Pages** → Your project → **Functions** tab.

Look for:
- 200 responses (success)
- 400 responses (validation failure or honeypot)
- 403 responses (Turnstile failure)
- 429 responses (rate limited)
- 500 responses (server error - investigate immediately)

---

## 7. Security Checklist

Before public launch, verify:

- [ ] **Turnstile widget** is created in Cloudflare Dashboard
- [ ] **Real Turnstile keys** are configured (not test keys)
- [ ] **Environment variables** are set in Cloudflare Pages (Production + Preview)
- [ ] **Rate limiting rule** is created and enabled in Cloudflare WAF
- [ ] **`.env.local` is NOT committed** to Git (check `.gitignore`)
- [ ] **Resend API key is revoked** if previously exposed
- [ ] **Contact form works end-to-end** (local + production)
- [ ] **Email arrives** at `info@incany.be` with correct formatting
- [ ] **Validation errors** show correct Dutch messages
- [ ] **Rate limiting** blocks after 3 requests (test with VPN)
- [ ] **Resend domain is verified** (or emails may go to spam)

---

## 8. Troubleshooting

### Turnstile widget doesn't appear

**Cause**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` not set or incorrect.

**Fix**:
- Check `.env.local` contains correct site key
- Restart dev server after adding env vars
- Verify key starts with `0x` or `1x` (test) or is a long alphanumeric string (real)

### "Veiligheidscontrole is verplicht" error

**Cause**: Turnstile token missing or invalid.

**Fix**:
- Ensure widget loaded (check browser console for errors)
- Check `TURNSTILE_SECRET_KEY` is set in server environment
- Verify secret key matches site key (both from same widget)

### Emails not arriving

**Cause**: Multiple possibilities.

**Fix**:
1. Check Resend API key is correct
2. Verify Resend domain is verified (or use `onboarding@resend.dev` as sender)
3. Check spam folder
4. Review Cloudflare Functions logs for errors
5. Check Resend dashboard for delivery logs

### Rate limiting not working

**Cause**: Rule not configured in Cloudflare.

**Fix**:
- Follow **Section 3** above to create the rule manually
- Verify rule is **deployed** (not just saved)
- Test from different IPs (VPN, mobile network)

### "Ongeldig verzoek" with valid data

**Cause**: Honeypot field filled (usually means bot) OR malformed JSON.

**Fix**:
- This is expected for bots (no fix needed)
- If legitimate users hit this, check browser extensions (auto-fill tools may trigger honeypot)
- Review browser console for JavaScript errors

---

## 9. Future Enhancements

**Not required for launch**, but consider:

1. **Email auto-reply**: Send confirmation email to user via Resend
2. **Admin notifications**: Alert via Slack/Discord when form submitted
3. **Analytics**: Track form submission success/failure rates
4. **A/B testing**: Test different Turnstile widget modes
5. **GDPR compliance**: Add checkbox for "I agree to privacy policy"
6. **Spam scoring**: Integrate additional checks (email domain reputation, etc.)

---

## 10. Support

**For Turnstile issues**: https://developers.cloudflare.com/turnstile/

**For Resend issues**: https://resend.com/docs

**For rate limiting**: https://developers.cloudflare.com/waf/rate-limiting-rules/

---

**Security implementation complete!** ✅

The contact form is now protected against:
- ✅ Automated bots
- ✅ Spam floods
- ✅ XSS attacks
- ✅ Injection attacks
- ✅ Rate limit abuse
- ✅ Data validation bypass
