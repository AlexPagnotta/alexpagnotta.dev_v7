import type { Metadata } from "next";
import { CONTENT_TYPES, type ContentType, hrefFor } from "@/app/features/content/config";
import { getAllEntries, getEntry } from "@/app/features/content/loader";
import { CONTENT_TAG_LABELS } from "@/app/features/content/tags";
import { pageMetadata } from "@/app/features/seo/metadata";

export const detailPageParams = (type: ContentType) => getAllEntries(type).map((entry) => ({ slug: entry.slug }));

export const detailPageMetadata = (type: ContentType, slug: string): Metadata => {
  const { title, description, date, tags } = getEntry(type, slug);
  return pageMetadata({
    title,
    description,
    path: hrefFor(type, slug),
    type: "article",
    article: {
      publishedTime: date,
      section: CONTENT_TYPES[type].label,
      tags: tags.map((tag) => CONTENT_TAG_LABELS[tag]),
    },
  });
};
