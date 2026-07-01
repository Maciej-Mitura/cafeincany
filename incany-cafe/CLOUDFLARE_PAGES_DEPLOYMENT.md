# Cloudflare Pages Deployment

Static Next.js export + Cloudflare Pages Functions for `POST /api/contact`.

**Do not commit secrets.** Use the dashboard for production values.

---

## Cloudflare Pages dashboard settings

| Setting | Value |
|---------|--------|
| **Repository root directory** | `incany-cafe` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Node.js version** | `20` (or newer) |

Framework preset: **None** or **Next.js (Static HTML Export)** — the build is a standard static export to `out/`.

---

## Environment variables

Configure in **Workers & Pages → your project → Settings → Environment variables** for **Production** and **Preview**.

| Variable | Type | Used by |
|----------|------|---------|
| `RESEND_API_KEY` | Secret | Pages Function `functions/api/contact.ts` |
| `TURNSTILE_SECRET_KEY` | Secret | Pages Function |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Plain text | Baked into static build at compile time |
| `NODE_VERSION` | Plain text | Optional; set to `20` |

Redeploy after changing variables.

`NEXT_PUBLIC_*` values must be present **during the build step** on Cloudflare.

---

## Architecture

```
Static site (out/)     → HTML, JS, CSS, public assets
functions/api/contact.ts → POST /api/contact (Resend + Turnstile)
public/_headers        → Security headers
public/_redirects      → www → apex redirect
```

The Next.js App Router **does not** expose `/api/contact` in production. The Pages Function handles that path.

---

## Local development

### Visual frontend only

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Contact form submissions will not work** — there is no Next.js API route in static-export mode.

### End-to-end (static site + Pages Function)

1. Copy env templates:

   ```bash
   cp .env.local.example .env.local
   cp .dev.vars.example .dev.vars
   ```

2. Fill `.env.local` (needed for `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time):

   ```env
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
   ```

3. Fill `.dev.vars` (Wrangler runtime secrets for the function):

   ```env
   RESEND_API_KEY=your_resend_key
   TURNSTILE_SECRET_KEY=your_turnstile_secret
   ```

4. Run:

   ```bash
   npm run preview:pages
   ```

   This runs `next build` then `wrangler pages dev out`. Open the URL Wrangler prints (usually `http://localhost:8788`).

5. Test the contact form on that URL.

---

## Custom domain (after first deploy)

1. Pages project → **Custom domains** → add `incany.be`
2. Add `www.incany.be` if desired (`public/_redirects` redirects www → apex)
3. Wait for SSL provisioning

**Warning:** Do **not** modify Google Workspace **MX** records when adding the website domain. Only add/change records Cloudflare instructs for the Pages site.

---

## Resend

- Verify `incany.be` at [resend.com/domains](https://resend.com/domains) before relying on production deliverability
- Sender in `functions/api/contact.ts`: `Incany Website <info@incany.be>`

---

## Function logs (production)

1. Cloudflare dashboard → **Workers & Pages** → your Pages project
2. **Deployments** → select active deployment
3. **Functions** tab → view real-time logs, or use **Logs** / **Observability** if enabled

For failed contact submissions, check logs for `Contact form submission failed` or Turnstile errors.

---

## Pre-deploy checklist

- [ ] `npm run build` succeeds and creates `out/`
- [ ] `functions/api/contact.ts` exists at project root
- [ ] No `src/app/api/**` route handlers remain
- [ ] Cloudflare env vars set (all three keys above)
- [ ] Turnstile widget allows your production hostname
- [ ] Resend domain verified (recommended)

---

## Related files

| Path | Role |
|------|------|
| `next.config.ts` | `output: 'export'`, `images.unoptimized` |
| `functions/api/contact.ts` | Production contact API |
| `dev/reference/contact-route.next.ts` | Archived Next route (reference only) |
| `.env.local.example` | Local Next build env template |
| `.dev.vars.example` | Local Wrangler function secrets template |
