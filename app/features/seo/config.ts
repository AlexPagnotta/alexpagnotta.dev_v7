import { env } from "@/env";

// Used as the homepage title and the `%s | name` template suffix. Declared apart from the
// config so the share image can reuse it as its alt text.
const title = "Alex Pagnotta — TODO Dev";

// Central source of truth for site-wide SEO copy and identity. Everything else derives
// from these — metadata, structured data, the manifest, llms.txt and the feed.
export const siteConfig = {
  url: env.NEXT_PUBLIC_SITE_URL,
  name: "Alex Pagnotta",
  shortName: "pagnotta",
  title,
  description: "TODO Dev",
  locale: "en_US",
  lang: "en",
  // Shared social-share image (Open Graph + Twitter). Lives in /public so it resolves to
  // one stable absolute URL — a per-page `openGraph` object replaces any file-convention
  // image, so it must be referenced explicitly.
  ogImage: { url: "/og.png", width: 1200, height: 630, alt: title },
  // The mark's pink ground, mirrored by the manifest and the browser theme colour.
  themeColor: "#ff99e2",
  // The RSS feed, advertised as a `rel="alternate"` on every page.
  feed: { path: "/rss.xml", title: "Alex Pagnotta — RSS Feed" },
  author: {
    name: "Alex Pagnotta",
    jobTitle: "Full Stack Dev",
    // TODO: replace with the final contact address.
    email: "hello@example.com",
  },
  // Public profiles — surfaced as `sameAs` in structured data so search engines can
  // link this site to the same real-world person.
  // TODO: replace the four URLs below with the real profiles.
  social: {
    twitter: "https://x.com/",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    unsplash: "https://unsplash.com/",
  },
  // TODO: replace with the real X handle, or drop the field and the twitter.creator uses.
  twitterHandle: "@handle",
  // A document rather than a profile, so it stays out of `social` and off `sameAs`.
  resumeUrl: "/resume.pdf",
} as const;

export const absoluteUrl = (path = "") => new URL(path, siteConfig.url).toString();
