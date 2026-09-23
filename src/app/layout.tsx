import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { siteConfig } from "@/data/portfolio";
import { StructuredData } from "@/components/seo/StructuredData";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { ContentProtection } from "@/components/ui/ContentProtection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import "./globals.css";

// Self-hosted at build time instead of a runtime <link> to fonts.googleapis.com:
// mobile Lighthouse showed that external stylesheet as render-blocking,
// costing ~850ms before first paint. next/font inlines the @font-face rules
// and serves the font files from this origin, with font-display: swap.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | AI-First Full-Stack Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@yadnyesh_mulay",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION, // Set GOOGLE_SITE_VERIFICATION in environment variables
  },
  other: {
    "theme-color": "#7d1f2e",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8e4dc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0908" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${archivo.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen text-fg antialiased">
        <BackgroundFX />
        <ContentProtection />
        <CustomCursor />
        {children}
        <GoogleAnalytics />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      </body>
    </html>
  );
}