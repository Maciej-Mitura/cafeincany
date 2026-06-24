# Privacy & Consent Implementation Summary

**Date:** June 24, 2026  
**Café In Cany Website**

## Overview

Implemented a minimal, production-ready privacy and consent setup that respects visitor privacy without adding unnecessary tracking or dependencies.

---

## Files Changed

### 1. **New Privacy Page**
- **File:** `src/app/privacy/page.tsx`
- **Status:** ✅ Created
- **Features:**
  - Clear Dutch privacy policy in plain language
  - Sections covering: responsible party, data collection, purpose, retention, providers, user rights, cookies/localStorage
  - Uses existing design system (Section component, consistent styling)
  - Proper Next.js metadata for SEO
  - Back navigation to homepage
  - Statically generated at build time

### 2. **Contact Form Privacy Notice**
- **File:** `src/components/Contact.tsx`
- **Status:** ✅ Updated
- **Changes:**
  - Added privacy notice below Turnstile widget, above submit button
  - Concise Dutch text explaining data processing
  - Link to `/privacy` page using Next.js Link component
  - Styled consistently with existing form design
  - Non-intrusive visual presentation (background surface, border, small text)

### 3. **Consent-Gated Google Maps**
- **File:** `src/components/Location.tsx`
- **Status:** ✅ Refactored
- **Changes:**
  - Google Maps iframe now only loads **after explicit user consent**
  - Before consent: attractive placeholder card with:
    - Map icon
    - Clear explanation in Dutch about data transfer to Google
    - "Kaart laden" (Load map) button
    - "Meer info over privacy" link to `/privacy`
    - Alternative "Open rechtstreeks in Google Maps" button (opens in new tab, no embed)
  - After consent:
    - Google Maps iframe renders
    - "Open in Google Maps" link (opens in new tab)
    - "Privacy-instellingen wijzigen" (Change privacy settings) link to revoke consent
  - **localStorage persistence:**
    - Key: `incany_maps_consent`
    - Value: `'true'` when consent given
    - Cleared when consent revoked
  - **Hydration-safe:**
    - Uses `mounted` state to avoid server/client mismatch
    - Placeholder shown during SSR, consent checked after mount
  - **Accessible:**
    - Keyboard navigable
    - Clear button labels
    - Screen-reader friendly

### 4. **Footer Navigation**
- **File:** `src/components/Footer.tsx`
- **Status:** ✅ Updated
- **Changes:**
  - Added "Privacybeleid" link in "Connect" section
  - Uses Next.js Link component for client-side navigation
  - Styled consistently with other footer links
  - Visible on mobile and desktop

---

## When Google Maps Loads

Google Maps **only** loads in these scenarios:

1. **User clicks "Kaart laden" button** on the placeholder card
   - Consent is saved to `localStorage` (`incany_maps_consent = 'true'`)
   - Map iframe is rendered immediately
   - Map persists on page refresh (consent remembered)

2. **User returns to the site after giving consent**
   - On component mount, consent is read from `localStorage`
   - If `incany_maps_consent === 'true'`, map loads automatically
   - No placeholder shown

### Google Maps Does NOT Load:

- ❌ On initial page visit (before consent)
- ❌ After user revokes consent (localStorage cleared)
- ❌ During server-side rendering (SSR)
- ❌ When JavaScript is disabled (placeholder shown, "Open in Google Maps" link still works)

**No embed = No data transfer to Google**

---

## How Visitors Can Withdraw Consent

After loading the map, users can withdraw consent at any time:

1. **Visible control below the map:**
   - Small link: "Privacy-instellingen wijzigen" (Change privacy settings)
   
2. **What happens on click:**
   - `localStorage` key `incany_maps_consent` is removed
   - Map state resets to placeholder card
   - User must click "Kaart laden" again to reload the map

3. **Alternative:**
   - User can manually clear browser localStorage
   - Or clear all site data via browser settings

**Result:** The Google Maps iframe is removed from the page, and no further data transfer to Google occurs until consent is given again.

---

## Technical Implementation

### Privacy Page
- **Route:** `/privacy`
- **Type:** Static page (pre-rendered at build time)
- **Content:** Dutch, plain language, non-legal
- **Sections:**
  - Responsible party (café details)
  - Collected data (contact form: name, email, message, IP, timestamp)
  - Purpose (answering questions, spam prevention, showing location)
  - Retention (as long as needed, then deleted unless legally required)
  - Providers (Cloudflare, Resend, Google Maps only when loaded)
  - User rights (access, correction, deletion, objection)
  - Cookies/localStorage explanation
  - Privacy contact email

