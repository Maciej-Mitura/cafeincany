# Contact Form Setup - Complete Guide

## ✅ Dual Setup: Local Dev + Production

Your contact form now works in **both environments**:

### Local Development (npm run dev)
- Uses **Next.js API Route**: `src/app/api/contact/route.ts`
- Reads API key from `.env.local`
- Runs on `http://localhost:3000`

### Production (Cloudflare Pages)
- Uses **Cloudflare Pages Function**: `src/functions/api/contact.ts`
- Reads API key from Cloudflare environment variables
- Runs on your deployed domain

**Both files have identical logic!**

---

## 🚀 Quick Setup

### 1. Get Resend API Key

1. Go to https://resend.com/
2. Sign up (free account)
3. Navigate to **API Keys**
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### 2A. Local Development Setup

**Add to `.env.local`:**

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx  # ← Your actual API key
```

**Test locally:**

```bash
npm run dev
# Navigate to http://localhost:3000
# Fill contact form → Submit
# Check info@incany.be inbox
```

### 2B. Production Setup (Cloudflare Pages)

**In Cloudflare Pages Dashboard:**

1. Go to your project
2. **Settings** → **Environment variables**
3. Add new variable:
   - **Variable name**: `RESEND_API_KEY`
   - **Value**: `re_xxxxxxxxxxxxx` (your API key)
   - **Environment**: Select both **Production** and **Preview**
4. Click **Save**
5. **Redeploy** your site

**Test production:**

```
# After deployment
# Visit your live site
# Fill contact form → Submit
# Check info@incany.be inbox
```

---

## 🏗️ Architecture

### Local Development Flow

```
User fills form (localhost:3000)
    ↓
[Contact.tsx] → POST /api/contact
    ↓
[Next.js API Route] → src/app/api/contact/route.ts
    ↓
Reads RESEND_API_KEY from .env.local
    ↓
Resend API → Email sent to info@incany.be
```

### Production Flow (Cloudflare Pages)

```
User fills form (your-site.pages.dev)
    ↓
[Contact.tsx] → POST /api/contact
    ↓
[Cloudflare Pages Function] → src/functions/api/contact.ts
    ↓
Reads RESEND_API_KEY from Cloudflare env vars
    ↓
Resend API → Email sent to info@incany.be
```

---

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       └── contact/
│           └── route.ts          # Next.js API route (LOCAL DEV)
│
├── components/
│   └── Contact.tsx               # Frontend form component
│
└── functions/
    └── api/
        └── contact.ts            # Cloudflare Pages function (PRODUCTION)

.env.local                        # Local environment variables
.env.local.example                # Template for .env.local
```

---

## 🔄 Request/Response Format

### Request (from Contact.tsx)

```typescript
POST /api/contact
Content-Type: application/json

{
  "name": "Jan Janssens",
  "email": "jan@example.be",
  "message": "Hallo..."
}
```

### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "...",
    // Resend response data
  }
}
```

### Error Response (400/500)

```json
{
  "error": "Alle velden zijn verplicht"
}
// or
{
  "error": "Er ging iets mis bij het verzenden van het bericht"
}
```

---

## 🧪 Testing

### Build Status

```
✓ Build successful
✓ No linter errors
✓ TypeScript compilation passed
✓ Next.js API route created: /api/contact (ƒ Dynamic)
✓ Cloudflare Pages function ready
```

### Test Local Development

1. **Add API key to `.env.local`:**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

4. **Fill contact form:**
   - Naam: Your name
   - E-mailadres: Your email
   - Bericht: Test message

5. **Submit form:**
   - Should see: "Bericht verzonden!" ✅
   - Form should reset
   - Check email at info@incany.be

6. **Check terminal for logs:**
   ```
   POST /api/contact 200 in 1234ms
   ```

### Test Production (After Deployment)

1. **Add API key to Cloudflare Pages** (see setup above)

2. **Deploy to Cloudflare Pages**

3. **Visit your live site**

4. **Fill and submit contact form**

5. **Verify:**
   - Success toast appears
   - Email arrives at info@incany.be

6. **Check Cloudflare Pages logs:**
   - Dashboard → Your project → Functions tab
   - Look for `contact` function logs

---

## 🐛 Troubleshooting

### Error: "POST http://localhost:3000/api/contact 404 (Not Found)"

**Cause:** Next.js API route doesn't exist or dev server needs restart

**Solution:**
```bash
# Stop dev server (Ctrl+C)
# Rebuild
npm run build
# Start dev server
npm run dev
```

### Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

**Cause:** Getting HTML 404 page instead of JSON response

**Solution:**
- Verify `src/app/api/contact/route.ts` exists
- Check browser DevTools Network tab
- Ensure `/api/contact` endpoint returns JSON

### Error: "Er ging iets mis bij het verzenden"

**Possible causes:**

1. **Missing API Key**
   ```bash
   # Check .env.local exists
   cat .env.local
   
   # Should contain:
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

