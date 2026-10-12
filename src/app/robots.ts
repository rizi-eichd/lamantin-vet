import type { MetadataRoute } from "next";
import { clinic } from "@/data/contacts";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: process.env.SITE_INDEXABLE === "true" ? "/" : undefined,
      disallow: process.env.SITE_INDEXABLE === "true" ? ["/api/"] : "/",
    },
    sitemap: `${clinic.siteUrl}/sitemap.xml`,
  };
}
