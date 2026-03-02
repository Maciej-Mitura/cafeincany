# Components Documentation

## Table of Contents
- [Navbar Component](#navbar-component)
- [Hero Component](#hero-component)
- [Highlights Component](#highlights-component)
- [Bestsellers Component](#bestsellers-component)
- [About Component](#about-component)
- [Menu Component](#menu-component)
- [Gallery Component](#gallery-component)
- [Location Component](#location-component)
- [Contact Component](#contact-component)
- [Footer Component](#footer-component)

---

# Hero Component

## Overview
A polished, responsive hero section with two-column layout featuring content on the left and an animated image placeholder on the right.

## Features

### ✅ Two-Column Layout
- **Desktop**: Side-by-side columns with image on right
- **Mobile**: Stacked layout, content first
- Responsive gap spacing
- Centered vertical alignment

### ✅ Left Column Content

#### Headline
- Large, attention-grabbing typography (5xl to 7xl)
- Highlighted "Story" word with accent color
- Animated underline SVG that draws on load
- Uses Playfair Display heading font

#### Subhead
- Supporting description text
- Responsive sizing (lg to 2xl)
- Secondary text color for hierarchy
- Max-width for optimal readability

#### Primary CTA: "View Menu"
- Accent-colored button with shadow
- Smooth scroll to menu section
- Arrow icon that slides right on hover
- Scale-up animation on hover
- Background color transition effect

#### Secondary CTA: "Get Directions"
- Outlined button style
- Opens Google Maps with cafe location
- Location pin icon that rotates on hover
- Border color transitions

#### Feature Badges
- 3 badges: ☕ Specialty Coffee, 🥐 Fresh Pastries, 📶 Free Wi-Fi
- Hover effects: lift and shadow
- Emoji icons with scale animation
- Responsive flex layout

### ✅ Right Column - Image Placeholder

#### Visual Elements
- Large rounded container with border
- Gradient background (accent to surface)
- Animated floating circles with blur
- Grid pattern overlay
- Bottom gradient fade
- Coffee cup icon in center

#### Animations
- Subtle scale-up on hover (1.02x)
- Floating blur circles (6s & 8s cycles)
- Pulsing decorative elements
- Rotating icon on hover
- Smooth opacity transitions for overlays

### ✅ Lightweight Motion

#### Entrance Animation
- Fade-in-up effect for left content (1s)
- Staggered appearance feels natural
- No jarring movements

#### Hover Effects
- CTA buttons: scale, color change, icon movement
- Feature badges: lift with shadow
- Image container: subtle scale
- Icon rotation (12deg for directions, full for coffee cup)

#### Background Animations
- Floating circles (6s & 8s cycles)
- Pulse effect on decorative blurs (4s)
- All use ease-in-out for smoothness

### ✅ Scroll Indicator
- Animated bouncing arrow at bottom
- Points users to scroll down
- Auto-hidden on mobile (can be customized)

## Technical Details

### Animations
```css
- fade-in-up: 1s entrance animation
- draw-line: 1.5s SVG line animation
- float: 6s infinite floating effect
- float-delayed: 8s infinite floating (offset)
- pulse-slow: 4s infinite subtle pulse
```

### State Management
- `hoveredFeature`: Tracks which badge is hovered for enhanced effect

### External Navigation
Opens Google Maps for directions:
```javascript
const address = encodeURIComponent('123 Coffee Street, Your City, ST 12345');
window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
```

## Usage

### Basic Implementation
```tsx
import Hero from '@/components/Hero';

export default function Page() {
  return (
    <div id="home">
      <Hero />
    </div>
  );
}
```

### Customization

#### Change Headline
```tsx
<h1>
  Your Custom{' '}
  <span className="text-[var(--accent)]">
    Headline
    {/* Underline SVG */}
  </span>
</h1>
```

#### Modify CTAs
```tsx
const handlePrimaryCTA = () => {
  // Your custom action
};

const handleSecondaryCTA = () => {
  // Your custom action
};
```

#### Update Feature Badges
```tsx
const features: FeatureBadge[] = [
  { icon: '🎵', text: 'Live Music' },
  { icon: '🌱', text: 'Organic Options' },
  { icon: '💳', text: 'Card Accepted' },
];
```

#### Replace Image Placeholder
Replace the entire right column div with:
```tsx
<div className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden">
  <Image
    src="/your-image.jpg"
    alt="Cafe interior"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
</div>
```

## Responsive Behavior

### Desktop (1024px+)
- Two columns side-by-side
- Hero height: min-h-screen
- Image height: 600px
- Larger text sizes

### Tablet (768px - 1023px)
- Stacked layout begins
- Reduced gap spacing
- Medium text sizes

### Mobile (< 768px)
- Fully stacked
- Image height: 400px
- Smaller typography
- Full-width CTAs

## Styling

### Colors
- Headline: `--text`
- Accent word: `--accent`
- Subhead: `--text-secondary`
- Primary CTA: `--accent` background
- Secondary CTA: `--surface` background with `--border`

### Typography
- Headline: Playfair Display (heading font)
- Body: Inter (default)
- Responsive sizes with `text-5xl` to `text-7xl`

### Spacing
- Container: max-w-7xl
- Grid gap: 12 (lg:16)
- Vertical spacing: space-y-8 (lg:10)

## Accessibility

✅ **Semantic HTML**
- Proper section element
- Heading hierarchy
- Button elements (not divs)

✅ **Keyboard Navigation**
- All CTAs are focusable
- Visible focus rings
- Logical tab order

✅ **Focus States**
- Ring with offset on buttons
- Accent color indicators
- Proper contrast

✅ **Motion**
- Animations are smooth and subtle
- No rapid flashing
- respects reduced motion (can be added)

## Performance

- CSS-only animations (no JS animation loops)
- Optimized transforms (GPU-accelerated)
- Lazy loading ready for images
- No heavy dependencies

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

---

# Navbar Component Documentation

## Overview
A fully responsive navigation bar with active section highlighting, smooth scrolling, and mobile hamburger menu.

## Features

### ✅ Logo
- Real logo image (`/logo.jpg`) with light background badge
- Optimized with Next.js Image component
- Clickable to scroll to home section
- Scales well on dark background with 95% white background and shadow

### ✅ Navigation Links
- Home, About, Menu, Info, Contact sections
- Active section highlighting using IntersectionObserver
- Smooth scroll to sections on click
- Hover states with visual feedback

### ✅ CTA Button
- "View Menu" primary action button
- Scrolls smoothly to menu section
- Styled with accent color and shadow

### ✅ Mobile Responsive
- Hamburger menu icon on mobile/tablet
- Animated slide-down panel
- Close icon when menu is open
- All navigation links accessible in mobile menu

### ✅ Active Section Detection
Uses IntersectionObserver to detect which section is currently visible:
- Observes when sections enter the viewport
- Highlights corresponding nav link
- Works on both desktop and mobile
- Centered viewport detection (50% threshold)

### ✅ Scroll Behavior
- Background becomes opaque on scroll
- Adds subtle shadow when scrolled
- Smooth backdrop blur effect
- Border appears at bottom

## Technical Details

### IntersectionObserver Configuration
```javascript
{
  root: null,
  rootMargin: '-50% 0px -50% 0px',  // Triggers when section is in center
  threshold: 0,
}
```

### State Management
- `isOpen`: Controls mobile menu visibility
- `activeSection`: Tracks currently visible section
- `isScrolled`: Detects scroll position for styling

### Smooth Scrolling
```javascript
section.scrollIntoView({ behavior: 'smooth', block: 'start' })
```

## Usage

### Basic Implementation
```tsx
import Navbar from '@/components/Navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">...</section>
        <section id="about">...</section>
        <section id="menu">...</section>
        <section id="info">...</section>
        <section id="contact">...</section>
      </main>
    </>
  );
}
```

### Required Section IDs
Make sure each section has the corresponding ID:
- `#home`
- `#about`
- `#menu`
- `#info`
- `#contact`

### Customization

#### Add/Remove Links
Edit the `navLinks` array in `Navbar.tsx`:
```tsx
const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  // Add more links...
];
```

#### Change Logo
The logo is already integrated from `/public/logo.jpg`. To replace it:
```tsx
// Simply replace the logo file in public/logo.jpg
// Or update the Image src:
<Image
  src="/your-new-logo.png"
  alt="Your Café Logo"
  width={120}
  height={48}
/>
```
See `LOGO_INTEGRATION.md` for detailed customization options.

#### Change CTA Button
Modify the CTA button text and action:
```tsx
<button
  onClick={scrollToMenu}  // Change target function
  className="..."
>
  Your CTA Text
</button>
```

## Styling

### Desktop
- Fixed position at top
- Transparent initially, opaque on scroll
- Horizontal layout with space-between
- Links displayed inline

### Mobile (< 768px)
- Hamburger icon replaces links
- Mobile menu slides down from top
- Full-width buttons
- Stacked layout

## Accessibility

✅ **Keyboard Navigation**
- All interactive elements are focusable
- Visible focus indicators (ring-2)
- Tab order is logical

✅ **ARIA Attributes**
- `aria-expanded` on mobile menu button
- `aria-label` for hamburger icon

✅ **Color Contrast**
- All text meets WCAG AA standards
- Focus indicators use accent color

✅ **Screen Readers**
- Semantic HTML elements
- Descriptive button labels
- Focus visible states

## Performance

- Uses native IntersectionObserver (no dependencies)
- Cleanup on component unmount
- Optimized re-renders with proper state management
- Smooth CSS transitions (no JavaScript animations)

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

---

# Highlights Component

## Overview
A premium three-card section showcasing key café features with icons, titles, and descriptions.

## Features

### ✅ Three-Card Grid
- Responsive layout (stacks on mobile, 3 columns on desktop)
- Equal height cards with consistent spacing
- Premium feel with subtle borders and shadows

### ✅ Card Elements
Each card includes:
- **Icon**: SVG icon in accent-colored container
- **Title**: Bold heading in Playfair Display
- **Description**: Single sentence explaining the feature

### ✅ Premium Styling
- Subtle border with elevated surface background
- Default shadow that increases on hover
- Rounded corners for modern look
- Consistent 8px (2rem) padding

### ✅ Hover Effects
- Card lifts 8px vertically
- Shadow increases to lg variant
- Icon container scales and accent intensifies
- Icon itself scales 110%
- Title color changes to accent
- Smooth 300ms transitions

### ✅ Sample Content
- **Artisan Roasted**: Bean selection and roasting process
- **Sustainability First**: Ethical sourcing and eco-friendly packaging
- **Community Hub**: Social gathering space emphasis

## Usage

```tsx
import Highlights from '@/components/Highlights';

export default function Page() {
  return <Highlights />;
}
```

## Customization

### Update Content
```tsx
// In Highlights.tsx, line ~8
const highlights: Highlight[] = [
  {
    icon: <YourSVG />,
    title: 'Your Title',
    description: 'Your description here.',
  },
  // Add more highlights...
];
```

### Change Colors
Icons use `--accent` color by default. Modify the icon container:
```tsx
<div className="bg-[var(--accent)]/10 border-[var(--accent-muted)]">
  {/* Icon */}
</div>
```

## Styling Details

- **Background**: `--surface` (matches alternating sections)
- **Cards**: `--surface-elevated` with `--border`
- **Icon Container**: Accent/10 opacity with muted border
- **Hover Shadow**: Transitions from default to lg
- **Text Hierarchy**: Heading text → accent on hover, body remains secondary

## Accessibility

✅ Semantic section element  
✅ Proper heading hierarchy  
✅ Adequate color contrast  
✅ Hover states are visual-only (no critical information)  
✅ Keyboard accessible (focusable cards)  

---

# Bestsellers Component

## Overview
A grid-based menu section displaying 4-6 bestselling items with names, descriptions, prices, and dietary tags.

## Features

### ✅ Menu Item Grid
- Responsive: 1 column mobile → 2 tablet → 3 desktop
- 6 sample items included
- Consistent card sizing and spacing

### ✅ Card Elements
Each menu item includes:
- **Name**: Dish/drink name in Playfair Display
- **Price**: Prominent accent-colored pricing
- **Description**: Short appetizing description
- **Dietary Tags**: Vegetarian, Vegan, Gluten-Free, Allergen info
- **New Badge**: Optional "New" label for recent additions

### ✅ Premium Card Design
- Subtle border with surface background
- Default shadow with hover enhancement
- Rounded corners (lg radius)
- Consistent 6px (1.5rem) padding
- Hover lift effect (4px)

### ✅ Hover Effects
- Card lifts 4px vertically
- Border changes to accent-muted
- Shadow increases to lg
- Title changes to accent color
- Bottom accent line animates from 0 to 100% width
- Smooth 300ms transitions

### ✅ Dietary Tags
Color-coded for quick recognition:
- **Success (Green)**: Vegetarian, Vegan, Gluten-Free
- **Warning (Gold)**: Allergen info (Contains Nuts)
- **Accent (Brown)**: Availability info (Gluten-Free Available)

### ✅ Sample Items
1. **Signature Incany Latte** - House blend with vanilla & cinnamon
2. **Honey Almond Croissant** - Buttery layers with almond cream
3. **Cold Brew Float** - Cold brew with vanilla ice cream (NEW)
4. **Avocado Toast Supreme** - Sourdough with avocado & feta
5. **Vegan Berry Bowl** - Açaí with berries & granola
6. **Caramel Macchiato** - Espresso with caramel drizzle

### ✅ View Full Menu CTA
- Secondary button at bottom
- Smooth scroll to menu section
- Arrow icon slides right on hover

## Usage

```tsx
import Bestsellers from '@/components/Bestsellers';

export default function Page() {
  return <Bestsellers />;
}
```

## Customization

### Add/Edit Menu Items
```tsx
// In Bestsellers.tsx, line ~18
const menuItems: MenuItem[] = [
  {
    name: 'Your Item Name',
    description: 'Delicious description here',
    price: '$X.XX',
    tags: [
      { label: 'Vegetarian', color: 'success' },
      { label: 'Gluten-Free', color: 'accent' },
    ],
    isNew: true, // Optional
  },
];
```

### Customize Tag Colors
```tsx
// In Bestsellers.tsx, line ~48
const getTagStyles = (color: string) => {
  const styles = {
    success: { bg: 'var(--success)', text: 'var(--background)' },
    warning: { bg: 'var(--warning)', text: 'var(--background)' },
    accent: { bg: 'var(--accent-muted)', text: 'var(--text)' },
    custom: { bg: 'your-color', text: 'your-text-color' },
  };
  return styles[color as keyof typeof styles];
};
```

### Change Grid Layout
```tsx
// Modify the grid classes
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* For 4 columns instead of 3 */}
</div>
```

## Styling Details

- **Background**: `--background` (dark base)
- **Cards**: `--surface` with `--border`
- **Price**: `--accent` (prominent)
- **New Badge**: Accent background with border
- **Bottom Line**: Accent color, animates on hover
- **Section Badge**: "Customer Favorites" with accent styling

## Accessibility

✅ Semantic section element  
✅ Proper heading hierarchy (h2 for section, h3 for items)  
✅ High contrast text and prices  
✅ Color-coded tags with text labels (not color-only)  
✅ Hover states don't hide critical info  
✅ Focus visible on CTA button  

## Performance

- Lightweight hover state management
- CSS transitions (GPU-accelerated)
- No heavy images (ready for optimization when adding photos)
- Efficient re-renders with proper React patterns

## Future Enhancements

- Add item images
- Filter by dietary preference
- Add to cart functionality
- Detailed item modal on click
- Animations for new items

---

# About Component

## Overview
A warm, authentic About section with a personal story, three core values, and a photo placeholder card. Uses conversational, local tone—no corporate speak.

## Features

### ✅ Two-Column Layout
- **Left**: Story text + "What We Care About" bullets
- **Right**: Photo placeholder card with animations
- Responsive: Stacks on mobile, side-by-side on desktop

### ✅ Story Text (Our Story)
- **3-6 lines** of warm, personal narrative
- Conversational tone ("we realized", "coming home")
- Local and authentic feel
- Avoids corporate language
- Focus on community and real connections

**Sample Story:**
> "Café Incany started in 2019 when we realized our neighborhood needed more than just another coffee shop. We wanted to create a space that felt less like a transaction and more like coming home.
> 
> What began as a dream scribbled on napkins turned into this cozy corner you're reading about. We've poured our hearts (and a lot of espresso) into building something real—a place where the barista knows your name, the coffee's actually good, and you can stay as long as you'd like.
> 
> Today, we're proud to be part of this community. Every cup we serve, every pastry we bake, and every smile we share is our way of saying: you matter here."

### ✅ What We Care About (3 Bullets)
Each value includes:
- **Title**: Bold, conversational heading
- **Description**: Honest explanation in plain language
- **Icon**: Accent-colored dot in circle
- **Hover Effect**: Title changes to accent color

**Three Values:**

1. **Real Conversations**
   - "We're not just slinging coffee—we're building a place where you can actually slow down, chat with neighbors, and feel like you belong."

2. **The Good Stuff**
   - "Every bean is ethically sourced, every pastry is baked in-house, and every ingredient matters. No shortcuts, just honest food and drink."

3. **Our Community**
   - "This neighborhood isn't just where we work—it's home. We support local artists, host open mics, and make sure everyone has a seat at the table."

### ✅ Photo Placeholder Card
- Large visual container (500-600px height)
- Gradient background with animated blur circles
- Coffee cup icon that rotates on hover
- Helper text: "Your Photo Here" + guidance
- "Placeholder Image" badge at bottom
- Hover effect: scales to 102%
- Decorative corner elements with pulse animation

### ✅ Bottom CTA
- "Want to know more about our story?"
- Link to contact section
- Contained in subtle card design

## Usage

```tsx
import About from '@/components/About';

export default function Page() {
  return <About />;
}
```

## Customization

### Update Story Text
```tsx
// In About.tsx, line ~29
<p>
  Your café's origin story here...
</p>
<p>
  More narrative...
</p>
```

### Modify "What We Care About"
```tsx
// In About.tsx, line ~8
const careAboutItems = [
  {
    title: 'Your Value Title',
    description: 'Your honest, conversational description here.',
  },
];
```

### Replace Photo Placeholder
```tsx
// In About.tsx, replace the placeholder div with:
<div className="relative h-[500px] lg:h-[600px] rounded-[var(--radius-lg)] overflow-hidden">
  <Image
    src="/about-photo.jpg"
    alt="Café Incany interior"
    fill
    className="object-cover"
  />
  {/* Optional overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent" />
</div>
```

### Change Tone
The component uses casual, authentic language:
- "not just slinging coffee" 
- "coming home"
- "you matter here"

To adjust tone, edit the strings while maintaining warmth and avoiding:
- Corporate jargon
- Buzzwords ("synergy", "leverage", "best-in-class")
- Overly formal language
- Empty promises

## Styling Details

- **Background**: `--background` (dark base)
- **Story Text**: `--text-secondary` (readable contrast)
- **Section Titles**: `--accent` color
- **Value Icons**: Accent dot in circle, hover effect
- **Photo Card**: Gradient background, floating elements
- **CTA Card**: Surface background with border

## Tone Guidelines

### ✅ DO Use:
- Personal pronouns ("we", "our", "you")
- Conversational contractions ("we're", "it's")
- Specific details ("started in 2019", "scribbled on napkins")
- Honest language ("actually good", "as long as you'd like")
- Community focus ("neighbors", "this neighborhood")

### ❌ DON'T Use:
- Corporate speak ("solutions", "leverage", "synergy")
- Empty buzzwords ("world-class", "cutting-edge")
- Formal language ("we endeavor to", "it is our mission")
- Vague claims ("the best", "industry-leading")
- Sales pitch tone

## Accessibility

✅ Semantic section element with ID  
✅ Proper heading hierarchy (h2 → h3 → h4)  
✅ High contrast story text  
✅ Focus visible on CTA link  
✅ Descriptive alt text guidance for photo  
✅ Readable font sizes (16px minimum)  
✅ Adequate line height for readability  

## Responsive Behavior

### Mobile (< 1024px)
- Single column layout
- Story first, photo second
- Full-width photo card
- Reduced photo height (500px)

### Desktop (1024px+)
- Two columns side-by-side
- 60/40 split (story/photo)
- Taller photo card (600px)
- Optimal reading width for story

## Performance

- Lightweight hover state management
- CSS-only animations (floating elements)
- GPU-accelerated transforms
- No external dependencies
- Minimal re-renders

## Component Personality

This component embodies the café's brand voice:
- **Warm**: Welcoming and friendly
- **Local**: Neighborhood-focused
- **Authentic**: Honest and real
- **Personal**: Human, not corporate
- **Inclusive**: Everyone belongs

---

# Menu Component

## Overview
A comprehensive menu section with category tabs, client-side filtering, and a placeholder PDF download button. Displays menu items organized into 4 categories with full details.

## Features

### ✅ Category Tabs
- 5 tabs: **All**, **Coffee**, **Pastries**, **Brunch**, **Cold Drinks**
- Active state styling with accent color
- Inactive tabs with hover effects
- Responsive flex layout (wraps on mobile)

### ✅ Client-Side Filtering
- Instant category switching (no page reload)
- "All" shows all 21 menu items
- Other tabs filter to their specific category
- Item count displayed below grid
- Smooth transitions between filters

### ✅ Menu Items
**21 total items across 4 categories:**

**Coffee (5 items):**
- Espresso ($3.50)
- Cappuccino ($4.50)
- Flat White ($5.00)
- Signature Incany Latte ($5.50)
- Caramel Macchiato ($5.75)

**Pastries (4 items):**
- Honey Almond Croissant ($4.75)
- Chocolate Brownie ($3.50)
- Cinnamon Roll ($4.25)
- Blueberry Muffin ($3.75)

**Brunch (5 items):**
- Avocado Toast Supreme ($8.50)
- Classic Eggs Benedict ($10.50)
- Vegan Berry Bowl ($9.00)
- Breakfast Burrito ($9.50)
- French Toast Stack ($10.00)

**Cold Drinks (4 items):**
- Cold Brew Float ($6.50)
- Iced Latte ($5.00)
- Matcha Lemonade ($5.50)
- Fruit Smoothie ($6.00)

### ✅ Menu Item Cards
Each card includes:
- **Name**: Dish/drink name in heading font
- **Price**: Prominent accent-colored pricing (right-aligned)
- **Description**: Appetizing description of ingredients
- **Dietary Tags**: Green badges (Vegetarian, Vegan, Gluten-Free)
- **Hover Line**: Bottom accent line animates on hover

### ✅ PDF Download Button
- Prominently placed at top
- Download icon + "Download Full Menu (PDF)"
- Clearly marked with "(Placeholder)" label
- Alert notification when clicked
- Accent-colored with hover effect
- Ready to replace with actual PDF link

### ✅ Premium Styling
- Two-column grid layout (responsive to single column)
- Subtle borders with elevated surface background
- Hover effects: border color change, title color change
- Bottom line animation (scale from 0 to 100%)
- Consistent 6px padding on cards

### ✅ Additional Features
- **Item Counter**: Shows filtered count ("Showing X items in Category")
- **Dietary Info Card**: Notice about customization options
- **Section ID**: Properly linked to navbar (#menu)

## Usage

```tsx
import Menu from '@/components/Menu';

export default function Page() {
  return <Menu />;
}
```

## Customization

### Add/Edit Menu Items
```tsx
// In Menu.tsx, line ~17
const menuItems: MenuItem[] = [
  {
    name: 'Your Item Name',
    description: 'Detailed description of ingredients and preparation',
    price: '$X.XX',
    category: 'Coffee', // or 'Pastries', 'Brunch', 'Cold Drinks'
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'], // Optional
  },
];
```

### Add New Category
```tsx
// 1. Add to category list (line ~14)
const menuCategories = ['All', 'Coffee', 'Pastries', 'Brunch', 'Cold Drinks', 'Desserts'];

// 2. Add items with new category
{
  name: 'Chocolate Cake',
  description: 'Decadent triple-layer chocolate cake',
  price: '$6.50',
  category: 'Desserts',
}
```

### Connect Real PDF
```tsx
// Replace the handleDownloadMenu function (line ~94)
const handleDownloadMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.open('/path-to-your-menu.pdf', '_blank');
  // Or use a direct link in href instead of #
};
```

### Change Grid Layout
```tsx
// Modify grid columns (line ~122)
<div className="grid md:grid-cols-3 gap-6">
  {/* Changes from 2 to 3 columns */}
</div>
```

### Customize Dietary Tags
```tsx
// Add custom styling for different dietary types
{item.dietary?.map((tag) => (
  <span
    className={tag === 'Vegan' ? 'bg-green-600' : 'bg-success'}
    style={{
      backgroundColor: tag === 'Organic' ? 'var(--accent)' : 'var(--success)',
      color: 'var(--background)',
    }}
  >
    {tag}
  </span>
))}
```

## State Management

### Active Category
```tsx
const [activeCategory, setActiveCategory] = useState('All');
```
- Tracks currently selected category
- Updates on tab click
- Used to filter menu items

### Filtered Items
```tsx
const filteredItems = activeCategory === 'All' 
  ? menuItems 
  : menuItems.filter(item => item.category === activeCategory);
```
- Computed from activeCategory state
- Re-renders automatically when category changes

## Styling Details

- **Background**: `--surface` (light surface for contrast)
- **Cards**: `--surface-elevated` with `--border`
- **Active Tab**: Accent background with shadow
- **Inactive Tab**: Surface elevated with border
- **Price**: Accent color, right-aligned
- **Hover Effects**: Border → accent-muted, title → accent
- **Bottom Line**: Accent color, animates with scale-x

## Accessibility

✅ Semantic section element with ID  
✅ Proper heading hierarchy (h2 for section, h3 for items)  
✅ Button elements for tabs (not divs)  
✅ Focus visible states on all interactive elements  
✅ High contrast text and prices  
✅ Color-coded tags with text labels  
✅ Screen reader friendly filtering (item count)  
✅ Alert for placeholder download (user feedback)  

## Performance

- **Client-side filtering**: Instant, no API calls
- **Efficient re-renders**: Only filtered items update
- **CSS transitions**: Smooth, GPU-accelerated
- **No heavy animations**: Lightweight hover effects
- **Optimized state**: Single state variable for filtering

## Responsive Behavior

### Mobile (< 768px)
- Single column grid
- Tabs wrap to multiple rows
- Full-width cards
- Download button full width

### Tablet (768px - 1023px)
- Two-column grid maintained
- Tabs in single row (if space permits)
- Comfortable spacing

### Desktop (1024px+)
- Two-column grid (optimal for readability)
- All tabs in single row
- Maximum card width for content

## Future Enhancements

- Add item images (thumbnail in card)
- Search functionality across all items
- Sort options (price, name, popularity)
- Favorites/save items
- Allergen filtering
- Nutritional information modal
- Add to cart functionality
- Print-friendly version
- Connect to CMS for dynamic menu updates

---

# Gallery Component

## Overview
A lightweight, responsive masonry-style gallery with 8 image placeholders, smooth hover overlays, and captions. Pure CSS animations—no heavy libraries needed.

## Features

### ✅ Masonry-like Grid
- **Varied Heights**: short (h-48), medium (h-64), tall (h-80)
- **Responsive Columns**: 
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - XL: 4 columns
- **Natural Flow**: Items stack naturally with CSS Grid

### ✅ 8 Image Placeholders
Each with café-themed captions:
1. **Latte Art** (tall)
2. **Fresh Croissant** (medium)
3. **Cozy Interior** (short)
4. **Pour Over Perfection** (medium)
5. **Morning Pastries** (tall)
6. **Espresso Shot** (short)
7. **Community Vibes** (medium)
8. **Signature Drinks** (tall)

### ✅ Hover Overlay
- **Background**: Semi-transparent dark overlay with backdrop blur
- **Caption**: Large heading font, slides up on hover
- **View Icon**: Eye icon with "View" text
- **Bottom Line**: Accent line animates 0% → 100% width
- **Smooth Transitions**: All effects 300-700ms duration

### ✅ Visual Elements
- **Gradient Background**: Accent to surface gradient
- **Decorative Pattern**: Subtle dot pattern overlay
- **Animated Blurs**: Two floating blur circles that move on hover
- **Image Icon**: Camera icon that rotates and fades
- **Number Badge**: Small numbered badge in corner

### ✅ Performance Optimized
- **No External Libraries**: Pure React + CSS
- **CSS-only Animations**: GPU-accelerated transforms
- **Single State Variable**: Lightweight hover management
- **Efficient Re-renders**: Only hovered item updates

## Usage

```tsx
import Gallery from '@/components/Gallery';

export default function Page() {
  return <Gallery />;
}
```

## Customization

### Change Captions
```tsx
// In Gallery.tsx, line ~8
const galleryImages: GalleryImage[] = [
  { id: 1, caption: 'Your Caption', height: 'tall' },
  // ... more images
];
```

### Adjust Heights
```tsx
// In Gallery.tsx, line ~18
const heightClasses = {
  short: 'h-40',    // Shorter
  medium: 'h-56',   // Adjust as needed
  tall: 'h-72',     // Adjust as needed
};
```

### Add More Images
```tsx
// Simply add to the array
{ id: 9, caption: 'New Image', height: 'medium' },
{ id: 10, caption: 'Another One', height: 'short' },
```

### Replace with Real Images
```tsx
// Replace the placeholder content with:
<div className="relative h-[height] ...">
  <Image
    src="/gallery/image-1.jpg"
    alt={image.caption}
    fill
    className="object-cover"
  />
  
  {/* Keep the hover overlay */}
  <div className="absolute inset-0 bg-[var(--background)]/90 ...">
    <h3>{image.caption}</h3>
  </div>
</div>
```

### Change Grid Columns
```tsx
// In Gallery.tsx, line ~32
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Removes XL breakpoint, goes straight to 4 columns on lg */}
</div>
```

## Styling Details

- **Background**: `--surface` (light surface)
- **Placeholders**: Gradient from accent-muted to surface
- **Overlay**: Background/90 with backdrop blur
- **Caption**: Primary text color, heading font
- **View Icon**: Accent color
- **Number Badge**: Surface background with accent text
- **Border**: Subtle border, shadow on all cards

## Hover Animation Sequence

```
1. User hovers over image
   ↓
2. Card scales to 102%, shadow increases
   ↓
3. Image icon rotates 180° and fades
   ↓
4. Overlay fades in (opacity 0 → 1)
   ↓
5. Caption slides up (translateY: 20px → 0)
   ↓
6. View icon slides up with delay
   ↓
7. Bottom line animates (width: 0% → 100%)
   ↓
8. Blur circles move position
```

All animations are smooth with easing curves!

## Grid Layout Explained

```
Mobile (< 640px):
┌─────────────┐
│   Image 1   │
├─────────────┤
│   Image 2   │
├─────────────┤
│   Image 3   │
└─────────────┘

Tablet (640-1024px):
┌──────┬──────┐
│ Img1 │ Img2 │
├──────┼──────┤
│ Img3 │ Img4 │
└──────┴──────┘

Desktop (1024-1280px):
┌────┬────┬────┐
│ I1 │ I2 │ I3 │
├────┼────┼────┤
│ I4 │ I5 │ I6 │
└────┴────┴────┘

XL (1280px+):
┌───┬───┬───┬───┐
│I1 │I2 │I3 │I4 │
├───┼───┼───┼───┤
│I5 │I6 │I7 │I8 │
└───┴───┴───┴───┘
```

Heights vary within grid for masonry effect!

## Accessibility

✅ Semantic section element  
✅ Descriptive captions for each image  
✅ Keyboard accessible (div with cursor-pointer)  
✅ Hover states are visual-only (captions visible in alt text)  
✅ High contrast overlay text  
✅ Number badges for reference  
✅ Clear helper text for replacement  

## Performance Metrics

- **Component Size**: ~200 lines
- **State Variables**: 1 (hoveredImage)
- **Re-renders**: Minimal (only on hover)
- **Animation Type**: CSS transforms (GPU)
- **External Dependencies**: 0
- **Load Time**: Instant (no images to fetch)

## Responsive Behavior

### Mobile (< 640px)
- Single column
- Full width placeholders
- Touch-friendly spacing
- Maintain aspect ratios

### Tablet (640px - 1024px)
- Two columns
- Comfortable gaps
- Hover effects work (if supported)

### Desktop (1024px - 1280px)
- Three columns
- Optimal viewing
- Full hover interactions

### XL (1280px+)
- Four columns
- Maximum density
- Best for large screens

## Why No Heavy Libraries?

This gallery uses native web technologies:
- **CSS Grid**: Built-in, fast, responsive
- **CSS Transitions**: Smooth, performant
- **React useState**: Minimal state management
- **Inline Styles**: Dynamic hover effects
- **No Masonry.js**: CSS Grid handles layout
- **No Lightbox**: Keep it simple and fast

Result: **Fast, lightweight, maintainable!**

## Future Enhancements

- Add lightbox modal for full-size view
- Implement lazy loading for real images
- Add image upload/management
- Filter by category (food, drinks, interior)
- Add swipe gestures for mobile
- Implement infinite scroll
- Connect to image CDN
- Add Instagram integration
- Enable image sharing
- Add zoom functionality

---

# Location Component

## Overview
A comprehensive Location + Hours section with address block, opening hours table, embedded map placeholder, and action buttons. All data centralized in `src/data/cafe.ts` for easy editing.

## Features

### ✅ Centralized Data File
All café information stored in `src/data/cafe.ts`:
- **Address**: Street, city, state, zip, full formatted address
- **Contact**: Phone (display & raw for tel: links), email
- **Hours**: 7-day schedule with open/closed status
- **Location**: Lat/lng coordinates, Google Maps URL
- **Social**: Instagram, Facebook, Twitter handles (optional)

### ✅ Two-Column Layout
- **Left**: Address block, contact info, opening hours table, action buttons
- **Right**: Map placeholder with animated location pin
- **Responsive**: Stacks on mobile, side-by-side on desktop

### ✅ Address Block
- Large address display with location icon
- Phone number with icon
- Email address with icon
- Contained in premium card with border and shadow

### ✅ Opening Hours Table
- 7-day complete schedule
- "Today" indicator (auto-detects current day)
- Highlighted current day (accent background)
- Hover effects on each day
- Clock icon header
- Helper functions to get today's hours

### ✅ Embedded Map Placeholder
- Styled to look like a map
- Grid pattern (like streets)
- Diagonal lines (like roads)
- Animated location pin (bounces)
- Info card with café details
- Coordinates badge
- Click to open in Google Maps
- Hover overlay effect
- Helper text for replacement

### ✅ Action Buttons
- **"Open in Google Maps"**: Opens location in new tab
- **"Call Us"**: Triggers phone dialer (tel: link)
- Both buttons fully styled with icons
- Responsive layout (stack on mobile)

## Usage

```tsx
import Location from '@/components/Location';

export default function Page() {
  return <Location />;
}
```

## Data File Structure

```typescript
// src/data/cafe.ts
export const cafeInfo = {
  name: 'Café Incany',
  address: {
    street: '123 Coffee Street',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    full: '123 Coffee Street, Portland, OR 97201',
  },
  contact: {
    phone: '(503) 555-CAFE',
    phoneRaw: '+15035552233',
    email: 'hello@cafeincany.com',
  },
  hours: [
    { day: 'Monday', hours: '7:00 AM - 8:00 PM', isOpen: true },
    // ... more days
  ],
  location: {
    lat: 45.5152,
    lng: -122.6784,
    mapsUrl: 'https://www.google.com/maps/search/?...',
  },
};
```

## Customization

### Update Café Information
Edit `src/data/cafe.ts` - all changes automatically reflected:

```typescript
// Change address
address: {
  street: 'Your Street',
  city: 'Your City',
  state: 'ST',
  zip: '12345',
  full: 'Your full address',
}

// Change phone
contact: {
  phone: '(123) 456-7890',
  phoneRaw: '+11234567890', // For tel: links
}

// Update hours
hours: [
  { day: 'Monday', hours: '8:00 AM - 6:00 PM', isOpen: true },
  { day: 'Sunday', hours: 'Closed', isOpen: false },
]
```

### Replace Map Placeholder with Real Map

**Option 1: Google Maps Embed**
```tsx
// Replace the map placeholder div with:
<iframe
  width="100%"
  height="600"
  style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
  loading="lazy"
  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(cafeInfo.address.full)}`}
/>
```

**Option 2: Interactive Map Library**
```tsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer
  center={[cafeInfo.location.lat, cafeInfo.location.lng]}
  zoom={15}
  style={{ height: '600px', borderRadius: 'var(--radius-lg)' }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[cafeInfo.location.lat, cafeInfo.location.lng]} />
</MapContainer>
```

### Customize Button Actions
```tsx
// In Location.tsx
const handleOpenMaps = () => {
  // Custom action
  window.open(yourCustomUrl, '_blank');
};

const handleCall = () => {
  // Custom action
  window.location.href = `tel:${cafeInfo.contact.phoneRaw}`;
};
```

## Helper Functions

### Get Today's Hours
```typescript
import { getTodayHours } from '@/data/cafe';

const today = getTodayHours();
// Returns: { day: 'Monday', hours: '7:00 AM - 8:00 PM', isOpen: true }
```

### Check If Currently Open
```typescript
import { isCurrentlyOpen } from '@/data/cafe';

const open = isCurrentlyOpen();
// Returns: true or false
```

## Styling Details

- **Background**: `--background` (dark base)
- **Cards**: `--surface` with borders and shadows
- **Icons**: Accent-colored backgrounds
- **Today Highlight**: Accent background with border
- **Map**: Gradient with grid/diagonal patterns
- **Pin**: Accent-colored with bounce animation
- **Buttons**: Primary (accent) and secondary (outlined)

## Responsive Behavior

### Mobile (< 1024px)
- Single column layout
- Address and hours cards stack
- Map below content
- Buttons stack vertically

### Desktop (1024px+)
- Two-column layout
- Left: Info cards
- Right: Map (sticky position)
- Buttons side-by-side
- Map stays visible while scrolling

## Map Placeholder Features

- **Grid Pattern**: Simulates street grid
- **Diagonal Lines**: Represents roads
- **Floating Blurs**: Map marker suggestions
- **Animated Pin**: Bounces continuously
- **Info Card**: Semi-transparent with café details
- **Coordinates**: Small badge with lat/lng
- **Click to Open**: Full map in Google Maps
- **Hover Effect**: Accent overlay

## Accessibility

✅ Semantic section element with ID  
✅ Proper heading hierarchy  
✅ Icon + text for all buttons  
✅ Focus visible states  
✅ Click to dial functionality  
✅ External link handling (new tab)  
✅ Keyboard navigation  
✅ ARIA-friendly interactive elements  

## Performance

- Data imported once from single file
- Lightweight state management (1 state variable)
- No external API calls
- CSS-only animations
- Efficient re-renders (hover only)

## Integration with Other Components

This component works with:
- **Navbar**: Can link to `#location` anchor
- **Hero**: "Get Directions" CTA can scroll here
- **Contact**: Shows location for visitors

## Future Enhancements

- Add real-time "Open Now" indicator
- Integrate live Google Maps
- Add directions functionality
- Show distance from user
- Add parking information
- Display special holiday hours
- Integrate with reservations system
- Add transit directions
- Show nearby landmarks

---

# Contact Component

## Overview
A comprehensive contact section with clickable contact info cards, social media links, and a validated contact form with success toast notification.

## Features

### ✅ Two-Column Layout
- **Left**: Contact info cards (phone, email, socials)
- **Right**: Contact form
- **Responsive**: Stacks on mobile, side-by-side on desktop

### ✅ Contact Info Cards
Three premium cards with click-to-action:

1. **Phone Card**
   - Click-to-call functionality (`tel:` link)
   - Phone icon in accent container
   - "Click to call" helper text
   - Hover effects (border color, icon background)

2. **Email Card**
   - Opens email client (`mailto:` link)
   - Email icon in accent container
   - "Send us a message" helper text
   - Hover effects

3. **Social Media Card**
   - Instagram, Facebook, Twitter buttons
   - Icon-only buttons with hover states
   - Background changes to accent on hover
   - Opens in new tab

### ✅ Contact Form
Complete form with validation:
- **Name field**: Text input
- **Email field**: Email input with format validation
- **Message field**: Textarea (5 rows)
- **Submit button**: With loading state

### ✅ Form Validation
**Client-side validation rules**:
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format (regex)
- **Message**: Required, minimum 10 characters

**Features**:
- Real-time error clearing (on input)
- Error messages below fields in red
- Red border on invalid fields
- Prevents submission if invalid

### ✅ Success Toast Notification
- **Appearance**: Fixed bottom-right position
- **Style**: Green background with checkmark icon
- **Content**: "Message sent successfully!" + subtitle
- **Behavior**: Auto-dismisses after 5 seconds
- **Animation**: Slide-up entrance
- **Close**: Manual close button (X icon)
- **Z-index**: 50 (above content)

### ✅ Loading State
When submitting:
- Button shows spinner icon
- Text changes to "Sending..."
- Button disabled during submission
- Simulates 1s API call

## Usage

```tsx
import Contact from '@/components/Contact';

export default function Page() {
  return <Contact />;
}
```

## Form Behavior

```
1. User fills form
   ↓
2. User clicks "Send Message"
   ↓
3. Validation runs
   ↓
4. If invalid: Show errors, prevent submit
   ↓
5. If valid: Show loading state
   ↓
6. Simulate API call (1 second)
   ↓
7. Show success toast
   ↓
8. Clear form
   ↓
9. Toast auto-dismisses after 5 seconds
```

## Validation Examples

```typescript
// Name validation
if (!formData.name.trim()) {
  errors.name = 'Name is required';
} else if (formData.name.trim().length < 2) {
  errors.name = 'Name must be at least 2 characters';
}

// Email validation
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  errors.email = 'Please enter a valid email address';
}

// Message validation
if (formData.message.trim().length < 10) {
  errors.message = 'Message must be at least 10 characters';
}
```

## Customization

### Connect to Backend
```tsx
// Replace the simulated API call in handleSubmit
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }
  } catch (error) {
    // Handle error
  } finally {
    setIsSubmitting(false);
  }
};
```

### Customize Validation
```tsx
// In Contact.tsx, modify validateForm function
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};
  
  // Add your custom validation rules
  if (formData.name.length > 50) {
    newErrors.name = 'Name is too long';
  }
  
  // ... more rules
  
  return Object.keys(newErrors).length === 0;
};
```

### Change Toast Duration
```tsx
// In handleSubmit, change timeout
setTimeout(() => {
  setShowSuccess(false);
}, 8000); // 8 seconds instead of 5
```

### Add More Social Platforms
```tsx
// In Contact.tsx, add more social buttons
<a
  href={`https://linkedin.com/company/${cafeInfo.social.linkedin}`}
  className="..."
>
  <LinkedInIcon />
</a>
```

## Styling Details

- **Background**: `--surface` (light surface)
- **Form Card**: `--surface-elevated` with shadow
- **Contact Cards**: Surface elevated with borders
- **Success Toast**: `--success` (green)
- **Error Text**: `--error` (red)
- **Icons**: Accent-colored containers

## Accessibility

✅ Form labels for screen readers  
✅ Proper input types (text, email, textarea)  
✅ Focus visible states on all inputs  
✅ Error messages associated with fields  
✅ Submit button disabled state  
✅ ARIA labels on social links  
✅ Semantic HTML (form, address elements)  

## Performance

- Lightweight validation (regex)
- Efficient state management
- Debounced error clearing
- No external form libraries
- Fast re-renders

---

# Footer Component

## Overview
A comprehensive site footer with branding, address, hours, navigation links, social media, legal links, and back-to-top functionality.

## Features

### ✅ Four-Column Grid
Responsive layout with four main sections:
1. **About/Branding**: Logo, name, tagline
2. **Visit Us**: Full address and contact info
3. **Hours**: Summarized opening hours
4. **Connect**: Quick links and social media

### ✅ About/Branding Column
- Real café logo (`/logo.jpg`) with light background badge
- Optimized with Next.js Image component
- Short description/tagline
- Brand identity reinforcement

### ✅ Visit Us Column
- Full address from `cafe.ts`
- Phone number (click-to-call)
- Email address (mailto link)
- Semantic `<address>` element

### ✅ Hours Column
- Summarized weekly schedule
- Mon-Fri grouped
- Weekend hours separate
- Compact, easy-to-scan format

### ✅ Connect Column
- Quick navigation links (Home, About, Menu, Location, Contact)
- "Follow us" section
- Social media icon buttons
- Instagram, Facebook, Twitter

### ✅ Bottom Bar
Three sections:
1. **Copyright**: "© 2026 Café Incany. All rights reserved."
2. **Legal Links**: Privacy Policy, Terms of Service, Accessibility
3. **Back to Top**: Button with arrow icon, smooth scroll

## Usage

```tsx
import Footer from '@/components/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

## Data Integration

All information pulled from `src/data/cafe.ts`:
- Café name
- Full address
- Phone and email
- Social media handles
- Current year (auto-generated)

## Customization

### Update Legal Links
```tsx
// In Footer.tsx, modify legal links section
<a href="/privacy-policy" className="...">
  Privacy Policy
</a>
<a href="/terms" className="...">
  Terms of Service
</a>
```

### Add More Quick Links
```tsx
// In Footer.tsx, add to nav section
<a href="#reservations" className="...">
  Reservations
</a>
<a href="#careers" className="...">
  Careers
</a>
```

### Change Footer Columns
```tsx
// Modify grid classes
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
  {/* Adjust as needed */}
</div>
```

### Add Newsletter Signup
```tsx
// Add to Connect column
<div className="pt-4">
  <input
    type="email"
    placeholder="Your email"
    className="..."
  />
  <button>Subscribe</button>
</div>
```

## Styling Details

- **Background**: `--surface` (consistent with sections)
- **Border**: Top border for separation
- **Text**: Hierarchy with primary, secondary, and muted
- **Links**: Hover color transitions
- **Social Icons**: Background change on hover
- **Logo**: Matches navbar logo

## Responsive Behavior

### Mobile (< 768px)
- Single column
- All sections stacked
- Full-width content
- Bottom bar items stack

### Tablet (768px - 1024px)
- Two columns
- Reduced gaps
- Bottom bar maintains structure

### Desktop (1024px+)
- Four columns
- Optimal spacing
- All content visible
- Bottom bar three-section layout

## Accessibility

✅ Semantic `<footer>` element  
✅ Semantic `<address>` for contact info  
✅ Semantic `<nav>` for links  
✅ ARIA labels on social links  
✅ Focus visible on all interactive elements  
✅ Link purpose clear from text  
✅ Current year auto-generated  

## Performance

- Static content (fast render)
- No API calls
- Minimal state (none)
- Efficient re-renders
- Lightweight social icons (inline SVG)

## Integration

The Footer:
- Uses centralized data from `cafe.ts`
- Matches design system perfectly
- Complements all page sections
- Smooth scroll to top functionality
- Links to all major sections
