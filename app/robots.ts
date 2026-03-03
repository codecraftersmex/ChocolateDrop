import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: [
      {
        allow: "/",
        disallow: ["/checkout", "/checkout/", "/dashboard", "/dashboard/"],
        userAgent: "*",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
