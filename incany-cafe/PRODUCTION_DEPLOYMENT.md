# Production Deployment Guide - Café In Cany

**Target Platform:** Cloudflare Pages + Pages Functions  
**Domain:** incany.be  
**Last Updated:** June 24, 2026

---

## Pre-Deployment Checklist

### 1. Code & Build
- [x] All security headers configured (`public/_headers`)
- [x] Redirects configured (`public/_redirects`)
- [x] Metadata improved (SEO, Open Graph, Twitter Cards)
- [x] Language set to nl-BE
- [x] JSON-LD structured data added
- [x] robots.txt and sitemap.xml generated
- [x] Error boundary implemented
- [ ] Open Graph image created (`public/og-image.jpg` - 1200x630px)
- [ ] Favicon/logo added (replace `src/app/icon.svg` with actual logo)
- [ ] Build successful: `npm run build`
- [ ] Type check passed: `npm run lint`

### 2. Environment Variables
- [ ] `RESEND_API_KEY` ready (from https://resend.com)
- [ ] `TURNSTILE_SECRET_KEY` ready (from Cloudflare dashboard)
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` ready (public key)

### 3. Domain & DNS
- [ ] Domain `incany.be` registered
- [ ] DNS managed by Cloudflare
- [ ] Email MX records verified (do NOT alter Google Workspace MX records)

---

## Cloudflare Dashboard Configuration

### Step 1: Create Cloudflare Pages Project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Connect to your Git repository (GitHub, GitLab, etc.)
4. **Build settings:**
   - Framework preset: **None** (static export)
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `incany-cafe` (if monorepo, otherwise leave blank)
   - Node version: **20** or higher
5. Click **Save and Deploy**

### Step 2: Configure Environment Variables

In Cloudflare Pages project → **Settings** → **Environment variables**:

| Variable Name | Value | Environment | Type |
|---------------|-------|-------------|------|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxx` | Production + Preview | Secret |
| `TURNSTILE_SECRET_KEY` | `0x4AAxxxxxxxxxx` | Production + Preview | Secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x4BBxxxxxxxxxx` | Production + Preview | Public |
| `NODE_VERSION` | `18` | Production + Preview | Plain text |

**Important:**
- Redeploy after adding/changing environment variables
- Never commit `.env` files with real values to Git
- Keep `TURNSTILE_SECRET_KEY` and `RESEND_API_KEY` private

### Step 3: Connect Custom Domain

1. In Pages project → **Custom domains** → **Set up a custom domain**
2. Enter: `incany.be`
3. Cloudflare will create DNS records automatically:
   - `incany.be` → CNAME to `<project-name>.pages.dev`
   - Or A/AAAA records if apex domain
4. Add `www.incany.be` subdomain:
   - Click **Set up a custom domain** again
   - Enter: `www.incany.be`
   - This will be redirected to `incany.be` via `_redirects` file
5. Wait for SSL certificate provisioning (automatic, ~5-10 minutes)

### Step 4: SSL/TLS Settings

Navigate to **SSL/TLS** section in Cloudflare dashboard:

1. **SSL/TLS encryption mode:**
   - Set to **Full (strict)** ✅
   - Do NOT use "Flexible" (causes redirect loops)

2. **Edge Certificates:**
   - ✅ Always Use HTTPS: **On**
   - ✅ HTTP Strict Transport Security (HSTS): **Enable** after testing
     - Max Age: 12 months (31536000 seconds)
     - Include subdomains: Yes
     - Preload: Yes (only if ready for permanent HTTPS)
   - ✅ Minimum TLS Version: **TLS 1.2**
   - ✅ Opportunistic Encryption: **On**
   - ✅ TLS 1.3: **On**
   - ✅ Automatic HTTPS Rewrites: **On**

**HSTS Warning:** Only enable HSTS preload after verifying HTTPS works correctly. Once preloaded, it's very difficult to undo.

### Step 5: Firewall & Security

#### WAF (Web Application Firewall)
1. Navigate to **Security** → **WAF**
2. Enable **Cloudflare Managed Ruleset**
3. Set sensitivity: **Medium** (adjust if false positives occur)

#### Bot Fight Mode
1. Navigate to **Security** → **Bots**
2. Enable **Bot Fight Mode** (free plan)
   - Or **Super Bot Fight Mode** (paid plans)
3. Cloudflare Turnstile already protects the contact form

#### Rate Limiting (Critical for Contact Form)
1. Navigate to **Security** → **WAF** → **Rate limiting rules**
2. Click **Create rule**
3. Configure:

   **Rule name:** `Contact Form Rate Limit`
   
   **If incoming requests match:**
   - Field: `URI Path`
   - Operator: `equals`
   - Value: `/api/contact`
   - AND
   - Field: `HTTP Method`
   - Operator: `equals`
   - Value: `POST`
   
   **Choose action:** `Block`
   
   **For:** `10 requests`
   
   **Per:** `1 minute`
   
   **Counting characteristics:**
   - ✅ IP address
   - Period: 60 seconds
   
   **Action duration:** 60 seconds (blocked IPs wait 1 minute before retry)

4. **Response:**
   - Type: Default Cloudflare challenge page
   - Status code: 429 Too Many Requests

5. Click **Deploy**

**Note:** This prevents brute-force spam on the contact form (max 10 submissions per IP per minute).

### Step 6: DNS Records Verification

Ensure these DNS records exist in Cloudflare DNS:

| Type | Name | Content | Proxy Status | Priority |
|------|------|---------|--------------|----------|
| CNAME | `incany.be` | `<project>.pages.dev` | Proxied (orange cloud) | - |
| CNAME | `www` | `incany.be` | Proxied (orange cloud) | - |
| MX | `incany.be` | Google Workspace MX records | DNS only (gray) | 1,5,10 |
| TXT | `incany.be` | SPF/DKIM records for email | DNS only (gray) | - |

**Critical Email Warning:**
- ⚠️ Do NOT delete or modify existing MX records for Google Workspace
- Resend domain verification uses different TXT records
- Email sending (via Resend) and email receiving (via Google Workspace) are separate

### Step 7: Resend Domain Verification (Optional but Recommended)

For production email sending from `noreply@incany.be`:

1. Go to [Resend Domains](https://resend.com/domains)
2. Click **Add Domain** → Enter `incany.be`
3. Resend provides DNS records to add:
   - TXT record for domain verification
   - TXT record for SPF
   - CNAME records for DKIM
4. Add these records to Cloudflare DNS (DNS-only, not proxied)
5. Wait for verification (~5 minutes to 24 hours)
6. Update sender address in `src/functions/api/contact.ts`:
   ```typescript
   from: "Café In Cany <noreply@incany.be>",
   ```

**Without domain verification:**
- Emails still send but from `onboarding@resend.dev`
- Higher spam risk
- Less professional

### Step 8: Cloudflare Turnstile Widget

1. Navigate to **Turnstile** in Cloudflare dashboard
2. Click **Add widget**
3. Configure:
   - **Widget name:** `Café In Cany Contact Form`
   - **Domain:** `incany.be` and `www.incany.be`
   - **Widget mode:** Managed (invisible challenge)
   - **Pre-clearance:** Optional
4. Copy keys:
   - **Site Key** → Use as `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Secret Key** → Use as `TURNSTILE_SECRET_KEY`
5. Add to Cloudflare Pages environment variables (see Step 2)

### Step 9: Performance Optimization

#### Cloudflare Cache Settings
1. Navigate to **Caching** → **Configuration**
2. **Browser Cache TTL:** 4 hours (default is fine)
3. **Crawler Hints:** On
4. **Always Online:** On (serves stale content if origin down)

#### Argo / Tiered Cache (Optional, Paid)
- Argo Smart Routing: Reduces latency (~$5/month)
- Tiered Cache: Improves cache hit ratio

---

## Deployment Process

### Initial Deployment

1. **Commit and push code to Git**
   ```bash
   git add .
   git commit -m "Production-ready: security, SEO, error handling"
   git push origin main
   ```

2. **Cloudflare Pages auto-deploys** from Git
   - Monitor: Cloudflare Dashboard → Pages project → Deployments
   - View logs for build errors
   - Deployment typically takes 2-5 minutes

3. **Verify deployment**
   - Visit `https://<project-name>.pages.dev`
   - Test contact form
   - Check browser console for errors
   - Validate HTTPS certificate

4. **Connect custom domain** (see Step 3 above)

5. **Wait for DNS propagation** (5-60 minutes typically)

6. **Test production domain**
   - Visit `https://incany.be`
   - Should redirect to HTTPS
   - `https://www.incany.be` should redirect to `https://incany.be`

### Subsequent Deployments

Every push to `main` branch triggers auto-deployment:
- Cloudflare builds and deploys automatically
- Zero-downtime deployment
- Preview deployments for branches/PRs

---

## Post-Deployment Verification

### Functional Testing
- [ ] Homepage loads correctly
- [ ] All sections visible (Hero, About, Menu, Events, Gallery, Location, Contact)
- [ ] Contact form submits successfully
- [ ] Email received at info@incany.be
- [ ] Turnstile challenge appears and works
- [ ] Google Maps consent flow works (placeholder → load → revoke)
- [ ] Privacy page accessible at `/privacy`
- [ ] Footer privacy link works
- [ ] Mobile responsive (test on phone)

### Security Testing
- [ ] HTTPS works (green padlock in browser)
- [ ] HTTP redirects to HTTPS
- [ ] www redirects to non-www
- [ ] Security headers present (check with https://securityheaders.com)
- [ ] CSP doesn't block legitimate resources
- [ ] Turnstile prevents bot submissions
- [ ] Rate limiting blocks >10 form submissions/minute
- [ ] No sensitive data in browser console errors

### SEO Testing
- [ ] robots.txt accessible: `https://incany.be/robots.txt`
- [ ] sitemap.xml accessible: `https://incany.be/sitemap.xml`
- [ ] Meta description correct (view page source)
- [ ] Open Graph tags present (test with https://www.opengraph.xyz/)
- [ ] Twitter Card tags present
- [ ] JSON-LD structured data valid (test with https://search.google.com/test/rich-results)
- [ ] Favicon appears in browser tab
- [ ] Language set to nl-BE (check `<html lang="nl-BE">`)

### Performance Testing
- [ ] Page loads in < 3 seconds (test with https://pagespeed.web.dev/)
- [ ] Lighthouse score > 90 (all categories)
- [ ] Images optimized
- [ ] Fonts load correctly (Google Fonts)
- [ ] No console errors in production

### Tools for Testing
- **Security Headers:** https://securityheaders.com
- **SSL Test:** https://www.ssllabs.com/ssltest/
- **Open Graph:** https://www.opengraph.xyz/
- **Twitter Cards:** https://cards-dev.twitter.com/validator
- **Structured Data:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Lighthouse:** Chrome DevTools → Lighthouse tab

---

## Monitoring & Maintenance

### Cloudflare Analytics
- Navigate to **Analytics & Logs** in Cloudflare dashboard
- Monitor:
  - Traffic volume
  - Geographic distribution
  - Top requests
  - Error rates (4xx, 5xx)
  - Bandwidth usage

### Cloudflare Pages Functions Logs
- Navigate to **Workers & Pages** → Your project → **Functions**
- Real-time logs show:
  - Contact form submissions
  - API errors
  - Function execution time
  - Cold starts

### Resend Dashboard
- Monitor at https://resend.com/emails
- Track:
  - Emails sent/delivered/bounced
  - Daily limits (100/day on free plan)
  - Delivery rates
  - API usage

### Google Search Console
1. Verify ownership: https://search.google.com/search-console
2. Add property: `https://incany.be`
3. Submit sitemap: `https://incany.be/sitemap.xml`
4. Monitor:
   - Indexing status
   - Search performance
   - Mobile usability
   - Core Web Vitals
   - Security issues

### Uptime Monitoring (Optional)
- Use services like:
  - UptimeRobot (free)
  - Pingdom
  - StatusCake
- Monitor `https://incany.be` every 5 minutes
- Alert via email/SMS if site down

---

## Troubleshooting

### Issue: Site not accessible after deployment
**Possible causes:**
1. DNS not propagated yet (wait up to 1 hour)
2. SSL certificate provisioning in progress (wait 10 minutes)
3. Wrong DNS configuration

**Solution:**
- Check DNS records in Cloudflare DNS tab
- Verify CNAME points to correct Pages project
- Ensure SSL/TLS mode is "Full (strict)"

### Issue: Contact form fails to send
**Possible causes:**
1. Missing `RESEND_API_KEY` environment variable
2. Invalid Resend API key
3. Turnstile verification failing
4. Rate limit triggered

**Solution:**
- Check Cloudflare Pages Functions logs
- Verify environment variables in Pages settings
- Test Resend API key separately
- Check Turnstile widget configuration

### Issue: www not redirecting to non-www
**Possible causes:**
1. `_redirects` file not deployed
2. DNS record missing for www
3. Redirect rule syntax error

**Solution:**
- Verify `public/_redirects` file exists in build output
- Check Cloudflare DNS has `www` CNAME
- Test redirect: `curl -I https://www.incany.be`

### Issue: Security headers not applied
**Possible causes:**
1. `_headers` file not in public directory
2. Syntax error in `_headers`
3. Cloudflare caching old response

**Solution:**
- Verify `public/_headers` exists
- Check file syntax (no tabs, correct format)
- Purge Cloudflare cache: **Caching** → **Purge Everything**
- Test: `curl -I https://incany.be | grep X-Content-Type-Options`

### Issue: Google Maps not loading after consent
**Possible causes:**
1. CSP blocking Google Maps domains
2. JavaScript error in Location component
3. localStorage blocked (private browsing)

**Solution:**
- Check browser console for CSP violations
- Verify CSP includes `frame-src https://www.google.com`
- Test in normal browsing mode (not incognito)

### Issue: 429 rate limit errors
**Expected behavior:** Rate limit protects contact form

**If legitimate users blocked:**
- Increase rate limit: 10 → 20 requests per minute
- Or decrease window: 1 minute → 30 seconds
- Adjust in Cloudflare WAF rate limiting rules

---

## Maintenance Schedule

### Weekly
- [ ] Check Cloudflare Pages Functions logs for errors
- [ ] Verify contact form working
- [ ] Review spam submissions (if any)

### Monthly
- [ ] Review Resend email delivery rates
- [ ] Check Google Search Console for issues
- [ ] Update content (menu, events, hours) as needed
- [ ] Review security headers (test with securityheaders.com)

### Quarterly
- [ ] Update dependencies: `npm update`
- [ ] Review and update privacy policy if services change
- [ ] Check for Next.js security advisories
- [ ] Audit Cloudflare security settings

### Annually
- [ ] Renew domain registration
- [ ] Review and update business information (hours, phone, etc.)
- [ ] Refresh Open Graph image and favicon
- [ ] Audit Resend email templates
- [ ] Review Cloudflare rate limiting rules effectiveness

---

## Rollback Procedure

If a deployment breaks the site:

1. **Immediate rollback:**
   - Go to Cloudflare Pages → **Deployments**
   - Find last working deployment
   - Click **⋯** → **Rollback to this deployment**
   - Confirm rollback

2. **Fix the issue:**
   - Review build logs for errors
   - Test locally: `npm run build && npm start`
   - Fix code and commit
   - Push to Git (triggers new deployment)

3. **Alternative: Redeploy specific commit:**
   - Go to Cloudflare Pages → **Settings** → **Builds & deployments**
   - Click **Retry deployment** on a specific commit

---

## Support & Resources

### Cloudflare
- Docs: https://developers.cloudflare.com/pages/
- Community: https://community.cloudflare.com/
- Support: https://dash.cloudflare.com/?to=/:account/support

### Next.js
- Docs: https://nextjs.org/docs
- Cloudflare deployment: https://nextjs.org/docs/app/building-your-application/deploying#cloudflare-pages

### Resend
- Docs: https://resend.com/docs
- API Reference: https://resend.com/docs/api-reference
- Support: support@resend.com

### Cloudflare Turnstile
- Docs: https://developers.cloudflare.com/turnstile/
- Dashboard: https://dash.cloudflare.com/?to=/:account/turnstile

---

## Security Incident Response

If security issue discovered:

1. **Assess severity:**
   - Data breach? → Rotate all API keys immediately
   - XSS/injection? → Deploy hotfix ASAP
   - DDoS? → Enable "I'm Under Attack Mode" in Cloudflare

2. **Immediate actions:**
   - Rotate compromised credentials (Resend, Turnstile)
   - Update environment variables in Cloudflare Pages
   - Redeploy with fixed code
   - Review Cloudflare logs for suspicious activity

3. **Post-incident:**
   - Document what happened
   - Update security practices
   - Review and tighten CSP/headers if needed
   - Consider enabling Cloudflare audit logs

---

## Deployment Complete ✅

After following this guide:
- ✅ Site deployed to Cloudflare Pages
- ✅ Custom domain connected (incany.be)
- ✅ HTTPS enabled with strict SSL
- ✅ Security headers active
- ✅ Rate limiting protects contact form
- ✅ SEO optimized (robots, sitemap, structured data)
- ✅ Error handling in place
- ✅ Monitoring configured

**Next steps:**
1. Submit sitemap to Google Search Console
2. Share site on social media (test Open Graph)
3. Monitor contact form submissions
4. Gather user feedback
5. Iterate and improve!

---

**Questions or issues?** Review Cloudflare Pages Functions logs and this guide's troubleshooting section.
