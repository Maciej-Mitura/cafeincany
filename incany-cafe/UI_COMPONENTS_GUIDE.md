# UI Components Guide

## Overview
Reusable, consistent UI components that provide the foundation for the Café Incany website. These components ensure unified spacing, styling, and behavior across all sections.

---

## 📦 Components

### 1. Button Component
**Path**: `src/components/ui/Button.tsx`

A versatile button component with three variants, multiple sizes, and icon support.

#### Variants
- **Primary**: Accent-colored background, high emphasis (CTAs, submit buttons)
- **Secondary**: Outlined style with border, medium emphasis (alternative actions)
- **Ghost**: Transparent background, low emphasis (tertiary actions, links)

#### Sizes
- **Small** (`sm`): `px-4 py-2 text-sm` - Compact buttons
- **Medium** (`md`): `px-6 py-3 text-base` - Default size
- **Large** (`lg`): `px-8 py-4 text-lg` - Prominent CTAs

#### Props
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}
```

#### Usage Examples

**Primary CTA Button**
```tsx
import Button from '@/components/ui/Button';

<Button
  onClick={handleViewMenu}
  variant="primary"
  size="lg"
  icon={<ArrowRightIcon />}
>
  View Menu
</Button>
```

**Secondary Button**
```tsx
<Button
  variant="secondary"
  size="md"
  icon={<MapIcon />}
  iconPosition="left"
>
  Get Directions
</Button>
```

**Ghost Button (Link Style)**
```tsx
<Button
  variant="ghost"
  size="sm"
  onClick={scrollToContact}
>
  Learn More
</Button>
```

**Form Submit Button**
```tsx
<Button
  type="submit"
  variant="primary"
  size="lg"
  disabled={isSubmitting}
  className="w-full"
  icon={isSubmitting ? <SpinnerIcon /> : <SendIcon />}
>
  {isSubmitting ? 'Sending...' : 'Send Message'}
</Button>
```

#### Features
- ✅ Consistent hover/focus states
- ✅ Disabled state styling
- ✅ Icon support (left or right position)
- ✅ Icon animation on hover
- ✅ Keyboard accessible with focus rings
- ✅ Works with form submissions
- ✅ Custom className passthrough

---

### 2. Section Component
**Path**: `src/components/ui/Section.tsx`

A wrapper component that provides consistent spacing, background colors, and container widths for all page sections.

#### Props
```typescript
interface SectionProps {
  id?: string;                    // For anchor links
  children: ReactNode;
  className?: string;             // Additional classes
  background?: 'default' | 'surface' | 'elevated';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  containerWidth?: 'default' | 'narrow' | 'wide' | 'full';
}
```

#### Background Options
- **default**: `bg-[var(--background)]` - Main dark background (#1a1512)
- **surface**: `bg-[var(--surface)]` - Slightly lighter (#251e1a)
- **elevated**: `bg-[var(--surface-elevated)]` - Lightest (#2f2621)

#### Spacing Options
- **sm**: `py-12` (48px) - Minimal spacing
- **md**: `py-16` (64px) - Medium spacing
- **lg**: `py-20` (80px) - Default spacing
- **xl**: `py-24 lg:py-32` (96px / 128px) - Maximum spacing

#### Container Width Options
- **default**: `max-w-7xl` (1280px) - Standard content width
- **narrow**: `max-w-4xl` (896px) - Focused content
- **wide**: `max-w-[1400px]` - Wider layouts
- **full**: `max-w-full` - Full width

#### Usage Examples

**Standard Section**
```tsx
import Section from '@/components/ui/Section';

<Section id="about" background="default" spacing="lg">
  <SectionHeader title="About Us" />
  {/* Content */}
</Section>
```

**Alternating Backgrounds**
```tsx
// Highlights section - surface background
<Section id="highlights" background="surface" spacing="lg">
  {/* Content */}
</Section>

// Bestsellers section - default background
<Section id="bestsellers" background="default" spacing="lg">
  {/* Content */}
</Section>

// Menu section - surface background
<Section id="menu" background="surface" spacing="lg">
  {/* Content */}
</Section>
```

**Narrow Content Section**
```tsx
<Section id="terms" background="default" spacing="lg" containerWidth="narrow">
  <SectionHeader title="Terms & Conditions" />
  <div className="prose">
    {/* Text-heavy content */}
  </div>
</Section>
```

**Full-Width Hero Section**
```tsx
<Section id="hero" background="default" spacing="xl" containerWidth="wide">
  {/* Hero content */}
</Section>
```

#### Features
- ✅ Consistent vertical spacing across all sections
- ✅ Automatic horizontal padding (`px-4 sm:px-6 lg:px-8`)
- ✅ Centered content with max-width
- ✅ Responsive container widths
- ✅ ID anchors for smooth scrolling

---

### 3. SectionHeader Component
**Path**: `src/components/ui/SectionHeader.tsx`

A consistent header component for section titles with optional badge and subtitle.

#### Props
```typescript
interface SectionHeaderProps {
  badge?: string;           // Optional badge above title
  title: string;            // Main heading text
  subtitle?: string;        // Optional description
  align?: 'left' | 'center' | 'right';
  level?: 2 | 3;           // Heading level (h2 or h3)
  className?: string;       // Additional classes
}
```

#### Heading Sizes
- **Level 2** (h2): `text-3xl sm:text-4xl md:text-5xl` - Main section headings
- **Level 3** (h3): `text-2xl sm:text-3xl md:text-4xl` - Subsection headings

#### Usage Examples

**Simple Title**
```tsx
import SectionHeader from '@/components/ui/SectionHeader';

