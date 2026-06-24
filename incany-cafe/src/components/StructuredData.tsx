import { cafeInfo } from "@/data/cafe";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: cafeInfo.name,
    description: "Bruine kroeg in het hart van Moorslede. Gezellige sfeer, warme ontvangst aan de toog.",
    url: "https://incany.be",
    telephone: cafeInfo.contact.phone,
    email: cafeInfo.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: cafeInfo.address.street,
      addressLocality: cafeInfo.address.city,
      addressRegion: cafeInfo.address.state,
      postalCode: cafeInfo.address.zip,
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cafeInfo.location.lat,
      longitude: cafeInfo.location.lng,
    },
    openingHoursSpecification: cafeInfo.hours.map((schedule) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: schedule.day,
      opens: schedule.hours.split(" - ")[0]?.replace(" AM", "").replace(" PM", "") || "07:00",
      closes: schedule.hours.split(" - ")[1]?.replace(" PM", "").replace(" AM", "") || "20:00",
    })),
    priceRange: "€€",
    servesCuisine: "Belgian",
    acceptsReservations: "False",
    sameAs: [
      `https://facebook.com/${cafeInfo.social.facebook}`,
    ],
    // TODO: Add when available:
    // - logo: URL to café logo image
    // - image: Array of high-quality images of the café interior/exterior
    // - menu: URL to menu page (if separate page is created)
    // - hasMap: URL to Google Maps
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
