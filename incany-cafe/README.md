# Café In Cany Website

**Production website for Café In Cany** - Bruine kroeg in Moorslede, Belgium.

🌐 **Live Site:** https://incany.be  
🏗️ **Tech Stack:** Next.js 16 + Cloudflare Pages + Cloudflare Pages Functions  
📧 **Contact Form:** Resend API + Cloudflare Turnstile  
🔒 **Security:** Production-ready headers, rate limiting, XSS protection

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Local Development

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your keys:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4xxxxxxxxxxxxx
   TURNSTILE_SECRET_KEY=0x4xxxxxxxxxxxxx
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   npm run build
   ```
   Output is written to `out/` (static export).

5. **Test contact form locally (full stack):**
   ```bash
   npm run preview:pages
   ```
   See [CLOUDFLARE_PAGES_DEPLOYMENT.md](./CLOUDFLARE_PAGES_DEPLOYMENT.md).

---

## 📁 Project Structure

```
incany-cafe/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (metadata, fonts)
│   │   ├── page.tsx            # Homepage
│   │   ├── error.tsx           # Error boundary
│   │   ├── robots.ts           # robots.txt generator
│   │   ├── sitemap.ts          # sitemap.xml generator
│   │   ├── icon.svg            # Favicon
│   │   ├── privacy/            # Privacy policy page
│   │   └── api/contact/        # Contact API (local dev only)
│   ├── components/             # React components
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Menu.tsx            # Menu with pagination
│   │   ├── Contact.tsx         # Contact form + Turnstile
│   │   ├── Location.tsx        # Consent-gated Google Maps
│   │   ├── StructuredData.tsx  # JSON-LD schema
│   │   └── ui/                 # Reusable UI components
│   ├── data/                   # Data files
│   │   ├── cafe.ts             # Café info (hours, address, contact)
│   │   └── menu.json           # Menu items
│   └── functions/              # Cloudflare Pages Functions
│       └── api/contact.ts      # Production contact form handler
├── public/
│   ├── _headers                # Cloudflare security headers
│   └── _redirects              # Cloudflare redirects (www → non-www)
└── PRODUCTION_DEPLOYMENT.md    # Full deployment guide
```

---

## 🔐 Security Features

- ✅ **Cloudflare Turnstile** on contact form (bot protection)
- ✅ **Honeypot** anti-spam field
- ✅ **Server-side validation** (name, email, message)
- ✅ **HTML sanitization** (XSS prevention)
- ✅ **Rate limiting** (10 requests/minute per IP)
- ✅ **Security headers** (CSP, X-Frame-Options, HSTS, etc.)
- ✅ **HTTPS only** with strict SSL/TLS

See [SECURITY_SETUP.md](./SECURITY_SETUP.md) for details.

---

## 🌍 Privacy & Consent

- ✅ **Privacy page** at `/privacy` (clear Dutch, GDPR-friendly)
- ✅ **Consent-gated Google Maps** (loads only after explicit consent)
- ✅ **localStorage** consent persistence with revoke option
- ✅ **No tracking** (no GA, no ad cookies, no Meta Pixel)

See [PRIVACY_IMPLEMENTATION_SUMMARY.md](./PRIVACY_IMPLEMENTATION_SUMMARY.md) for details.

---

## 📧 Contact Form Architecture

```
User → Contact.tsx (frontend)
  ↓ POST /api/contact
  ↓ Cloudflare Pages Function (functions/api/contact.ts)
  ↓ Turnstile verification + validation + sanitization
  ↓ Resend API
  ↓ Email to info@incany.be
