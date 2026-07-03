# Sanity Content Integration

The **incany-cafe** website reads published **evenementen** and **sfeerbeelden** from the **incanycafe** Sanity Studio project at build time. The Studio schema lives in `../incanycafe/` and is not embedded in the Next.js app.

## Environment variables

Copy `.env.local.example` to `.env.local` in `incany-cafe/`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=rznk9vqh
NEXT_PUBLIC_SANITY_DATASET=production
```

No Sanity API token is used. Only documents with `published == true` are fetched from the public CDN API.

If either variable is missing, the site falls back to local JSON (`src/data/events.json` and `src/data/gallery.json`) so local development keeps working.

## Local development

1. Start the website:
   ```bash
   cd incany-cafe
   npm run dev
   ```
2. Optionally start the Studio in another terminal:
   ```bash
   cd incanycafe
   npm run dev
   ```
3. In Sanity Studio, create or edit an **Evenement** or **Sfeerbeeld** document.
4. Set **Gepubliceerd** to `true` and publish the document.
5. Restart `npm run dev` (or run `npm run build`) to pull the latest content into the static page data.

## How content updates reach the website

This site uses **Next.js static export** (`output: "export"`) and is deployed to **Cloudflare Pages**. CMS data is fetched once during `next build` and baked into the exported HTML/JS bundle.

| Change | Visible on the live site after… |
|--------|----------------------------------|
| Publish or unpublish an event or sfeerbeeld in Sanity | **Rebuild + redeploy** (e.g. new Cloudflare Pages deployment) |
| Edit titles, dates, images, recap, etc. | **Rebuild + redeploy** |
| Event moves from upcoming → live → past (time passes) | **Normal browser refresh** — status is calculated client-side from `startDateTime` / `endDateTime` |
| Tab switch, modal open/close, hover states, gallery scroll | **Immediate** — pure client UI |

A normal browser refresh alone does **not** load new Sanity content. The exported site has no server runtime to query Sanity on each request.

Publishing or unpublishing a **Sfeerbeeld** requires the same **Cloudflare rebuild** as events — there is no live CMS fetch in the browser.

### Future options for faster CMS updates

| Approach | Notes |
|----------|-------|
| **Cloudflare Pages rebuild on git push** | Already typical if Studio content triggers a deploy hook after export/migration scripts |
| **Sanity webhook → Cloudflare Pages deploy hook** | On publish, POST to Cloudflare to trigger a rebuild (recommended for this static architecture) |
| **Move off pure static export** | Use Next.js on a Node/edge host with ISR or the Sanity Live Content API (requires API token and non-export hosting) |
| **Client-side fetch from Sanity CDN** | Possible without a token, but shifts load to the browser and changes loading/SEO behavior |

### Recommended Sanity webhook filter

When configuring a webhook in Sanity to trigger a Cloudflare Pages deploy hook, use this GROQ filter so both content types trigger rebuilds:

```
_type in ["event", "galleryImage"]
```

Do not store the deploy-hook URL in application code — configure it only in Sanity and Cloudflare.

## Cloudflare Pages

Add the same public env vars in **Settings → Environment variables**:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Redeploy after changing them. No secret Sanity token is required.

### Limitations

- **Static export**: no on-demand revalidation, no server-side fetch at request time.
- **Build-time only**: Sanity outages during build use the JSON fallbacks if the fetch fails.
- **CORS**: not required for build-time CDN reads; only relevant if you later fetch from the browser.
- **Portable Text**: event `fullDescription` and `recap` are converted to plain text for the existing modal layout.

## File map

```
incany-cafe/src/lib/sanity/
  client.ts    # Public CDN client (no token)
  queries.ts   # GROQ for published events and gallery images
  image.ts     # cdn.sanity.io image URLs
  events.ts    # Fetch, map to Event type, JSON fallback
  gallery.ts   # Fetch, map to GalleryItem type, JSON fallback
```
