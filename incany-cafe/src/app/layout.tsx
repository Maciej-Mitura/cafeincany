import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Café In Cany | Bruine Kroeg in Moorslede",
    template: "%s | Café In Cany",
  },
  description: "Bruine kroeg in het hart van Moorslede. Kom langs voor een pintje, gezellige sfeer en warme ontvangst aan de toog. Kerkstraat 3, 8890 Moorslede.",
  keywords: ["café", "bruine kroeg", "Moorslede", "café Moorslede", "bruine kroeg West-Vlaanderen", "pintje", "gezellige kroeg"],
  authors: [{ name: "Café In Cany" }],
  creator: "Café In Cany",
  publisher: "Café In Cany",
  metadataBase: new URL("https://incany.be"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://incany.be",
    siteName: "Café In Cany",
    title: "Café In Cany | Bruine Kroeg in Moorslede",
    description: "Bruine kroeg in het hart van Moorslede. Kom langs voor een pintje, gezellige sfeer en warme ontvangst aan de toog.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Café In Cany Moorslede",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café In Cany | Bruine Kroeg in Moorslede",
    description: "Bruine kroeg in het hart van Moorslede. Kom langs voor een pintje en gezellige sfeer.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "TODO_ADD_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
