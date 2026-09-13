import { CONTENT_TYPE_KEYS, CONTENT_TYPES } from "@/app/features/content/config";
import { getAllEntries, hrefFor } from "@/app/features/content/loader";
import { absoluteUrl, siteConfig } from "@/app/features/seo/config";

export const dynamic = "force-static";

// Follows the https://llmstxt.org convention; reuses the sitemap's content loader so it never drifts.
export const GET = () => {
  const sections = CONTENT_TYPE_KEYS.flatMap((type) => {
    const entries = getAllEntries(type).map((entry) => {
      const link = `- [${entry.title}](${absoluteUrl(hrefFor(type, entry.slug))})`;
      return entry.description ? `${link}: ${entry.description}` : link;
    });

    // Labels name a single entry ("Writing"), and these headings list many.
    return [`## ${CONTENT_TYPES[type].label}s`, "", ...(entries.length ? entries : ["- _None published yet._"]), ""];
  });

  const body = [`# ${siteConfig.name}`, "", `> ${siteConfig.description}`, "", ...sections].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
