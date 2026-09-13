import { CONTENT_TAG_LABELS, CONTENT_TYPES } from "@/app/features/content/config";
import { getFeedEntries, hrefFor } from "@/app/features/content/loader";
import { absoluteUrl, siteConfig } from "@/app/features/seo/config";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Everything the site publishes, newest first — the same list the homepage feed renders.
export const GET = () => {
  const items = getFeedEntries().map((entry) => {
    const url = absoluteUrl(hrefFor(entry.type, entry.slug));
    const categories = [CONTENT_TYPES[entry.type].label, ...entry.tags.map((tag) => CONTENT_TAG_LABELS[tag])];

    return [
      "    <item>",
      `      <title>${escapeXml(entry.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      ...(entry.description ? [`      <description>${escapeXml(entry.description)}</description>`] : []),
      // RSS dates are RFC 822, which is what toUTCString produces.
      `      <pubDate>${entry.date.toUTCString()}</pubDate>`,
      ...categories.map((category) => `      <category>${escapeXml(category)}</category>`),
      "    </item>",
    ].join("\n");
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(siteConfig.title)}</title>`,
    `    <link>${siteConfig.url}</link>`,
    `    <description>${escapeXml(siteConfig.description)}</description>`,
    `    <language>${siteConfig.lang}</language>`,
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${absoluteUrl(siteConfig.feed.path)}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
