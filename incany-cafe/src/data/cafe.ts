/**
 * Café Incany - Contact & Location Information
 *
 * Centralized data file for easy editing of café details
 */

export const cafeInfo = {
  name: "Café Incany",

  // Address Information
  address: {
    street: "Kerkstraat 3",
    city: "Moorslede",
    state: "West-Vlaanderen",
    zip: "8890",
    country: "Belgie",
    // Full formatted address for display
    full: "Kerkstraat 3, 8890 Moorslede, Belgium",
  },

  // Contact Information
  contact: {
    phone: "+32 499 76 77 73",
    phoneRaw: "+32 499 76 77 73", // For tel: links
    email: "info@incany.be",
  },

  // Opening Hours
  hours: [
    { day: "Maandag", hours: "Gesloten", isOpen: false },
    { day: "Dinsdag", hours: "Gesloten", isOpen: false },
    { day: "Woensdag", hours: "Gesloten", isOpen: false },
    { day: "Donderdag", hours: "18u00 - 22u00", isOpen: true },
    { day: "Vrijdag", hours: "18u00 - 00u00", isOpen: true },
    { day: "Zaterdag", hours: "12u00 - 02u00", isOpen: true },
    { day: "Zondag", hours: "14u00 - 20u00", isOpen: true },
  ],

  // Map & Location
  location: {
    // Coordinates for Kerkstraat 3, Moorslede, Belgium
    lat: 50.8879,
    lng: 3.0633,
    // Google Maps URL
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kerkstraat+3,+8890+Moorslede,+Belgium",
  },

  // Social Media (optional, for future use)
  social: {
    facebook: "Café-In-Cany-Moorslede-61587987261781/",
  },
};

// Helper function to get current day's hours
export const getTodayHours = () => {
  const dutchDays = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
  const today = dutchDays[new Date().getDay()];
  return cafeInfo.hours.find((h) => h.day === today);
};

// Helper function to check if currently open
export const isCurrentlyOpen = () => {
  const now = new Date();
  const dutchDays = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
  const today = dutchDays[now.getDay()];
  const todayHours = cafeInfo.hours.find((h) => h.day === today);

  if (!todayHours || !todayHours.isOpen) return false;

  // This is a simple check - you might want more sophisticated logic
  const currentHour = now.getHours();
  return currentHour >= 12 && currentHour < 23; // Simplified
};
