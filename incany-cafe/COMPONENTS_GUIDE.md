# Component Usage Guide

## Quick Start

Your café website now has ten polished, production-ready components:

### 1. **Navbar** - Fixed navigation with active section detection
### 2. **Hero** - Engaging landing section with CTAs and features
### 3. **Highlights** - Three-card feature showcase with premium styling
### 4. **Bestsellers** - Menu grid with dietary tags and pricing
### 5. **About** - Personal story with values and photo placeholder
### 6. **Menu** - Full menu with category tabs and filtering
### 7. **Gallery** - Masonry-style grid with hover overlays
### 8. **Location** - Address, hours, map, and action buttons
### 9. **Contact** - Contact form with validation and success toast
### 10. **Footer** - Complete footer with links, hours, and legal text

---

## Implementation Example

```tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Bestsellers from '@/components/Bestsellers';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        <div id="home">
          <Hero />
        </div>
        
        <Highlights />
        
        <Bestsellers />
        
        <About />
        
        <Menu />
        
        <Gallery />
        
        <Location />
        
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
```

---

## Hero Section Features

### 📱 **Fully Responsive**
- Desktop: Two-column layout
- Mobile: Stacked, content-first
- Smooth transitions between breakpoints

### 🎨 **Left Column**
✓ Large headline with accent highlight  
✓ Subheading for context  
✓ Two CTAs (View Menu, Get Directions)  
✓ Three feature badges with icons  

### 🖼️ **Right Column**
✓ Animated image placeholder  
✓ Gradient overlay  
✓ Floating blur effects  
✓ Interactive hover states  

### ✨ **Motion & Polish**
✓ Fade-in entrance animation  
✓ SVG line drawing effect  
✓ CTA hover effects (scale, icon slide)  
✓ Badge lift on hover  
✓ Floating background elements  
✓ Scroll indicator at bottom  

---

## Highlights Section Features

### 🎯 **Three Premium Cards**
✓ Icon + Title + Description format  
✓ Responsive grid (stacks on mobile)  
✓ Subtle borders and shadows  
✓ Hover effects (lift + shadow increase)  

### ✨ **Sample Content**
- **Artisan Roasted**: Coffee quality focus
- **Sustainability First**: Eco-friendly practices
- **Community Hub**: Social gathering space

### 💎 **Premium Feel**
✓ Elevated surface background  
✓ Icon containers with accent colors  
✓ Smooth 300ms transitions  
✓ Title color changes on hover  

---

## Bestsellers Section Features

### 🍽️ **Menu Item Grid**
✓ 6 sample items (coffee, food, bowls)  
✓ Responsive: 1→2→3 columns  
✓ Name, description, price, dietary tags  
✓ Optional "New" badge for items  

### 🏷️ **Dietary Tags**
- **Green**: Vegetarian, Vegan, Gluten-Free
- **Gold**: Allergen warnings
- **Brown**: Availability notes

### 💫 **Interactive Cards**
✓ Hover lift effect (4px)  
✓ Border color transition  
✓ Bottom accent line animation  
✓ Price prominently displayed  
✓ "View Full Menu" CTA button  

### 📋 **Sample Menu Items**
1. Signature Incany Latte ($5.50)
2. Honey Almond Croissant ($4.75)
3. Cold Brew Float ($6.50) - NEW
4. Avocado Toast Supreme ($8.50)
5. Vegan Berry Bowl ($9.00)
6. Caramel Macchiato ($5.75)

---

## About Section Features

### 📖 **Personal Origin Story**
✓ 3-6 lines of warm narrative  
✓ Conversational tone (contractions, personal pronouns)  
✓ Specific details ("started in 2019", "napkins")  
✓ Community-focused messaging  
✓ Zero corporate jargon  

### 💎 **What We Care About (3 Values)**
1. **Real Conversations**: Community over transactions
2. **The Good Stuff**: Ethical sourcing, house-made quality
3. **Our Community**: Local support, inclusivity

Each value includes:
- Bold, conversational title
- Honest description (plain language)
- Dot icon with hover effect
- Title color transitions to accent

### 🖼️ **Photo Placeholder Card**
✓ Large visual container (500-600px)  
✓ Gradient background with floating blur circles  
✓ Coffee cup icon (rotates on hover)  
✓ Helper text for easy replacement  
✓ Scale animation on hover  
✓ Decorative corner elements  

### 🎯 **Tone Guidelines**
✓ **Use**: "we", "you", contractions, specifics  
✓ **Avoid**: Corporate speak, buzzwords, formality  
✓ **Feel**: Neighborhood café, not chain  

### 🔗 **Bottom CTA**
✓ "Want to know more?"  
✓ Links to contact section  
✓ Contained in subtle card  

