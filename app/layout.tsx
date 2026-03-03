import type { Metadata } from "next";

import { ConditionalNavbar } from "@/components/shared";
import {
  BUSINESS_CONTACT,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SERVICE_AREAS,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE_PATH,
  SOCIAL_IMAGE_URL,
  SOCIAL_LINKS,
} from "@/lib/seo";

import "./globals.css";

import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/contexts/cart-context";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  authors: [
    {
      name: "Vicente Cantú",
      url: SITE_URL,
    },
  ],
  category: "food",
  creator: "Vicente Cantú",
  icons: {
    icon: [{ type: "image/png", url: SOCIAL_IMAGE_PATH }],
    apple: [{ url: SOCIAL_IMAGE_PATH }],
    shortcut: [SOCIAL_IMAGE_PATH],
  },
  keywords: DEFAULT_KEYWORDS,
  manifest: "/site.webmanifest",
  openGraph: {
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        alt: `${SITE_NAME} logo`,
        height: 630,
        url: SOCIAL_IMAGE_URL,
        width: 1200,
      },
    ],
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    type: "website",
    url: SITE_URL,
  },
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE_URL],
    title: DEFAULT_TITLE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "Place",
      name,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        areaServed: "MX",
        availableLanguage: [SITE_LANGUAGE],
        contactType: "customer support",
        email: BUSINESS_CONTACT.email,
        telephone: BUSINESS_CONTACT.phone,
      },
    ],
    email: BUSINESS_CONTACT.email,
    logo: SOCIAL_IMAGE_URL,
    name: SITE_NAME,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    telephone: BUSINESS_CONTACT.phone,
    url: SITE_URL,
  };

  const bakeryJsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
      addressLocality: "Monterrey",
      addressRegion: "Nuevo León",
    },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "Place",
      name,
    })),
    availableLanguage: [SITE_LANGUAGE],
    email: BUSINESS_CONTACT.email,
    image: SOCIAL_IMAGE_URL,
    logo: SOCIAL_IMAGE_URL,
    name: SITE_NAME,
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    telephone: BUSINESS_CONTACT.phone,
    url: SITE_URL,
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`
          ${poppins.className}
          antialiased
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bakeryJsonLd),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <ScrollToTop />
            <ConditionalNavbar />
            {children}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
