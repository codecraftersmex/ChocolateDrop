import type { Metadata } from "next";

const title = "Finalizar pedido";
const description =
  "Completa tu información para confirmar tu pedido de brigadeiros gourmet y coordinar la entrega.";

export const metadata: Metadata = {
  alternates: {
    canonical: "/checkout/",
  },
  description,
  robots: {
    follow: false,
    index: false,
    googleBot: {
      follow: false,
      index: false,
      noarchive: true,
      nosnippet: true,
    },
  },
  title,
};

export default function CheckoutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
