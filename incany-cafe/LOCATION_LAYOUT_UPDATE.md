# Location Component Layout Update

**Date:** June 24, 2026  
**Changes:** Layout rearrangement, Dutch translations, and "today" highlighting fix

---

## Summary of Changes

### 1. Layout Rearrangement (`src/components/Location.tsx`)

**Previous Layout:**
- Left Column: Address → Opening Hours → Action Buttons
- Right Column: Google Maps (full height, sticky)

**New Layout:**
- Left Column: Opening Hours only
- Right Column: Address → Google Maps → Action Buttons

**Changes Made:**
- Moved Opening Hours to the left column
- Moved Address and Google Maps to the right column
- Moved Action Buttons below the Google Maps (right column)
- Removed `sticky top-24` from maps container for better flow
- Reduced map height from `h-[600px]` to `h-[500px]` for better proportions

---

## 2. Fixed "Today" Highlighting

**Problem:** 
The `getTodayHours()` function was using English locale (`"en-US"`) which returns English day names (Monday, Tuesday, etc.), but the `cafeInfo.hours` array contains Dutch day names (Maandag, Dinsdag, etc.). This caused the today highlighting to never work.

**Solution:**
Updated `src/data/cafe.ts` to use a Dutch day name array:

```typescript
// Before (BROKEN)
export const getTodayHours = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }); // Returns "Monday", "Tuesday", etc.
  return cafeInfo.hours.find((h) => h.day === today); // Never matches "Maandag", "Dinsdag"
};

// After (FIXED)
export const getTodayHours = () => {
  const dutchDays = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
  const today = dutchDays[new Date().getDay()]; // Returns "Maandag", "Dinsdag", etc.
  return cafeInfo.hours.find((h) => h.day === today); // Now matches correctly!
};
```

**Result:**
- Today's day is now correctly highlighted with accent background and border
- "Vandaag" badge appears next to the current day
- Highlighting updates automatically each day

---

## 3. Updated Opening Hours to Match Footer

**Changes in `src/data/cafe.ts`:**

**Before:**
```typescript
hours: [
  { day: "Maandag", hours: "7:00 AM - 8:00 PM", isOpen: true },
  { day: "Dinsdag", hours: "7:00 AM - 8:00 PM", isOpen: true },
  { day: "Woensdag", hours: "7:00 AM - 8:00 PM", isOpen: true },
  { day: "Donderdag", hours: "7:00 AM - 8:00 PM", isOpen: true },
  { day: "Vrijdag", hours: "7:00 AM - 9:00 PM", isOpen: true },
  { day: "Zaterdag", hours: "8:00 AM - 9:00 PM", isOpen: true },
  { day: "Zondag", hours: "8:00 AM - 7:00 PM", isOpen: true },
]
```

**After (matches Footer):**
```typescript
hours: [
  { day: "Maandag", hours: "Gesloten", isOpen: false },
  { day: "Dinsdag", hours: "Gesloten", isOpen: false },
  { day: "Woensdag", hours: "Gesloten", isOpen: false },
  { day: "Donderdag", hours: "18u00 - 22u00", isOpen: true },
  { day: "Vrijdag", hours: "18u00 - 00u00", isOpen: true },
  { day: "Zaterdag", hours: "12u00 - 02u00", isOpen: true },
  { day: "Zondag", hours: "14u00 - 20u00", isOpen: true },
]
```

**Key Changes:**
- Monday-Wednesday now show "Gesloten" (Closed) with `isOpen: false`
- Hours now use Dutch 24-hour format: `18u00 - 22u00` instead of `7:00 AM - 8:00 PM`
- Hours now match exactly what was displayed in the Footer
- All 7 days are shown (including closed days) for clarity

---

## 4. Dutch Translations in Location Component

**Changes in `src/components/Location.tsx`:**

| Element | Before (English) | After (Dutch) |
|---------|------------------|---------------|
| Opening Hours title | "Opening Hours" | "Openingsuren" |
| Today label | "Today: {hours}" | "Vandaag: {hours}" |
| Today badge | "Today" | "Vandaag" |
| Address title | "Address" | "Adres" |

---

## 5. Updated Footer to Use Dynamic Hours

**Changes in `src/components/Footer.tsx`:**

**Before (Hardcoded):**
```tsx
<h3>Uren</h3>
<div>
  <div><span>Donderdag</span><span>18u00 - 22u00</span></div>
  <div><span>Vrijdag</span><span>18u00 - 00u00</span></div>
  <div><span>Zaterdag</span><span>12u00 - 02u00</span></div>
  <div><span>Zondag</span><span>14u00 - 20u00</span></div>
</div>
```

**After (Dynamic from cafe.ts):**
```tsx
<h3>Openingsuren</h3>
<div>
  {cafeInfo.hours
    .filter((schedule) => schedule.isOpen)
    .map((schedule) => (
      <div key={schedule.day}>
        <span>{schedule.day}</span>
        <span>{schedule.hours}</span>
      </div>
    ))}
</div>
```

**Benefits:**
- Single source of truth (`cafeInfo.hours` in `cafe.ts`)
- Automatically filters out closed days (`isOpen: false`)
- Easier to maintain (change hours in one place, updates everywhere)

---

## 6. Fixed StructuredData Component

**Problem:** 
The `StructuredData.tsx` component referenced `cafeInfo.social.instagram` and `cafeInfo.social.twitter`, but the `cafe.ts` file only has `facebook` in the social object.

