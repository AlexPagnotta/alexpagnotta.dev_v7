import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/app/features/seo/config";
import { isProduction } from "@/app/features/utils/release-channel";

export default function robots(): MetadataRoute.Robots {
  // Only the production channel should be crawlable; preview/staging deploys are blocked
  // wholesale so draft content and non-canonical hosts never enter a search index.
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/design" },
    sitemap: absoluteUrl("/sitemap.xml"),
    // Host directive expects a bare hostname, not a full URL with scheme.
    host: new URL(siteConfig.url).host,
  };
}
