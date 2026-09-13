import type { Metadata } from "next";
import { siteConfig } from "@/app/features/seo/config";

/** The Open Graph article facts a detail page carries on top of the shared fields. */
type ArticleInput = {
  publishedTime: Date;
  modifiedTime?: Date;
  // The content type's own label, e.g. "Writing" or "Project".
  section?: string;
  tags?: readonly string[];
};

type PageMetadataInput = {
  // Omit for the homepage so it inherits the untemplated root `title.default`; pass a
  // string on inner pages to get the "%s | name" template and a per-page canonical/OG.
  title?: string;
  description?: string;
  // Root-relative path of the page, e.g. "/" or "/writings/hello-world". Resolved against
  // metadataBase for the canonical link and og:url.
  path: string;
} & (
  | { type?: "website"; article?: never }
  // An article page has to carry its dates, or og:type=article ships without them.
  | { type: "article"; article: ArticleInput }
);

/**
 * `alternates` is replaced wholesale per segment, so the feed link has to be repeated
 * anywhere a page sets its own canonical, or it survives only on pages that set neither.
 */
export const feedAlternates = {
  "application/rss+xml": [{ url: siteConfig.feed.path, title: siteConfig.feed.title }],
};

// Next replaces the whole openGraph object per segment, so every field must be set here, not just canonical.
export const pageMetadata = ({
  title,
  description = siteConfig.description,
  path,
  type = "website",
  article,
}: PageMetadataInput): Metadata => {
  const ogTitle = title || siteConfig.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: feedAlternates },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.ogImage],
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime.toISOString(),
            modifiedTime: (article.modifiedTime ?? article.publishedTime).toISOString(),
            authors: [siteConfig.author.name],
            ...(article.section ? { section: article.section } : {}),
            ...(article.tags?.length ? { tags: [...article.tags] } : {}),
          }
        : { type }),
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