### Consent-Gated Map Logic
```typescript
// localStorage key
const MAPS_CONSENT_KEY = 'incany_maps_consent';

// State
const [mapsConsent, setMapsConsent] = useState<boolean>(false);
const [mounted, setMounted] = useState(false);

// Load consent after mount (avoid hydration mismatch)
useEffect(() => {
  setMounted(true);
  const consent = localStorage.getItem(MAPS_CONSENT_KEY);
  if (consent === 'true') {
    setMapsConsent(true);
  }
}, []);

// Grant consent
const handleLoadMap = () => {
  setMapsConsent(true);
  localStorage.setItem(MAPS_CONSENT_KEY, 'true');
};

// Revoke consent
const handleRevokeConsent = () => {
  setMapsConsent(false);
  localStorage.removeItem(MAPS_CONSENT_KEY);
};
```

### Rendering Logic
- **Before mount or consent:** Placeholder card with explanation + buttons
- **After consent:** Google Maps iframe + revoke control
- **SSR-safe:** Placeholder always shown during SSR, consent checked client-side

---

## Accessibility

- ✅ Keyboard navigation supported (buttons are focusable)
- ✅ Screen reader friendly (semantic HTML, clear button labels)
- ✅ No `aria-hidden` on interactive elements
- ✅ Clear visual hierarchy (heading, explanation, buttons)
- ✅ Links have underlines for clarity
- ✅ Sufficient color contrast (uses CSS variables from design system)

---

## TypeScript & Code Quality

- ✅ All new code is properly typed
- ✅ No `dangerouslySetInnerHTML` used
- ✅ No `any` types
- ✅ Linting passes (only pre-existing warnings remain)
- ✅ Build succeeds (`npm run build`)
- ✅ Privacy page statically generated

---

## Privacy Features Implemented

| Feature | Status | Notes |
|---------|--------|-------|
| Privacy page at `/privacy` | ✅ | Clear Dutch, non-legal language |
| Contact form privacy notice | ✅ | Below form, links to `/privacy` |
| Consent-gated Google Maps | ✅ | Loads only after explicit consent |
| localStorage consent persistence | ✅ | Key: `incany_maps_consent` |
| Revoke consent control | ✅ | Visible link below map |
| Footer privacy link | ✅ | In "Connect" section |
| No tracking cookies | ✅ | Only localStorage for consent |
| No analytics/ads | ✅ | No GA, Meta Pixel, etc. |
| Hydration-safe rendering | ✅ | No SSR/client mismatch |
| Accessible | ✅ | Keyboard + screen reader friendly |

---

## What the Café Owner Still Needs to Confirm

The privacy page contains factual information about current website practices, but the café owner should **review and confirm** the following:

### 1. **Contact Information**
- ✅ Verify café address: `Kerkstraat 3, 8890 Moorslede`
- ✅ Verify privacy contact email: `info@incany.be`
- ✅ Confirm phone number is correct

### 2. **Data Retention Policy**
- ⚠️ Currently states: "messages retained as long as needed to handle the request"
- **Action:** Decide on a specific retention period (e.g., "30 days after resolution")
- **Consider:** Accounting/legal obligations (e.g., invoices, contracts)

### 3. **Legal Basis (GDPR)**
- ⚠️ Privacy page uses plain language, not legal terminology
- **Action:** Consult with a legal advisor if operating in EU/EEA to ensure GDPR compliance
- **Specifically:**
  - Legal basis for processing (consent, legitimate interest, contract)
  - Data subject rights procedures (how to handle access/deletion requests)
  - Data breach notification procedures (if applicable)

### 4. **Provider Agreements**
- ✅ Confirm you have accounts with:
  - Cloudflare (hosting, Turnstile)
  - Resend (email)
- ⚠️ Review their privacy policies and ensure they have Data Processing Agreements (DPAs) if required

### 5. **Last Updated Date**
- ✅ Currently set to: `2 maart 2026` (March 2, 2026)
- **Action:** Update this date whenever the privacy policy changes
- **Location:** `src/app/privacy/page.tsx` line 12

### 6. **Third-Party Services**
- ⚠️ If you add any new services in the future (e.g., reservations, payments, newsletter), update the privacy page
- **Examples:** Stripe, Mailchimp, booking systems

### 7. **Cookie/Tracking Consent**
- ✅ Currently no tracking cookies (only localStorage for map consent)
- ⚠️ If you add analytics (e.g., Google Analytics) later, you'll need:
  - Cookie banner/consent manager
  - Updated privacy page
  - Proper consent before loading tracking scripts