```

**Local UI:** `npm run dev` (contact POST not available)  
**Local E2E:** `npm run preview:pages` (static `out/` + Pages Function)

See [CLOUDFLARE_PAGES_DEPLOYMENT.md](./CLOUDFLARE_PAGES_DEPLOYMENT.md) for setup.

---

## 🚢 Deployment

**Platform:** Cloudflare Pages (static export) + Pages Functions  
**Guide:** **[CLOUDFLARE_PAGES_DEPLOYMENT.md](./CLOUDFLARE_PAGES_DEPLOYMENT.md)**

| Dashboard setting | Value |
|-------------------|--------|
| Root directory | `incany-cafe` |
| Build command | `npm run build` |
| Build output | `out` |
| Node version | `20` |

### Local workflows

| Command | Purpose |
|---------|---------|
| `npm run dev` | Frontend UI only (contact form POST will not work) |
| `npm run preview:pages` | Static `out/` + `POST /api/contact` via Wrangler |

### Quick Deploy

1. Push to Git
2. Connect repository in Cloudflare Pages (root: `incany-cafe`)
3. Set environment variables (see deployment guide)
4. Deploy

See **[CLOUDFLARE_PAGES_DEPLOYMENT.md](./CLOUDFLARE_PAGES_DEPLOYMENT.md)** for env vars, custom domains, function logs, and MX record warning.

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server locally
- `npm run lint` - Run ESLint

### Environment Variables

**Required for local development:**
```env
RESEND_API_KEY=            # Resend API key (from https://resend.com)
TURNSTILE_SECRET_KEY=      # Cloudflare Turnstile secret key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=  # Cloudflare Turnstile site key (public)
```

**Production (Cloudflare Pages):**
Set in Cloudflare dashboard → Pages project → Settings → Environment variables

---

## 📊 SEO & Structured Data

- ✅ **Metadata:** Optimized title, description, Open Graph, Twitter Cards
- ✅ **Language:** nl-BE (Belgian Dutch)
- ✅ **robots.txt:** `/robots.txt` (allows all, disallows `/api/`)
- ✅ **Sitemap:** `/sitemap.xml` (auto-generated)
- ✅ **JSON-LD:** BarOrPub structured data for Google Search
- ⚠️ **Favicon:** Placeholder beer mug icon (replace with logo)
- ⚠️ **OG Image:** Missing (create `public/og-image.jpg` 1200x630px)

### TODO for SEO
- [ ] Create Open Graph image (`public/og-image.jpg`)
- [ ] Replace favicon with actual logo (`src/app/icon.svg` or `icon.png`)
- [ ] Add Google Search Console verification code
- [ ] Submit sitemap to Google Search Console

---

## 🧪 Testing

### Local Testing
```bash
npm run build
npm start
```
Visit http://localhost:3000 and test:
- Contact form submission
- Google Maps consent flow
- Error boundary (force error to test)
- Privacy page
- All sections render correctly

### Production Testing Checklist
See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) → Post-Deployment Verification

---

## 📚 Documentation

- **[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)** - Full deployment guide
- **[SECURITY_SETUP.md](./SECURITY_SETUP.md)** - Security implementation details
- **[SECURITY_IMPLEMENTATION_SUMMARY.md](./SECURITY_IMPLEMENTATION_SUMMARY.md)** - Security summary
- **[PRIVACY_IMPLEMENTATION_SUMMARY.md](./PRIVACY_IMPLEMENTATION_SUMMARY.md)** - Privacy features
- **[CLOUDFLARE_PAGES_SETUP.md](./CLOUDFLARE_PAGES_SETUP.md)** - Cloudflare + Resend setup
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design tokens and styling guide
- **[COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md)** - Component documentation

---

## 🔗 Useful Links

- **Next.js Docs:** https://nextjs.org/docs
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Resend Docs:** https://resend.com/docs
- **Cloudflare Turnstile:** https://developers.cloudflare.com/turnstile/

---

## 🐛 Troubleshooting

### Contact form not working
1. Check environment variables in Cloudflare Pages
2. View Cloudflare Pages Functions logs
3. Verify Resend API key is valid
4. Check Turnstile widget configuration

### www not redirecting
1. Verify `public/_redirects` file exists
2. Check DNS: www CNAME → incany.be
3. Purge Cloudflare cache

### Security headers missing
1. Verify `public/_headers` file in build output
2. Purge Cloudflare cache
3. Test: `curl -I https://incany.be`

See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) → Troubleshooting for more.

---

## 📝 License

Private project for Café In Cany.

---

## 🤝 Contributing

This is a private project. For issues or improvements, contact the development team.

---

**Built with ❤️ for Café In Cany**