---

## Menu Section Features

### 📋 **Category Tabs**
✓ 5 tabs: All, Coffee, Pastries, Brunch, Cold Drinks  
✓ Active state with accent background  
✓ Instant client-side filtering  
✓ Responsive wrap layout  

### 🍽️ **21 Menu Items**
- **Coffee**: 5 items (Espresso to Caramel Macchiato)
- **Pastries**: 4 items (Croissants to Muffins)
- **Brunch**: 5 items (Avocado Toast to French Toast)
- **Cold Drinks**: 4 items (Cold Brew Float to Smoothies)

### 📄 **PDF Download**
✓ Prominent download button  
✓ Clearly marked as "(Placeholder)"  
✓ Alert notification on click  
✓ Ready to connect real PDF  

### 🎨 **Menu Card Design**
✓ Name, description, price per item  
✓ Dietary tags (Vegetarian, Vegan, GF)  
✓ Hover effects (border, title color)  
✓ Bottom accent line animation  
✓ Two-column responsive grid  

### 📊 **Smart Features**
✓ Item counter ("Showing X items")  
✓ Dietary customization notice  
✓ Section ID for navbar linking  

---

## Gallery Section Features

### 🖼️ **Masonry-Style Grid**
✓ 8 image placeholders with varied heights  
✓ Responsive: 1 → 2 → 3 → 4 columns  
✓ CSS Grid layout (no library needed)  
✓ Natural stacking flow  

### 🎨 **Image Placeholders**
Each placeholder includes:
- Gradient background
- Animated floating blur circles
- Decorative dot pattern
- Camera icon (rotates on hover)
- Numbered badge

### 💫 **Hover Overlays**
✓ Semi-transparent dark overlay  
✓ Caption slides up smoothly  
✓ View icon appears with delay  
✓ Bottom accent line animates  
✓ Card scales to 102%  
✓ Blur circles move position  

### 🏷️ **Captions**
1. Latte Art
2. Fresh Croissant
3. Cozy Interior
4. Pour Over Perfection
5. Morning Pastries
6. Espresso Shot
7. Community Vibes
8. Signature Drinks

### ⚡ **Performance**
✓ No external libraries  
✓ Pure CSS animations  
✓ GPU-accelerated transforms  
✓ Single state variable  
✓ Instant loading  

---

## Location Section Features

### 📍 **Centralized Data File**
✓ All café info in `src/data/cafe.ts`  
✓ Address, phone, email, hours, location  
✓ Easy to edit in one place  
✓ Helper functions included  

### 🏢 **Address Block**
✓ Full address with icon  
✓ Phone number (click to call)  
✓ Email address  
✓ Premium card design  

### 🕐 **Opening Hours Table**
✓ Complete 7-day schedule  
✓ Auto-detects current day  
✓ "Today" badge and highlight  
✓ Hover effects on each day  
✓ Clock icon header  

### 🗺️ **Map Placeholder**
✓ Styled like a real map  
✓ Grid + diagonal patterns  
✓ Animated bouncing location pin  
✓ Info card with café details  
✓ Coordinates badge  
✓ Click to open Google Maps  
✓ Sticky on desktop scroll  

### 🔘 **Action Buttons**
1. **"Open in Google Maps"**: New tab with location
2. **"Call Us"**: Triggers phone dialer

Both buttons include:
- Icons for clarity
- Responsive stacking
- Hover effects
- Focus states

---

## Contact Section Features

### 📞 **Contact Info Cards**
✓ Phone card (click-to-call)  
✓ Email card (mailto link)  
✓ Social media card (Instagram, Facebook, Twitter)  
✓ Hover effects on all cards  
✓ Icons with accent colors  

### 📝 **Contact Form**
✓ Three fields: Name, Email, Message  
✓ Real-time validation  
✓ Error messages below fields  
✓ Loading state on submit  
✓ Form clears on success  

**Validation Rules**:
- Name: Required, min 2 characters
- Email: Required, valid email format
- Message: Required, min 10 characters
- Errors clear when typing

### ✅ **Success Toast**
✓ Green success notification  
✓ Appears bottom-right  
✓ Auto-dismisses after 5 seconds  
✓ Manual close button  
✓ Slide-up animation  
✓ Fixed position (z-50)  

### 🎨 **Design**
✓ Two-column layout  
✓ Premium card styling  
✓ Consistent with design system  
✓ No backend required  

---

## Footer Features

### 📐 **Four-Column Grid**
✓ Responsive layout (4 → 1 columns)  
✓ About/branding section  
✓ Address section  
✓ Hours summary  
✓ Connect/links section  