<SectionHeader
  title="About Us"
  align="center"
  level={2}
/>
```

**Title with Subtitle**
```tsx
<SectionHeader
  title="Our Menu"
  subtitle="Crafted with care, served with love. All items made fresh daily."
  align="center"
  level={2}
/>
```

**Title with Badge**
```tsx
<SectionHeader
  badge="Customer Favorites"
  title="Bestsellers"
  subtitle="The drinks and dishes our community can't get enough of"
  align="center"
  level={2}
/>
```

**Left-Aligned Subsection**
```tsx
<SectionHeader
  title="What We Care About"
  align="left"
  level={3}
/>
```

#### Features
- ✅ Consistent heading typography (Playfair Display)
- ✅ Responsive text sizes
- ✅ Optional badge with accent color
- ✅ Semantic heading levels for SEO
- ✅ Consistent bottom margin (`mb-12 lg:mb-16`)
- ✅ Flexible alignment options

---

## 🎨 Design System Integration

All UI components use the global CSS variables defined in `globals.css`:

### Colors
- `--background`: #1a1512
- `--surface`: #251e1a
- `--surface-elevated`: #2f2621
- `--text`: #f5f1ed
- `--text-secondary`: #d4cdc5
- `--accent`: #d4a574
- `--accent-hover`: #e4b584

### Spacing
- `--radius`: 0.75rem (12px)
- `--radius-lg`: 1rem (16px)
- `--radius-sm`: 0.5rem (8px)

### Shadows
- `--shadow`: Soft shadow for cards
- `--shadow-lg`: Elevated shadow for hover states

---

## 🏗️ Architecture Benefits

### Consistency
- Unified button styles across all components
- Consistent section spacing and structure
- Standardized heading hierarchy

### Maintainability
- Single source of truth for common patterns
- Easy to update styles globally
- Reduced code duplication

### Accessibility
- Semantic HTML by default
- Consistent focus states
- Proper ARIA attributes

### Developer Experience
- Simple, intuitive API
- TypeScript support with full type safety
- Flexible prop system for customization

---

## 📋 Component Checklist

When creating a new section:
- ✅ Wrap content in `<Section>` component
- ✅ Use `<SectionHeader>` for titles
- ✅ Use `<Button>` for all interactive buttons
- ✅ Add proper `id` for anchor links
- ✅ Choose appropriate `background` for alternation
- ✅ Set correct heading `level` for hierarchy

---

## 🎯 Migration Guide

### Before (Old Pattern)
```tsx
<section className="py-20 bg-[var(--surface)]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-[family:var(--font-heading)] text-[var(--text)] mb-4">
        Our Menu
      </h2>
      <p className="text-lg text-[var(--text-secondary)]">
        Description
      </p>
    </div>
    <button className="bg-[var(--accent)] text-[var(--background)] px-6 py-3 rounded-[var(--radius)]...">
      View More
    </button>
  </div>
</section>
```

### After (New Pattern)
```tsx
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

<Section id="menu" background="surface" spacing="lg">
  <SectionHeader
    title="Our Menu"
    subtitle="Description"
    align="center"
    level={2}
  />
  <Button variant="primary" size="md">
    View More
  </Button>
</Section>
```

### Benefits of Migration
- **70% less code** for section boilerplate
- **Consistent spacing** automatically applied
- **Type-safe props** catch errors early
- **Easier to read** and understand structure

---

## 🔧 Customization

### Extending Button Styles
```tsx
<Button 
  variant="primary" 
  className="shadow-2xl transform hover:rotate-2"
>
  Custom Button
</Button>
```

### Custom Section Background
```tsx
<Section 
  background="default" 
  className="bg-gradient-to-b from-[var(--background)] to-[var(--surface)]"
>
  {/* Content */}
</Section>
```

### Adding New Button Variant
Edit `src/components/ui/Button.tsx`:
```tsx
const variantStyles: Record<ButtonVariant, string> = {
  primary: '...',
  secondary: '...',
  ghost: '...',
  danger: 'bg-[var(--error)] text-white hover:bg-red-700', // New variant
};
```

---

## ♿ Accessibility Features

### Button Component
- Semantic `<button>` element
- Focus visible ring (keyboard navigation)
- Disabled state with `cursor-not-allowed`
- ARIA-hidden on decorative icons

### Section Component
- Proper `<section>` landmark
- ID attributes for skip links
- Semantic HTML structure

### SectionHeader Component
- Proper heading levels (h2, h3)
- Screen reader friendly
- Descriptive hierarchy

---

## ⚡ Performance

### Optimizations
- No runtime overhead (pure CSS transitions)
- No external dependencies
- Tree-shakeable exports
- Minimal bundle impact (~2KB gzipped)

### Best Practices
- Use `Button` instead of styled divs or anchors
- Let `Section` handle spacing instead of manual classes
- Leverage `SectionHeader` for consistent typography

---

## 📚 Related Documentation
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Color palette and typography
- [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) - Page-level components
- [COMPLETE_SITE_OVERVIEW.md](./COMPLETE_SITE_OVERVIEW.md) - Full site structure

---

## ✅ Component Summary

| Component | Purpose | Props | Use When |
|-----------|---------|-------|----------|
| **Button** | Interactive actions | variant, size, icon | Any clickable action needed |
| **Section** | Page sections | id, background, spacing | Wrapping major content areas |
| **SectionHeader** | Section titles | title, subtitle, badge | Starting a new content section |

**All components are production-ready and fully accessible!** 🎉
