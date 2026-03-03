import type { Metadata } from "next";

import { DashboardLayoutClient } from "@/components/dashboard/dashboard-layout-client";

export const metadata: Metadata = {
  alternates: {
    canonical: "/dashboard/",
  },
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
  title: "Panel de administración",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
