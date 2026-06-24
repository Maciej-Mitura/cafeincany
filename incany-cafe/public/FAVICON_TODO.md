# Favicon TODO

## Current Status

✅ **Temporary:** A simple beer mug SVG icon has been added as `src/app/icon.svg`
⚠️ **Recommended:** Replace with actual café logo

## Next.js App Router Favicon Conventions

Next.js automatically handles favicons using these files in `src/app/`:

### Recommended Setup (after logo available)

1. **`icon.png` or `icon.jpg`** (32x32 or larger, square)
   - Main favicon
   - Automatically resized for different contexts

2. **`apple-icon.png`** (180x180)
   - Apple touch icon for iOS home screen
   - Recommended for better mobile appearance

3. **Alternative: `icon.svg`** (currently used)
   - Scalable vector favicon
   - Good for modern browsers
   - Currently a placeholder beer mug icon

### Files to Create (Optional)

- `favicon.ico` in `public/` for legacy browser support
- Multiple sizes: 16x16, 32x32, 48x48 combined in one .ico file

## How to Replace

### Option 1: PNG/JPG (Recommended)

```
src/app/icon.png (512x512 or 1024x1024, square)
src/app/apple-icon.png (180x180)
```

Delete `icon.svg` after adding PNG

### Option 2: Keep SVG

Replace `src/app/icon.svg` with café logo in SVG format

### Option 3: Dynamic Icon (Advanced)

Create `src/app/icon.tsx` for programmatic icon generation

## Logo Requirements

- **Square format** (1:1 ratio)
- **Recognizable at small sizes** (favicon shows at 16x16 - 32x32px)
- **Simple design** works best for small icons
- **High contrast** for visibility

## Testing

After adding favicon:

1. Clear browser cache
2. Visit site in incognito/private mode
3. Check browser tab shows correct icon
4. Test on mobile (iOS home screen, Android)
5. Validate with: https://realfavicongenerator.net/

## Current Placeholder

The current `icon.svg` shows:

- Dark brown background (café color)
- Simple beer mug illustration
- "IC" initials at bottom

**This should be replaced with the actual Café In Cany logo when available.**
