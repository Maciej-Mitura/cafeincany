# Logo Integration Guide

## Overview
Your café's logo (`public/logo.jpg`) has been integrated into the Navbar and Footer components with proper styling for dark background visibility.

---

## 🎨 Logo Details

**Current Logo**: `public/logo.jpg`
- Text-based logo: "Cafe In Cany"
- Includes address: "Kerkstraat 3 8890 Moorslede"
- White background
- Black text

---

## 📍 Where Logo Appears

### 1. Navbar (Top Navigation)
**Location**: Top-left corner
**Styling**:
- Light background badge (white/95 opacity)
- Rounded corners for modern look
- Subtle shadow for depth
- Size: 120x48px
- Hover effect: Scales to 105%
- Click action: Scrolls to home section
- Priority loading (LCP optimization)

### 2. Footer (Bottom)
**Location**: First column, top
**Styling**:
- Light background badge (white/95 opacity)
- Rounded corners
- Subtle shadow
- Size: 140x56px (slightly larger)
- Static (no hover effect needed)

---

## 🎨 Dark Background Solution

Since your logo has a **white background** and the site uses a **dark theme**, we've added:

### Light Background Badge
```tsx
<div className="bg-white/95 rounded-[var(--radius-sm)] px-3 py-2" 
     style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
  <Image src="/logo.jpg" ... />
</div>
```

**Features**:
- `white/95` - 95% opacity white background
- Padding around logo for breathing room
- Rounded corners match design system
- Subtle shadow for depth
- Contrasts well with dark surfaces

---

## 📐 Responsive Sizing

### Navbar Logo
- **Mobile**: 120x48px (compact for small screens)
- **Desktop**: Same size (consistent)
- **Hover**: Scales to 105% for interaction feedback

### Footer Logo
- **All screens**: 140x56px (slightly larger, more prominent)
- **No hover**: Static for footer context

---

## 🔧 Customization

### Change Logo File
Simply replace `public/logo.jpg` with your new logo:
```bash
# Replace the file
public/logo.jpg (your new logo)
```

### Adjust Logo Size

**Navbar**:
```tsx
<Image
  src="/logo.jpg"
  alt="Café Incany Logo"
  width={150}  // Change width
  height={60}  // Change height
  className="object-contain"
/>
```

**Footer**:
```tsx
<Image
  src="/logo.jpg"
  width={160}  // Change width
  height={64}  // Change height
/>
```

### Remove Background Badge
If your logo has a transparent background or works well on dark:
```tsx
// Remove the wrapper div
<Image src="/logo.jpg" alt="..." width={120} height={48} />
```

### Change Background Color
```tsx
// Instead of white/95
<div className="bg-[var(--accent)]/20 rounded-[var(--radius-sm)] ...">
  <Image ... />
</div>
```

### Add Border
```tsx
<div className="bg-white/95 rounded-[var(--radius-sm)] px-3 py-2 border border-[var(--border)]">
  <Image ... />
</div>
```

---

## 🎨 Design Considerations

### Why Light Background Badge?
1. **Contrast**: White background ensures logo text is readable
2. **Consistency**: Logo looks the same everywhere
3. **Flexibility**: Works regardless of scroll state or section
4. **Polish**: Shadow adds depth and premium feel

### Alternative Approaches

**Option 1: Invert Logo Colors**
If you have a version with light text on transparent:
```tsx
<Image 
  src="/logo-light.png"
  className="invert-0" // No inversion needed
/>
```

**Option 2: SVG Logo**
For best quality and flexibility:
```tsx
<Image 
  src="/logo.svg"
  // SVG scales perfectly at any size
/>
```

**Option 3: Conditional Styling**
Different logo for scrolled/not scrolled:
```tsx
<Image 
  src={isScrolled ? "/logo.jpg" : "/logo-light.png"}
  alt="Logo"
/>
```

---

## ♿ Accessibility

