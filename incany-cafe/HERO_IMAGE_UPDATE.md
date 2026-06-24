# Hero Component Image Update

**Date:** June 24, 2026  
**Changes:** Replaced placeholder with actual café image

---

## Summary

Replaced the Hero section placeholder with the actual `icon.jpg` image while preserving all visual effects and hover animations.

---

## Changes Made

### 1. **Added Next.js Image Component**
```tsx
// Before
import { useState } from "react";
import Button from "@/components/ui/Button";

// After
import Image from "next/image";
import Button from "@/components/ui/Button";
```

### 2. **Removed Placeholder Elements**
**Removed:**
- Coffee cup icon SVG
- "Image Placeholder" text that appears on hover
- "Replace with your café image" subtitle text
- Background gradient pattern (was behind placeholder)

**Kept all effects:**
- ✅ Hover scale animation (`group-hover:scale-[1.02]`)
- ✅ Animated floating circles (blur effects)
- ✅ Grid overlay pattern
- ✅ Gradient overlay (subtle darkening at bottom)
- ✅ Decorative pulsing circles outside the container
- ✅ Border and shadow
- ✅ Rounded corners

### 3. **Integrated Actual Image**
```tsx
{/* Café Image */}
<Image
  src="/icon.jpg"
  alt="Café In Cany"
  fill
  className="object-cover"
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Image Properties:**
- `fill`: Makes image fill the entire container (600px height on desktop, 400px on mobile)
- `object-cover`: Ensures image covers the area while maintaining aspect ratio
- `priority`: Loads image immediately (important for hero section)
- `sizes`: Responsive sizes for optimization (full width on mobile, 50% on desktop)

### 4. **File Location**
- **Source:** `src/app/icon.jpg` (92,897 bytes)
- **Copied to:** `public/icon.jpg` (for Next.js Image component access)
- **Referenced as:** `/icon.jpg` (served from public folder)

---

## Visual Result

### Desktop (1024px+)
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  Left: Hero Text               Right: Café Image          │
│  ┌──────────────────────┐      ┌─────────────────────┐   │
│  │ Uw Bruine Kroeg      │      │                     │   │
│  │ in het Hart van      │      │  [Café Image]       │   │
│  │ Moorslede            │      │                     │   │
│  │                      │      │  • Hover scale      │   │
│  │ Gezelligheid...      │      │  • Animated circles │   │
│  │                      │      │  • Grid overlay     │   │
│  │ [Bekijk Kaart]       │      │  • Gradient overlay │   │
│  │ [Routebeschrijving]  │      │                     │   │
│  └──────────────────────┘      └─────────────────────┘   │
│                                                            │
│                    [Scroll indicator ↓]                    │
└────────────────────────────────────────────────────────────┘
```

### Mobile (<1024px)
```
┌──────────────────────────┐
│                          │
│  Uw Bruine Kroeg         │
│  in het Hart van         │
│  Moorslede               │
│                          │
│  Gezelligheid...         │
│                          │
│  [Bekijk Kaart]          │
│  [Routebeschrijving]     │
│                          │
│  ┌──────────────────────┐│
│  │                      ││
│  │   [Café Image]       ││
│  │                      ││
│  │   400px height       ││
│  │                      ││
│  └──────────────────────┘│
│                          │
│  [Scroll indicator ↓]    │
└──────────────────────────┘
```

---

## Effects Preserved

### 1. **Hover Animation**
- Container scales to 102% on hover
- Smooth 500ms transition
- Applied via `group-hover:scale-[1.02]`

### 2. **Floating Circles**
- Two animated blur circles behind image
- One at top-left (32px × 32px, accent color)
- One at bottom-right (40px × 40px, accent-hover color)
- Float up and down with `animate-float` and `animate-float-delayed`

### 3. **Grid Overlay**
- Subtle 50px × 50px grid pattern
- 10% opacity
- Creates technical/modern aesthetic
- Overlaid on top of image

### 4. **Gradient Overlay**
- Dark gradient from bottom to top
- 60% opacity
- Makes text more readable if placed over image
- Subtle effect that doesn't hide image

