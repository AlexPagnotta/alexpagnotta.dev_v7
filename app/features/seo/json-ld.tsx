import { absoluteUrl, siteConfig } from "@/app/features/seo/config";

// Emits Person + WebSite structured data as a single @graph so search engines can
// build a rich entity for the site and its owner. Rendered once in the root layout.
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.jobTitle,
      email: `mailto:${siteConfig.author.email}`,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.ogImage.url),
      sameAs: Object.values(siteConfig.social),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.lang,
      publisher: { "@id": absoluteUrl("/#person") },
    },
  ],
};

export const JsonLd = () => (
  <script
    type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be injected as a raw script body.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
  />
);
