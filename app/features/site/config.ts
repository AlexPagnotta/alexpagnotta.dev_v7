import { env } from "@/env";

// Used as the homepage title and the `%s | name` template suffix. Declared apart from the
// config so the share image can reuse it as its alt text.
const title = "Alex Pagnotta · Developer & Builder";

// Site identity and contact details, read by the nav as well as metadata, structured data,
// the manifest, llms.txt and the feed.
export const siteConfig = {
  url: env.NEXT_PUBLIC_SITE_URL,
  name: "Alex Pagnotta",
  shortName: "pagnotta",
  title,
  description: "Alex Pagnotta's digital place: dev work, things I make, thoughts and whatever I'm curious about.",
  locale: "en_US",
  lang: "en",
  // Referenced explicitly, since a per-page `openGraph` object replaces any file-convention image.
  ogImage: { url: "/og.png", width: 1200, height: 630, alt: title },
  // The mark's pink ground, mirrored by the manifest and the browser theme colour.
  themeColor: "#ff99e2",
  // The RSS feed, advertised as a `rel="alternate"` on every page.
  feed: { path: "/rss.xml", title: "Alex Pagnotta — RSS Feed" },
  author: {
    name: "Alex Pagnotta",
    jobTitle: "Principal Developer",
    employer: { name: "WILD", url: "https://www.wild.as" },
    email: "ap.alex.pagnotta@gmail.com",
    image: "/profile.jpg",
  },
  // Public profiles, surfaced as `sameAs` in structured data so search engines can
  // link this site to the same real-world person.
  social: {
    github: "https://github.com/AlexPagnotta",
    linkedin: "https://www.linkedin.com/in/alex-pagnotta",
    unsplash: "https://unsplash.com/@alexpagnotta",
  },
  // A document rather than a profile, so it stays out of `social` and off `sameAs`.
  resumeUrl: "/resume.pdf",
} as const;

export const absoluteUrl = (path = "") => new URL(path, siteConfig.url).toString();

// The ratio and kerning are measured for these exact words, so the three change together.
export const NAME_WORDMARK = {
  words: ["ALEX", "PAGNOTTA"],
  ratio: 8.1,
  kerning: { PA: -0.07, AG: -0.06, OT: -0.04, TA: -0.09 },
} as const;