### 8. **International Transfers**
- ⚠️ Cloudflare, Resend, and Google are US-based companies
- **Action:** If serving EU visitors, confirm providers have adequate safeguards (Standard Contractual Clauses, EU-US Data Privacy Framework)

### 9. **Privacy Policy Review Cadence**
- 📅 **Recommendation:** Review privacy policy annually or when:
  - Adding new features/services
  - Changing providers
  - Regulations change (e.g., new GDPR guidance)

---

## Testing Checklist

Before deploying to production, test the following:

### Privacy Page
- [ ] Navigate to `/privacy` from homepage
- [ ] Verify all sections render correctly
- [ ] Check "Terug naar home" link works
- [ ] Test on mobile (responsive design)
- [ ] Verify email links open mail client
- [ ] Check external links (Google privacy policy) open in new tab

### Contact Form
- [ ] Verify privacy notice appears below Turnstile, above submit button
- [ ] Click privacy link → should navigate to `/privacy`
- [ ] Submit form → verify email received (Resend)
- [ ] Check form still works with all security features (Turnstile, honeypot, validation)

### Google Maps Consent
- [ ] **Initial state:**
  - Placeholder card shown (no iframe)
  - "Kaart laden" button visible
  - "Meer info over privacy" link works
  - "Of open rechtstreeks in Google Maps" link opens map in new tab
- [ ] **After clicking "Kaart laden":**
  - Iframe loads immediately
  - "Privacy-instellingen wijzigen" link appears below map
  - Refresh page → map still loaded (consent persisted)
- [ ] **After clicking "Privacy-instellingen wijzigen":**
  - Map disappears
  - Placeholder card returns
  - localStorage cleared (check dev tools)
- [ ] **Clear localStorage manually:**
  - Open browser dev tools → Application → localStorage
  - Delete `incany_maps_consent`
  - Refresh page → placeholder shown again

### Footer
- [ ] "Privacybeleid" link visible in footer
- [ ] Click link → navigates to `/privacy`
- [ ] Test on mobile (footer navigation responsive)

### Accessibility
- [ ] Tab through all interactive elements (keyboard navigation)
- [ ] Test with screen reader (e.g., NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast meets WCAG AA standards
- [ ] Test with JavaScript disabled (placeholder + external Google Maps link should still work)

---

## Build Status

✅ **Build successful**

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/contact
├ ○ /info
└ ○ /privacy

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

- Privacy page is **statically generated** (fast, SEO-friendly)
- Contact API route remains dynamic (for form submissions)

---

## Deployment Notes

### Environment Variables
No new environment variables required for privacy features.

Existing variables (already configured):
- `RESEND_API_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

### Cloudflare Pages
- Privacy page will be served as static HTML (fast CDN delivery)
- No additional Cloudflare configuration needed
- Map consent uses client-side localStorage only (no server-side state)

### No Dependencies Added
- ✅ Zero new npm packages
- ✅ No cookie consent libraries
- ✅ No analytics SDKs
- ✅ Pure React + Next.js built-ins

---

## Summary

### What Was Implemented
1. ✅ Privacy page at `/privacy` with clear Dutch explanations
2. ✅ Contact form privacy notice with link
3. ✅ Consent-gated Google Maps (loads only after explicit consent)
4. ✅ localStorage-based consent persistence
5. ✅ Visible control to withdraw consent
6. ✅ Footer navigation link to privacy page
7. ✅ Fully accessible, keyboard-friendly, screen-reader compatible
8. ✅ Hydration-safe Next.js implementation
9. ✅ TypeScript types, no dangerous HTML, successful build

### What Was NOT Implemented (as requested)
- ❌ No analytics (Google Analytics, Plausible, etc.)
- ❌ No advertising trackers (Meta Pixel, Google Ads, etc.)
- ❌ No cookie consent libraries (Cookiebot, OneTrust, etc.)
- ❌ No legal compliance claims in the website
- ❌ No legalese-heavy boilerplate

### Key Privacy Principles
- **Transparency:** Clear explanations of what data is collected and why
- **Minimization:** Only essential data collected (name, email, message for contact form)
- **Consent:** Google Maps requires explicit opt-in
- **Control:** Visitors can revoke map consent at any time
- **No tracking:** No analytics or ad cookies
- **Lightweight:** Zero dependencies, fast page loads

---

## Questions or Issues?

If you need to adjust the privacy policy content, edit:
- `src/app/privacy/page.tsx` (main privacy page)
- `src/components/Contact.tsx` (privacy notice in form)
- `src/components/Location.tsx` (map consent text)

For legal advice on GDPR compliance, consult a qualified attorney. This implementation provides technical privacy controls but does not constitute legal compliance certification.

---

**Implementation complete.** ✅
