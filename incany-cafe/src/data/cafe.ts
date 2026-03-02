/**
 * Café Incany - Contact & Location Information
 * 
 * Centralized data file for easy editing of café details
 */

export const cafeInfo = {
  name: 'Café Incany',
  
  // Address Information
  address: {
    street: 'Kerkstraat 3',
    city: 'Moorslede',
    state: 'West-Vlaanderen',
    zip: '8890',
    country: 'Belgium',
    // Full formatted address for display
    full: 'Kerkstraat 3, 8890 Moorslede, Belgium',
  },

  // Contact Information
  contact: {
    phone: '+32 0000000000',
    phoneRaw: '+320000000000', // For tel: links
    email: 'info@incany.be',
  },

  // Opening Hours
  hours: [
    { day: 'Monday', hours: '7:00 AM - 8:00 PM', isOpen: true },
    { day: 'Tuesday', hours: '7:00 AM - 8:00 PM', isOpen: true },
    { day: 'Wednesday', hours: '7:00 AM - 8:00 PM', isOpen: true },
    { day: 'Thursday', hours: '7:00 AM - 8:00 PM', isOpen: true },
    { day: 'Friday', hours: '7:00 AM - 9:00 PM', isOpen: true },
    { day: 'Saturday', hours: '8:00 AM - 9:00 PM', isOpen: true },
    { day: 'Sunday', hours: '8:00 AM - 7:00 PM', isOpen: true },
  ],

  // Map & Location
  location: {
    // Coordinates for Kerkstraat 3, Moorslede, Belgium
    lat: 50.8879,
    lng: 3.0633,
    // Google Maps URL
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kerkstraat+3,+8890+Moorslede,+Belgium',
  },

  // Social Media (optional, for future use)
  social: {
    instagram: '@cafeincany',
    facebook: 'cafeincany',
    twitter: '@cafeincany',
  },
};

// Helper function to get current day's hours
export const getTodayHours = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return cafeInfo.hours.find(h => h.day === today);
};

// Helper function to check if currently open
export const isCurrentlyOpen = () => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const todayHours = cafeInfo.hours.find(h => h.day === currentDay);
  
  if (!todayHours || !todayHours.isOpen) return false;
  
  // This is a simple check - you might want more sophisticated logic
  const currentHour = now.getHours();
  return currentHour >= 7 && currentHour < 21; // Simplified
};
