import type { MetadataRoute } from "next";
import { CONTENT_TYPE_KEYS } from "@/app/features/content/config";
import { getAllEntries, hrefFor } from "@/app/features/content/loader";
import { absoluteUrl } from "@/app/features/seo/config";

// `lastModified` is the only hint Google reads; `priority` and `changeFrequency` are ignored.
export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/"),
    lastModified: new Date(),
  };

  // Every content type at once, so a new type never has to be wired in here.
  const entries = CONTENT_TYPE_KEYS.flatMap((type) =>
    getAllEntries(type).map((entry) => ({
      url: absoluteUrl(hrefFor(type, entry.slug)),
      lastModified: entry.date,
    }))
  );

  return [home, ...entries];
}
