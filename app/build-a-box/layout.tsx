import type { Metadata } from "next";

import { SITE_LOCALE, SITE_NAME, SOCIAL_IMAGE_URL } from "@/lib/seo";

const title = "Arma tu caja de brigadeiros en línea";
const description =
  "Elige tu empaque, selecciona tus sabores favoritos y crea tu caja personalizada de brigadeiros gourmet para entrega en Monterrey.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/build-a-box/",
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
    url: "/build-a-box/",
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

export default function BuildABoxLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