### 📍 **Footer Sections**
1. **About**: Logo, name, tagline
2. **Visit Us**: Address, phone, email from `cafe.ts`
3. **Hours**: Summarized weekly schedule
4. **Connect**: Quick links + social media icons

### 🔗 **Bottom Bar**
✓ Copyright with current year  
✓ Legal links (Privacy, Terms, Accessibility)  
✓ Back to top button (smooth scroll)  
✓ All links functional  

### 🎨 **Styling**
✓ Surface background with top border  
✓ Social icons change color on hover  
✓ Links have hover transitions  
✓ Consistent spacing  
✓ Uses data from `cafe.ts`  

---

## Customization Quick Tips

### Change Hero Headline
```tsx
// In Hero.tsx, line ~30
<h1 className="...">
  Your New{' '}
  <span className="text-[var(--accent)]">
    Headline
  </span>
</h1>
```

### Update Feature Badges
```tsx
// In Hero.tsx, line ~13
const features: FeatureBadge[] = [
  { icon: '🎵', text: 'Live Music' },
  { icon: '🌱', text: 'Organic' },
  { icon: '🍰', text: 'Homemade' },
];
```

### Change CTA Actions
```tsx
// In Hero.tsx, customize these functions:
const handleViewMenu = () => {
  // Your action
};

const handleGetDirections = () => {
  // Your action
};
```

### Replace Image Placeholder
```tsx
// In Hero.tsx, line ~145, replace the entire placeholder div with:
<div className="relative w-full h-full rounded-[var(--radius-lg)] overflow-hidden">
  <Image
    src="/your-cafe-image.jpg"
    alt="Cafe interior"
    fill
    className="object-cover"
  />
  {/* Keep gradient overlay if desired */}
  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
</div>
```

### Update Google Maps Address
```tsx
// In Hero.tsx, line ~22
const address = encodeURIComponent('Your actual address here');
```

### Add New Navbar Links
```tsx
// In Navbar.tsx, line ~13
const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' }, // New link
  { name: 'Contact', href: '#contact' },
];
```

### Update Highlights Content
```tsx
// In Highlights.tsx, line ~8
const highlights: Highlight[] = [
  {
    icon: <YourCustomSVG />,
    title: 'Your Feature Title',
    description: 'A compelling one-sentence description.',
  },
];
```

### Modify Bestsellers Menu
```tsx
// In Bestsellers.tsx, line ~18
const menuItems: MenuItem[] = [
  {
    name: 'Your Menu Item',
    description: 'Mouth-watering description',
    price: '$X.XX',
    tags: [
      { label: 'Vegan', color: 'success' },
      { label: 'Organic', color: 'accent' },
    ],
    isNew: true, // Shows "New" badge
  },
];
```

### Change Number of Bestseller Items
```tsx
// In Bestsellers.tsx, modify grid
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Changes from 3 to 4 columns */}
</div>
```

### Add Menu Items
```tsx
// In Menu.tsx, line ~17
const menuItems: MenuItem[] = [
  {
    name: 'New Item',
    description: 'Delicious description',
    price: '$X.XX',
    category: 'Coffee', // or Pastries, Brunch, Cold Drinks
    dietary: ['Vegetarian'], // Optional
  },
];
```

### Connect Real PDF Menu
```tsx
// In Menu.tsx, line ~94
const handleDownloadMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.open('/menu.pdf', '_blank');
};

// Or simply change href from # to /menu.pdf
<a href="/menu.pdf" download="cafe-incany-menu.pdf">
```

### Add New Menu Category
```tsx
// 1. Add to categories array
const menuCategories = ['All', 'Coffee', 'Pastries', 'Brunch', 'Cold Drinks', 'Desserts'];

// 2. Add items with new category
{ name: 'Item', category: 'Desserts', ... }
```

### Update About Story
```tsx
// In About.tsx, line ~29
<p>
  Your café's unique origin story...
</p>
<p>
  Continue the narrative with personal details...
</p>
```

### Modify Core Values
```tsx
// In About.tsx, line ~8
const careAboutItems = [
  {
    title: 'Your Value',
    description: 'Honest, conversational explanation.',
  },
];
```

### Replace Photo Placeholder
```tsx
// In About.tsx, replace placeholder with:
<Image
  src="/about-photo.jpg"
  alt="Café interior"
  fill
  className="object-cover"
/>
```

### Update Gallery Captions
```tsx
// In Gallery.tsx, line ~8
const galleryImages: GalleryImage[] = [
  { id: 1, caption: 'Your Caption', height: 'tall' },
  // Modify captions and heights as needed
];
```

