import type { MetadataRoute } from "next";
import { getAllEntries } from "@/app/features/content/loader";
import { absoluteUrl } from "@/app/features/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  };

  const projects = getAllEntries("project").map((entry) => ({
    url: absoluteUrl(`/projects/${entry.slug}`),
    lastModified: entry.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const writings = getAllEntries("writing").map((entry) => ({
    url: absoluteUrl(`/writings/${entry.slug}`),
    lastModified: entry.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [home, ...projects, ...writings];
}
