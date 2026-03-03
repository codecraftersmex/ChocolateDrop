import type { Metadata } from "next";

import { SITE_LOCALE, SITE_NAME, SOCIAL_IMAGE_URL } from "@/lib/seo";

const title = "Cotiza brigadeiros y carrito de postres para eventos";
const description =
  "Solicita una cotización para eventos sociales, bodas y corporativos con brigadeiros gourmet, carrito de postres y servicio en Monterrey.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/quote-event/",
  },
  description,
  openGraph: {
    description,
    images: [
      {
        alt: `${SITE_NAME} logo`,
        height: 630,
        url: SOCIAL_IMAGE_URL,
        width: 1200,
      },
    ],
    locale: SITE_LOCALE,
    title,
    type: "website",
    url: "/quote-event/",
  },
  robots: {
    follow: true,
    index: true,
  },
  title,
  twitter: {
    card: "summary_large_image",
    description,
    images: [SOCIAL_IMAGE_URL],
    title,
  },
};

export default function QuoteEventLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
