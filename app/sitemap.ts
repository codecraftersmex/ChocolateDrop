import type { MetadataRoute } from "next";

import { MARKETING_PATHS, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const buildAbsoluteUrl = (path: (typeof MARKETING_PATHS)[number]) => {
  if (path === "/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${path}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return MARKETING_PATHS.map((path) => ({
    changeFrequency: path === "/" ? "weekly" : "monthly",
    lastModified,
    priority: path === "/" ? 1 : 0.8,
    url: buildAbsoluteUrl(path),
  }));
}
