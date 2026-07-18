import { env } from "@/env";

// Central source of truth for site-wide SEO copy and identity. Mock content for now —
// replace the strings below with final copy; everything else derives from these.
export const siteConfig = {
  url: env.NEXT_PUBLIC_SITE_URL,
  name: "Alex Pagnotta",
  shortName: "pagnotta",
  // Used as the homepage title and the `%s | title` template suffix.
  title: "Alex Pagnotta — Design Engineer",
  description:
    "Design engineer building thoughtful products at the intersection of design and code. Notes, projects, and things I ship in the open.",
  locale: "en_US",
  lang: "en",
  // Shared social-share image (Open Graph + Twitter). Lives in /public so it resolves to
  // one stable absolute URL — a per-page `openGraph` object replaces any file-convention
  // image, so it must be referenced explicitly.
  ogImage: { url: "/og.jpg", width: 1200, height: 639, alt: "Alex Pagnotta — Design Engineer" },
  // Keywords are low-signal for search but harmless; kept short and honest.
  keywords: ["Alex Pagnotta", "design engineer", "frontend developer", "web design", "portfolio"],
  author: {
    name: "Alex Pagnotta",
    jobTitle: "Design Engineer",
    email: "alx97p@gmail.com",
  },
  // Public profiles — surfaced as `sameAs` in structured data so search engines can
  // link this site to the same real-world person.
  social: {
    twitter: "https://x.com/",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  // Twitter/X handle for the summary card attribution (leave blank until finalized).
  twitterHandle: "@alexpagnotta",
} as const;

export const absoluteUrl = (path = "") => new URL(path, siteConfig.url).toString();