### Replace Gallery Placeholders
```tsx
// In Gallery.tsx, replace gradient div with:
<Image
  src="/gallery/image-1.jpg"
  alt={image.caption}
  fill
  className="object-cover"
/>
```

### Change Grid Columns
```tsx
// In Gallery.tsx, line ~32
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Adjust breakpoints as needed */}
</div>
```

### Connect Contact Form to Backend
```tsx
// In Contact.tsx, replace simulated API call
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

### Customize Form Validation
```tsx
// In Contact.tsx, modify validateForm function
const validateForm = (): boolean => {
  // Add your custom validation rules
  if (formData.message.length > 500) {
    newErrors.message = 'Message is too long';
  }
  return Object.keys(newErrors).length === 0;
};
```

### Add Footer Legal Pages
```tsx
// In Footer.tsx, update legal links
<a href="/privacy-policy" className="...">
  Privacy Policy
</a>
<a href="/terms-of-service" className="...">
  Terms of Service
</a>
```

### Update Café Information
```tsx
// In src/data/cafe.ts - edit any field
export const cafeInfo = {
  address: {
    street: 'Your Street',
    city: 'Your City',
    state: 'ST',
    zip: '12345',
  },
  contact: {
    phone: '(123) 456-7890',
    phoneRaw: '+11234567890',
    email: 'your@email.com',
  },
  hours: [
    { day: 'Monday', hours: '8:00 AM - 6:00 PM', isOpen: true },
    // ... update all days
  ],
};
```

### Replace Map Placeholder
```tsx
// In Location.tsx, replace map div with:
<iframe
  width="100%"
  height="600"
  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(cafeInfo.address.full)}`}
  style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
/>
```

---

## Animation Details

### Entrance Animations
- **fade-in-up**: Content slides up and fades in (1s)
- **draw-line**: SVG underline draws from left to right (1.5s)

### Hover Animations
- **CTA primary**: Scales to 105%, background slides
- **CTA secondary**: Border color changes, icon rotates
- **Feature badges**: Lift 2px, shadow appears
- **Image placeholder**: Scales to 102%

### Background Animations
- **Float**: Circular blur elements move slowly (6-8s cycles)
- **Pulse**: Decorative elements gently pulse (4s)
- **Bounce**: Scroll indicator bounces continuously

All animations use `ease-in-out` for smooth, natural motion.

---

## Design System Integration

Both components use your café design system:

### Colors
- `--background`: #1a1512 (dark brown)
- `--surface`: #251e1a (card backgrounds)
- `--accent`: #d4a574 (warm gold)
- `--text`: #f5f1ed (light cream)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Effects
- **Borders**: Subtle, rounded corners
- **Shadows**: Soft, layered
- **Hover**: Smooth color transitions

---

## Accessibility Checklist

✅ Semantic HTML elements  
✅ Keyboard navigation support  
✅ Visible focus indicators  
✅ ARIA labels where needed  
✅ High contrast text (WCAG AA)  
✅ Proper heading hierarchy  
✅ Smooth, non-jarring animations  

---

## Performance

- **CSS animations** (no JavaScript loops)
- **Lightweight** (no heavy dependencies)
- **GPU-accelerated** transforms
- **Optimized** for 60fps animations

---

## Next Steps

1. **Run dev server**: `npm run dev`
2. **View at**: `http://localhost:3000`
3. **Test mobile**: Use browser dev tools responsive mode
4. **Customize**: Update text, colors, images as needed
5. **Add sections**: Build out About, Menu, Info, Contact sections

---

## File Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Hero.tsx            # Hero section component
│   ├── Highlights.tsx      # Three-card feature section
│   ├── Bestsellers.tsx     # Menu items grid with tags
│   ├── About.tsx           # Story, values, photo placeholder
│   ├── Menu.tsx            # Full menu with category tabs
│   ├── Gallery.tsx         # Masonry grid with hover overlays
│   ├── Location.tsx        # Address, hours, map, buttons
│   ├── Contact.tsx         # Contact form with validation
│   ├── Footer.tsx          # Site footer with links
│   └── README.md           # Detailed component docs
├── data/
│   └── cafe.ts             # Centralized café information
├── app/
│   ├── page.tsx            # Home page (uses all components)
│   ├── globals.css         # Design system + animations
│   └── layout.tsx          # Root layout with fonts
├── DESIGN_SYSTEM.md        # Design tokens reference
├── COMPONENTS_GUIDE.md     # This file
└── COMPONENT_SUMMARY.md    # Overview of all components
```

---

## Support

For detailed documentation on each component, see:
- `src/components/README.md` - Component API reference
- `DESIGN_SYSTEM.md` - Design tokens and usage

---

**🎉 Your café website is ready to customize and deploy!**