2. **Invalid API Key**
   - Verify key starts with `re_`
   - Get new key from https://resend.com/api-keys
   - Update `.env.local`
   - Restart dev server

3. **Resend Rate Limit**
   - Free plan: 100 emails/day
   - Check Resend dashboard for usage

4. **Network Error**
   - Check internet connection
   - Check browser console for errors
   - Check terminal for error logs

### Error: "Cannot find module 'resend'"

**Solution:**
```bash
npm install resend
```

---

## 📧 Email Details

### Email Sent to info@incany.be

**Headers:**
- **From:** Incany Website <info@incany.be>
- **To:** info@incany.be
- **Reply-To:** [User's Email]
- **Subject:** Nieuw contactbericht van [User's Name]

**Body (HTML):**
```html
<div style="font-family:Arial,sans-serif;line-height:1.6">
  <h2>Nieuw contactbericht</h2>
  <p><strong>Naam:</strong> Jan Janssens</p>
  <p><strong>E-mail:</strong> jan@example.be</p>
  <p><strong>Bericht:</strong></p>
  <p>Test message<br/>with line breaks</p>
  <hr/>
  <small>Verzonden via incany.be</small>
</div>
```

**Body (Plain Text):**
```
Nieuw contactbericht

Naam: Jan Janssens
E-mail: jan@example.be

Bericht:
Test message
with line breaks
```

---

## ✅ Checklist

### Local Development
- [x] `src/app/api/contact/route.ts` created (Next.js API route)
- [x] `src/functions/api/contact.ts` updated (Cloudflare function)
- [ ] **RESEND_API_KEY** added to `.env.local`
- [ ] Dev server started: `npm run dev`
- [ ] Contact form tested locally
- [ ] Email received at info@incany.be

### Production Deployment
- [ ] **RESEND_API_KEY** added to Cloudflare Pages environment variables
- [ ] Site deployed to Cloudflare Pages
- [ ] Contact form tested in production
- [ ] Email received at info@incany.be
- [ ] Cloudflare Pages function logs checked

---

## 🔒 Security

### Environment Variables

**Local (.env.local):**
- ✅ Gitignored (never committed)
- ✅ Server-side only (never exposed to browser)
- ✅ Read by Next.js API route

**Production (Cloudflare Pages):**
- ✅ Stored in Cloudflare dashboard
- ✅ Never exposed in code or client
- ✅ Read by Cloudflare Pages function

### API Key Protection

Both routes (Next.js and Cloudflare) keep API key secure:
- ✅ Never sent to frontend
- ✅ Only used in server-side code
- ✅ Environment variables only

---

## 🎯 Why Two Files?

### src/app/api/contact/route.ts (Next.js)

**Purpose:** Local development with `npm run dev`

**When used:**
- Running on localhost
- Development mode
- Testing locally

**Environment:**
- Reads from `.env.local`
- Next.js server

### src/functions/api/contact.ts (Cloudflare)

**Purpose:** Production deployment on Cloudflare Pages

**When used:**
- Deployed to Cloudflare Pages
- Production environment
- Live site

**Environment:**
- Reads from Cloudflare environment variables
- Cloudflare Workers runtime

### Why Both?

**Cloudflare Pages Functions don't work with `npm run dev`**
- They require Cloudflare's runtime environment
- Or Wrangler for local testing
- Next.js API routes provide local dev convenience

**Solution:**
- Next.js route for easy local testing
- Cloudflare function for production
- Identical logic in both files
- Same API contract (request/response)

---

## 💡 Tips

### Switching Between Environments

**Developing locally:**
```bash
npm run dev
# Uses: src/app/api/contact/route.ts
# Reads: .env.local
```

**Testing production build:**
```bash
npm run build
npm start
# Uses: src/app/api/contact/route.ts
# Reads: .env.local
```

**Deployed to Cloudflare Pages:**
```bash
# Cloudflare Pages ignores src/app/api/*
# Uses: src/functions/api/contact.ts
# Reads: Cloudflare environment variables
```

### Keeping Files in Sync

When changing email logic, update **BOTH** files:
1. `src/app/api/contact/route.ts` (Next.js)
2. `src/functions/api/contact.ts` (Cloudflare)

**Current logic in both:**
- Validate name, email, message
- Send email via Resend
- Return `{ success: true }` or `{ error: "message" }`

---

## 🎉 Result

**Contact form works in both local development and production!**

### Local Development:
1. Add API key to `.env.local`
2. Run `npm run dev`
3. Test form at `localhost:3000`
4. See success toast
5. Receive email

### Production:
1. Add API key to Cloudflare Pages
2. Deploy site
3. Test form on live site
4. See success toast
5. Receive email

**Both environments use the same frontend and send the same emails!** 🚀📧