**Solution:**
Updated `src/components/StructuredData.tsx` to only include Facebook:

```typescript
sameAs: [
  `https://facebook.com/${cafeInfo.social.facebook}`,
],
```

---

## Visual Changes

### Desktop Layout
```
┌─────────────────────────────────────┬─────────────────────────────────────┐
│ Opening Hours                       │ Address                             │
│ ┌─────────────────────────────────┐ │ ┌─────────────────────────────────┐ │
│ │ 🕐 Openingsuren                 │ │ │ 📍 Adres                        │ │
│ │ Vandaag: 18u00 - 22u00          │ │ │ Kerkstraat 3                    │ │
│ │                                 │ │ │ Moorslede, West-Vlaanderen 8890 │ │
│ │ Maandag      Gesloten           │ │ │                                 │ │
│ │ Dinsdag      Gesloten           │ │ │ 📞 +32 499 76 77 73            │ │
│ │ Woensdag     Gesloten           │ │ │ 📧 info@incany.be              │ │
│ │ Donderdag ✨ 18u00 - 22u00      │ │ └─────────────────────────────────┘ │
│ │ Vrijdag      18u00 - 00u00      │ │                                     │
│ │ Zaterdag     12u00 - 02u00      │ │ Google Maps                         │
│ │ Zondag       14u00 - 20u00      │ │ ┌─────────────────────────────────┐ │
│ └─────────────────────────────────┘ │ │ [Google Maps iframe or consent  │ │
│                                     │ │  placeholder]                   │ │
│                                     │ └─────────────────────────────────┘ │
│                                     │                                     │
│                                     │ [Open in Google Maps] [Bel Ons]    │
└─────────────────────────────────────┴─────────────────────────────────────┘

✨ = Today's day is highlighted with accent background and "Vandaag" badge
```

### Mobile Layout
```
┌─────────────────────────────┐
│ Opening Hours               │
│ ┌─────────────────────────┐ │
│ │ 🕐 Openingsuren         │ │
│ │ ...                     │ │
│ └─────────────────────────┘ │
│                             │
│ Address                     │
│ ┌─────────────────────────┐ │
│ │ 📍 Adres                │ │
│ │ ...                     │ │
│ └─────────────────────────┘ │
│                             │
│ Google Maps                 │
│ ┌─────────────────────────┐ │
│ │ [Map or placeholder]    │ │
│ └─────────────────────────┘ │
│                             │
│ [Open in Google Maps]       │
│ [Bel Ons]                   │
└─────────────────────────────┘
```

---

## Files Changed

1. **`src/components/Location.tsx`**
   - Rearranged layout (Opening Hours left, Address + Maps right)
   - Translated titles to Dutch (Openingsuren, Adres, Vandaag)
   - Reduced map height for better proportions
   - Removed sticky positioning from map
   - Moved action buttons below map

2. **`src/data/cafe.ts`**
   - Updated hours to match Footer (Thursday-Sunday only, closed Mon-Wed)
   - Changed hours format to Dutch 24-hour (e.g., "18u00 - 22u00")
   - Fixed `getTodayHours()` to use Dutch day names
   - Fixed `isCurrentlyOpen()` to use Dutch day names

3. **`src/components/Footer.tsx`**
   - Changed "Uren" to "Openingsuren"
   - Made hours dynamic (reads from `cafeInfo.hours`)
   - Filters to show only open days

4. **`src/components/StructuredData.tsx`**
   - Removed instagram and twitter from `sameAs` array
   - Now only includes Facebook link

---

## Testing Checklist

- [x] Build succeeds (`npm run build`)
- [x] TypeScript compilation passes
- [x] Layout correct: Opening Hours left, Address + Maps right
- [x] Today highlighting works (checks current day)
- [x] All text in Dutch (Openingsuren, Adres, Vandaag)
- [x] Hours match between Location component and Footer
- [x] Footer dynamically loads hours from `cafe.ts`
- [x] Closed days show "Gesloten"
- [x] Open days show Dutch time format (18u00 - 22u00)

---

## User Experience Improvements

1. **Today Highlighting Now Works:**
   - Current day has accent-colored background and border
   - "Vandaag" badge clearly marks today's hours
   - Makes it immediately obvious what today's hours are

2. **Consistent Hours Everywhere:**
   - Location component and Footer now show identical hours
   - Single source of truth in `cafe.ts`
   - Easier to update (change once, updates everywhere)

3. **Better Layout Flow:**
   - Opening hours get more vertical space (entire left column)
   - Address and map logically grouped on right
   - Action buttons positioned where users naturally look after viewing map

4. **Fully Dutch:**
   - All labels translated (Openingsuren, Adres, Vandaag)
   - Hours in Dutch format (18u00 instead of 6:00 PM)
   - Consistent with the rest of the café's branding

---

## Maintenance Notes

To update opening hours in the future:

1. Edit `src/data/cafe.ts` → `cafeInfo.hours` array
2. Both Location component and Footer will automatically update
3. Use Dutch day names: Maandag, Dinsdag, Woensdag, Donderdag, Vrijdag, Zaterdag, Zondag
4. Use Dutch time format: `18u00 - 22u00` (not `6:00 PM - 10:00 PM`)
5. Set `isOpen: false` for closed days and hours to "Gesloten"

Example:
```typescript
{ day: "Maandag", hours: "Gesloten", isOpen: false },
{ day: "Donderdag", hours: "18u00 - 22u00", isOpen: true },
```

---

**Implementation complete!** ✅