✅ **Alt Text**: Descriptive alt text on all logo instances  
✅ **Priority Loading**: Navbar logo uses `priority` flag (LCP)  
✅ **Focus States**: Navbar logo button has focus ring  
✅ **Semantic**: Logo wrapped in button/link element  
✅ **Click Target**: Adequate size for interaction  

---

## ⚡ Performance

### Optimization
- **Priority Loading**: Navbar logo loads first (critical)
- **Next.js Image**: Automatic optimization
- **Lazy Loading**: Footer logo lazy loads
- **Object-Contain**: Maintains aspect ratio
- **No Layout Shift**: Explicit width/height set

### Loading Strategy
```tsx
// Navbar - priority (above fold)
<Image priority />

// Footer - lazy (below fold, default)
<Image />
```

---

## 🔍 Logo Specifications

### Current Logo
- **File**: `public/logo.jpg`
- **Format**: JPEG
- **Background**: White
- **Text**: Black
- **Content**: "Cafe In Cany" + address

### Recommended Logo Specs
For best results, consider:
- **Format**: SVG (scales perfectly) or PNG with transparency
- **Size**: 500x200px minimum (high resolution)
- **Background**: Transparent or solid color
- **Colors**: Consider both light and dark versions
- **File size**: < 100KB optimized

---

## 🎯 Implementation Details

### Navbar Implementation
```tsx
<button onClick={() => scrollToSection('#home')}>
  <div className="bg-white/95 rounded-[var(--radius-sm)] px-3 py-1">
    <Image
      src="/logo.jpg"
      alt="Café Incany Logo"
      width={120}
      height={48}
      className="object-contain"
      priority
    />
  </div>
</button>
```

**Features**:
- Clickable (scrolls to home)
- Focus ring for accessibility
- Hover scale effect
- Light background badge

### Footer Implementation
```tsx
<div className="inline-block">
  <div className="bg-white/95 rounded-[var(--radius-sm)] px-3 py-2">
    <Image
      src="/logo.jpg"
      alt="Café Incany Logo"
      width={140}
      height={56}
      className="object-contain"
    />
  </div>
</div>
```

**Features**:
- Inline-block wrapper for sizing
- Light background badge
- Slightly larger than navbar
- Static (no interactions)

---

## 🎨 Styling Details

### Background Badge Styling
```css
bg-white/95           /* 95% white opacity */
rounded-[var(--radius-sm)]  /* 0.5rem (8px) */
px-3 py-2            /* Padding: 12px horizontal, 8px vertical */
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'  /* Soft shadow */
```

### Logo Image Styling
```css
object-contain       /* Maintains aspect ratio */
width: 120px (Navbar) / 140px (Footer)
height: 48px (Navbar) / 56px (Footer)
```

---

## 🔄 Future Updates

### When You Replace the Logo

1. **Add new logo file** to `public/`
2. **Update references** in Navbar and Footer:
   ```tsx
   src="/your-new-logo.png"
   ```
3. **Adjust sizing** if needed (width/height)
4. **Test on dark background** to ensure visibility
5. **Check mobile rendering**

### If Logo Has Transparent Background

Remove the white background wrapper:
```tsx
// Simpler version
<Image
  src="/logo-transparent.png"
  alt="Café Incany Logo"
  width={120}
  height={48}
  className="object-contain"
/>
```

### If Logo Has Dark Colors

No background badge needed:
```tsx
<Image
  src="/logo-dark.png"
  alt="Café Incany Logo"
  width={120}
  height={48}
  className="object-contain"
/>
```

---

## ✅ Integration Complete

Your logo is now:
- ✅ Visible in Navbar and Footer
- ✅ Optimized with Next.js Image
- ✅ Styled with light background badge
- ✅ Properly scaled for all screens
- ✅ Clickable in Navbar
- ✅ Accessible with alt text
- ✅ Performance optimized

**The logo looks great on your dark background!** 🎨✨
