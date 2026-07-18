import type { Metadata } from "next";
import { siteConfig } from "@/app/features/seo/config";

type PageMetadataInput = {
  // Omit for the homepage so it inherits the untemplated root `title.default`; pass a
  // string on inner pages to get the "%s | name" template and a per-page canonical/OG.
  title?: string;
  description?: string;
  // Root-relative path of the page, e.g. "/" or "/blog/hello-world". Resolved against
  // metadataBase for the canonical link and og:url.
  path: string;
  type?: "website" | "article";
};

// Builds per-page metadata so each route gets its own canonical URL, og:url, and og:title
// instead of inheriting the root layout's site-level values. Next replaces the whole
// `openGraph` object per segment, so every field the page needs must be set here.
export const pageMetadata = ({
  title,
  description = siteConfig.description,
  path,
  type = "article",
}: PageMetadataInput): Metadata => {
  const ogTitle = title || siteConfig.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: ogTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.ogImage],
    },
    twitter: {
      // The whole twitter object replaces the root layout's per segment, so card and
      // creator must be repeated here or they are dropped on every page using this helper.
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title: ogTitle,
      description,
      images: [siteConfig.ogImage.url],
    },
  };
};
