import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactButtons from "@/components/StickyContactButtons";
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

const siteUrl = "https://www.aryasamajamumettuguda.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arya Samaj Marriage Hyderabad | Verified Same-Day Vedic Weddings",
    template: "%s | Arya Samaj Hyderabad",
  },
  description:
    "Official portal for Arya Samaj Marriage Services in Hyderabad (Mettuguda & Nagaram branches). Traditional Vedic rituals and legally valid certificates under the Arya Samaj Validation Act, 1937.",
  keywords:
    "Arya Samaj Marriage Hyderabad, Love Marriage Hyderabad, Same Day Marriage, Arya Samaj Mettuguda, Arya Samaj Nagaram, Inter Caste Marriage Hyderabad, Vedic Wedding Hyderabad",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/`,
    siteName: "Arya Samaj Hyderabad",
    title: "Arya Samaj Marriage Hyderabad | Verified Same-Day Vedic Weddings",
    description:
      "Official portal for Arya Samaj Marriage Services in Hyderabad. Traditional Vedic rituals and legally valid certificates.",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: "Arya Samaj Hyderabad Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aryasamajhyd",
    creator: "@aryasamajhyd",
    title: "Arya Samaj Marriage Hyderabad | Verified Same-Day Vedic Weddings",
    description:
      "Official portal for Arya Samaj Marriage Services in Hyderabad. Traditional Vedic rituals and legally valid certificates.",
    images: [`${siteUrl}/logo.png`],
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
  manifest: "/site.webmanifest",
};

// JSON-LD Structured Data — LocalBusiness with two branch locations
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Arya Samaj Mettuguda & Nagaram",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  telephone: "+91 8099333754",
  description:
    "Official Arya Samaj marriage services in Hyderabad. Vedic weddings, love marriages, inter-caste marriages with legally valid certificates.",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "17:00",
  },
  location: [
    {
      "@type": "Place",
      name: "Arya Samaj Nagaram",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "H.No. 4-13/6/A/1, Road No. 5/4, West Gandhi Nagar, Nagaram, Keesara",
        addressLocality: "Medchal-Malkajgiri",
        addressRegion: "Telangana",
        postalCode: "500083",
        addressCountry: "IN",
      },
      hasMap: "https://maps.app.goo.gl/TngfU1aPXELkbGMp6",
    },
    {
      "@type": "Place",
      name: "Arya Samaj Mettuguda",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12-8-390/A & B, Near Pillar No.1122, Mettuguda",
        addressLocality: "Secunderabad",
        addressRegion: "Telangana",
        postalCode: "500017",
        addressCountry: "IN",
      },
      hasMap: "https://maps.app.goo.gl/sTVVuqM5NwoxnUs8A",
    },
  ],
  sameAs: [
    "https://maps.app.goo.gl/sTVVuqM5NwoxnUs8A",
    "https://maps.app.goo.gl/TngfU1aPXELkbGMp6",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10829125096"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10829125096');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FFFDF9] text-[#1E293B] antialiased">
        <Header />
        <main className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
        <StickyContactButtons />
      </body>
    </html>
  );
}
