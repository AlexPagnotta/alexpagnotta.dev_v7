import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/features/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
