# Events Section Documentation

## ✅ Overview
A new **Events** section has been added to showcase upcoming and past events at Café In Cany.

---

## 📁 Files Created

### 1. **src/data/events.json**
Event data storage with two categories:
- **upcoming**: Events that are coming up
- **past**: Events that have already happened

#### Event Structure
```json
{
  "id": 1,
  "title": "Event Title",
  "date": "2026-03-15",
  "time": "21:00",
  "description": "Event description",
  "tag": "DJ Night" | "Theme Night" | "Discount",
  "featured": true | false
}
```

### 2. **src/components/Events.tsx**
Main Events component with:
- TypeScript types (`Event` interface)
- Two-tab system (Upcoming/Past)
- Event cards with all required information
- Featured badge for highlighted events
- "Add to calendar" placeholder button
- Consistent brown café styling

---

## 🎨 Features

### Two Tabs
- **Binnenkort** (Upcoming): Shows future events
- **Voorbij** (Past): Shows past events
- Client-side toggle with smooth transitions

### Event Cards Display
Each card shows:
- ✅ **Title**: Event name
- ✅ **Date**: Formatted in Dutch (e.g., "vr 15 mrt 2026")
- ✅ **Time**: Event start time (e.g., "21:00")
- ✅ **Description**: Short description of the event
- ✅ **Tag**: Color-coded category badge
  - 🎵 **DJ Night** - Accent color (gold)
  - 🎉 **Theme Night** - Success color (green)
  - 💰 **Discount** - Warning color (gold/yellow)
- ✅ **Featured Badge**: "Uitgelicht" for featured events

### Interactive Elements
- **Hover Effects**: Cards lift and change border color on hover
- **Add to Calendar**: Placeholder button (currently shows alert)
- **Empty State**: Message when no events are available
- **Bottom CTA**: Private event booking message

---

## 🔗 Integration

### Navigation
- Added to navbar as **"Events"** link
- Links to `#events` section
- Navbar links updated to Dutch:
  - Home → Home
  - About → Over Ons
  - Menu → Kaart
  - **Events** (NEW)
  - Contact → Contact

### Page Structure
Events section added to `page.tsx` between Menu and Gallery:
```
Hero → Highlights → Bestsellers → About → Menu → 
  → EVENTS (NEW) → Gallery → Location → Contact → Footer
```

---

## 🎯 Sample Events

### Upcoming (4 events)
1. **DJ Marc Draait de Classics** ⭐ Featured
   - DJ Night, March 15, 21:00
   
2. **Trivia Quiz Avond**
   - Theme Night, March 20, 20:00
   
3. **Happy Hour Weekend**
   - Discount, March 22-24, 17:00
   
4. **Live Muziek: De Kroegentijgers**
   - Theme Night, March 28, 20:30

### Past (3 events)
1. Carnaval Fuif (Feb 15)
2. Valentijn Special (Feb 14)
3. Nieuwjaarsborrel (Jan 6)

---

## ✏️ How to Update Events

### Adding a New Event
Edit `src/data/events.json`:

```json
{
  "upcoming": [
    {
      "id": 8,
      "title": "Nieuwe DJ Avond",
      "date": "2026-04-15",
      "time": "21:30",
      "description": "Beschrijving van het evenement",
      "tag": "DJ Night",
      "featured": false
    }
  ]
}
```

### Making an Event Featured
Set `"featured": true` for one upcoming event:
```json
{
  "id": 1,
  "title": "Special Event",
  "featured": true  // Only one should be featured
}
```

### Moving Events from Upcoming to Past
1. Cut the event from `upcoming` array
2. Paste into `past` array
3. Events are automatically sorted by date in the UI

### Event Tags
Choose from three predefined tags:
- `"DJ Night"` - For DJ events (gold badge)
- `"Theme Night"` - For themed parties (green badge)
- `"Discount"` - For special offers (yellow badge)

---

## 🎨 Styling

### Consistent Design
- Uses existing `Section` and `SectionHeader` components
- Matches brown café aesthetic
- Same color scheme as rest of site
- Hover effects consistent with other sections

### Color-Coded Tags
- **DJ Night**: `var(--accent)` - Gold/brown
- **Theme Night**: `var(--success)` - Green
- **Discount**: `var(--warning)` - Yellow/gold

### Responsive Layout
- **Desktop**: 2-column grid
- **Mobile**: Single column, stacked
- Cards have hover lift effect
- Bottom accent line animation

---

## 🔧 Future Enhancements

### Add to Calendar Functionality
Currently a placeholder button. To implement:

```typescript
const handleAddToCalendar = (event: Event) => {
  // Create .ics file or use Google Calendar API
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date}/${event.date}&details=${encodeURIComponent(event.description)}`;
  window.open(googleCalendarUrl, '_blank');
};
```

### Other Possible Enhancements
- Filter by tag type
- Search/filter events
- Event registration form
- Share event on social media
- Load events from CMS/API instead of JSON
- Add event images
- RSVP functionality

---

## 📊 Component Props & Types

### Event Interface
```typescript
export interface Event {
  id: number;
  title: string;
  date: string;        // Format: "YYYY-MM-DD"
  time: string;        // Format: "HH:MM"
  description: string;
  tag: 'DJ Night' | 'Theme Night' | 'Discount';
  featured: boolean;
}
```

### EventsData Interface
```typescript
interface EventsData {
  upcoming: Event[];
  past: Event[];
}
```

---

## ♿ Accessibility

- ✅ Semantic HTML structure
- ✅ Focus states on all interactive elements
- ✅ ARIA-hidden on decorative icons
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG standards
- ✅ Date formatted in user's locale (nl-BE)

---

## ✅ Checklist

- [x] Events section created
- [x] TypeScript types defined
- [x] events.json data file created
- [x] Two tabs (Upcoming/Past) implemented
- [x] Event cards with all required info
- [x] Featured badge implemented
- [x] Add to calendar button (placeholder)
- [x] Section has id="events"
- [x] Added to navbar
- [x] Consistent styling
- [x] Brown café vibe copy
- [x] Hover effects
- [x] Responsive design
- [x] Empty state handling
- [x] No linter errors

---

## 🎉 Result

The Events section is **fully functional** and ready to use! 

- Navigate to the Events section via navbar
- Toggle between Upcoming and Past events
- See featured event with special badge
- Hover over cards for interactive effects
- Click "Add to calendar" (shows alert placeholder)

**Your brown café now has a complete events showcase!** 🍺🎵
