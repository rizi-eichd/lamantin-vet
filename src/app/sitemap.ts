import type { MetadataRoute } from "next";
import { clinic } from "@/data/contacts";
import { activeServices } from "@/data/services";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: clinic.siteUrl, changeFrequency: "monthly", priority: 1 },
    {
      url: `${clinic.siteUrl}/booking`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...activeServices.map((s) => ({
      url: `${clinic.siteUrl}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
export const dynamic = "force-static";
