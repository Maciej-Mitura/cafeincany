# About Section Image Update

**Date**: Wednesday, Jun 24, 2026  
**Component Modified**: `src/components/About.tsx`

## Summary

Updated the "Ons Verhaal" (About) section image to match the Hero section's design, replacing the placeholder with the actual photo of Gio and Aleksandra.

## Changes Made

### 1. Image Import
- Added `Image` component import from `next/image`

### 2. Replaced Placeholder Content
- **Removed**:
  - Gradient background
  - Animated decorative circles
  - Pattern overlay (grid)
  - Coffee cup icon
  - Placeholder text ("Your Photo Here")
  - Decorative frame badge
  - Dark vignette overlay

- **Added**:
  - `Image` component with `/GioAleksandraImg.jpg`
  - Set `fill` prop for responsive sizing
  - Used `object-cover` for proper image fitting
  - Added appropriate `sizes` prop: `(max-width: 768px) 100vw, 50vw`
  - Alt text: "Café In Cany - Gio en Aleksandra"

### 3. Corner Light Effects
Applied the same four-corner light gradient effects as the Hero image:

```tsx
{/* Bottom-left corner - light glow */}
<div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/40 via-white/20 to-transparent pointer-events-none" />

{/* Bottom-right corner - light glow */}
<div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-white/40 via-white/20 to-transparent pointer-events-none" />

{/* Top-left corner - light glow */}
<div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-white/40 via-white/20 to-transparent pointer-events-none" />

{/* Top-right corner - light glow */}
<div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-white/40 via-white/20 to-transparent pointer-events-none" />
```

### 4. Preserved Features
- Hover state with scale effect (1.02x on hover)
- Shadow transition (from `var(--shadow)` to `var(--shadow-lg)`)
- Border and rounded corners
- External decorative pulsing circles (outside the container)
- Responsive height: `h-[500px] lg:h-[600px]`

## Visual Design

The image now features:
- **Real photo**: Gio and Aleksandra from `GioAleksandraImg.jpg`
- **Subtle light effects**: Four-corner white gradient glows (320px × 320px each)
  - Opacity: `from-white/40` to `via-white/20` to `to-transparent`
- **Clean presentation**: No overlays, patterns, or placeholder elements
- **Consistent styling**: Matches Hero section aesthetic

## Technical Details

### Image Configuration
- Source: `/GioAleksandraImg.jpg` (public directory)
- Next.js Image component for optimization
- Responsive sizing with `fill` prop
- Object-fit: `cover` for proper scaling

### Gradient Details
- Size: `w-80 h-80` (320px × 320px)
- Color: White with varying opacity (`white/40`, `white/20`, `transparent`)
- Direction: Each corner radiates outward (tr, tl, br, bl)
- Pointer events: Disabled (`pointer-events-none`) to avoid interaction issues

## Build Verification

✅ **TypeScript**: No type errors  
✅ **Build**: Successful compilation  
✅ **Linter**: No linting errors  

Build time: 19.5 seconds  
Next.js version: 16.1.6 (Turbopack)

## Files Modified

1. `src/components/About.tsx`
   - Added `Image` import
   - Replaced placeholder content with actual image
   - Added four-corner light gradient effects
   - Removed decorative placeholder elements

## User Experience

The About section now displays:
- A professional photo of the café owners
- Soft light effects on all four corners
- Smooth hover interaction with scale and shadow transition
- Consistent visual language with the Hero section
- No distracting overlays or placeholder text

## Notes

- The image is served from the `public/` directory for optimal Next.js performance
- Corner gradients use `pointer-events-none` to prevent interaction issues
- Hover state remains functional for enhanced user engagement
- Design consistency maintained across Hero and About sections