### 5. **Decorative Elements**
- Pulsing blur circles outside container
- One at top-right (24px × 24px)
- One at bottom-left (32px × 32px)
- Slow pulse animation with staggered delay

---

## Before vs After

### Before (Placeholder)
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-muted)] via-[var(--surface-elevated)] to-[var(--surface)]" />
<div className="absolute inset-0 flex items-center justify-center">
  <div className="text-center space-y-4 p-8">
    <div className="w-24 h-24 mx-auto bg-[var(--accent)] rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
      <svg className="w-12 h-12 text-[var(--background)]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
      </svg>
    </div>
    <p className="text-[var(--text)] font-[family:var(--font-heading)] text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">Image Placeholder</p>
    <p className="text-[var(--text-secondary)] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Replace with your café image</p>
  </div>
</div>
```

### After (Actual Image)
```tsx
<Image
  src="/icon.jpg"
  alt="Café In Cany"
  fill
  className="object-cover"
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Result:**
- Much cleaner code
- No distracting overlay text on hover
- Professional appearance
- Fast loading with Next.js optimization
- All visual effects maintained

---

## Technical Details

### Image Optimization
Next.js Image component automatically:
- Serves optimized formats (WebP, AVIF) when supported
- Generates multiple sizes for responsive loading
- Lazy loads by default (overridden with `priority` for hero)
- Prevents Cumulative Layout Shift (CLS)

### Performance
- **Original size:** 92,897 bytes (90.7 KB)
- **Optimized:** Next.js serves smaller sizes based on viewport
- **Loading:** Priority loading for above-the-fold content
- **Format:** Automatic format selection (WebP/AVIF when supported)

### Accessibility
- Proper `alt` text: "Café In Cany"
- Image describes café branding/atmosphere
- Fallback for screen readers

---

## Files Modified

1. **`src/components/Hero.tsx`**
   - Added `Image` import from `next/image`
   - Removed coffee icon SVG
   - Removed placeholder text overlay
   - Removed background gradient pattern
   - Added Next.js Image component with proper props

2. **`public/icon.jpg`** (new)
   - Copied from `src/app/icon.jpg`
   - Now accessible at `/icon.jpg` URL
   - 92,897 bytes

---

## Testing Checklist

- [x] Build succeeds (`npm run build`)
- [x] TypeScript compilation passes
- [x] Image loads on page
- [x] Image covers container (no white space)
- [x] Hover scale animation works
- [x] Animated circles visible
- [x] Grid overlay visible
- [x] Gradient overlay subtle
- [x] Decorative pulsing circles outside container
- [x] Responsive (400px mobile, 600px desktop)
- [x] No coffee icon visible
- [x] No "Image Placeholder" text on hover

---

## Future Enhancements (Optional)

1. **Multiple Images:**
   - Could add image carousel/slider
   - Show different café views
   - Rotate images on interval

2. **Image Quality:**
   - If higher resolution available, replace `icon.jpg`
   - Recommended: 1200px × 800px minimum
   - Format: JPG or WebP for photos

3. **Parallax Effect:**
   - Could add subtle parallax on scroll
   - Image moves slower than page scroll
   - Creates depth

4. **Lightbox:**
   - Click image to view full-size
   - Show café photo gallery
   - Zoom functionality

---

## Maintenance Notes

To replace the image in the future:

1. **Prepare new image:**
   - Recommended size: 1200px × 800px (or larger)
   - Format: JPG or PNG
   - Optimize for web (compress to ~200KB)

2. **Replace file:**
   ```bash
   # Replace the image file
   cp new-cafe-image.jpg public/icon.jpg
   ```

3. **Or rename and update:**
   ```bash
   # Use a different name
   cp new-cafe-image.jpg public/cafe-hero.jpg
   ```
   
   Then update `src/components/Hero.tsx`:
   ```tsx
   <Image
     src="/cafe-hero.jpg"  // Update this line
     alt="Café In Cany"
     fill
     className="object-cover"
     priority
     sizes="(max-width: 768px) 100vw, 50vw"
   />
   ```

4. **Clear Next.js cache:**
   ```bash
   npm run build
   ```

---

**Implementation complete!** ✅

The Hero section now displays the actual café image with all visual effects preserved.
