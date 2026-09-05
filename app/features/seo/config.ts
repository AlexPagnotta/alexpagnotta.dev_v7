import { env } from "@/env";

// Central source of truth for site-wide SEO copy and identity. Placeholder content —
// replace the strings below with final copy; everything else derives from these.
export const siteConfig = {
  url: env.NEXT_PUBLIC_SITE_URL,
  name: "Site Name",
  shortName: "site",
  // Used as the homepage title and the `%s | title` template suffix.
  title: "Site Name — Tagline",
  description: "A one-sentence description of the site, used as the default meta description.",
  locale: "en_US",
  lang: "en",
  // Shared social-share image (Open Graph + Twitter). Lives in /public so it resolves to
  // one stable absolute URL — a per-page `openGraph` object replaces any file-convention
  // image, so it must be referenced explicitly.
  ogImage: { url: "/og.jpg", width: 1200, height: 630, alt: "Site Name" },
  keywords: ["keyword"],
  author: {
    name: "Author Name",
    jobTitle: "Job Title",
    email: "hello@example.com",
  },
  // Public profiles — surface as `sameAs` in structured data so search engines can
  // link this site to the same real-world person.
  social: {
    twitter: "https://x.com/",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  twitterHandle: "@handle",
} as const;

export const absoluteUrl = (path = "") => new URL(path, siteConfig.url).toString();
