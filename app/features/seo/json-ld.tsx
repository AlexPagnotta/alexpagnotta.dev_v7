import type { ContentType } from "@/app/features/content/config";
import { absoluteUrl, siteConfig } from "@/app/features/seo/config";

const PERSON_ID = absoluteUrl("/#person");
const WEBSITE_ID = absoluteUrl("/#website");

const JsonLdScript = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be injected as a raw script body.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

// Person + WebSite as a single @graph so search engines can build one rich entity for the
// site and its owner. Rendered once in the root layout; everything else references these ids.
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.jobTitle,
      email: `mailto:${siteConfig.author.email}`,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.ogImage.url),
      sameAs: Object.values(siteConfig.social),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.lang,
      publisher: { "@id": PERSON_ID },
      author: { "@id": PERSON_ID },
    },
  ],
};

export const SiteJsonLd = () => <JsonLdScript data={siteGraph} />;

// A writing is an article; a project is a piece of work that happens to have a write-up.
const SCHEMA_TYPE = {
  writing: "BlogPosting",
  project: "CreativeWork",
} as const satisfies Record<ContentType, string>;

type ArticleJsonLdProps = {
  type: ContentType;
  title: string;
  description?: string;
  /** Root-relative path of the entry, e.g. `/writings/hello-world`. */
  path: string;
  date: Date;
  tags?: readonly string[];
};

/**
 * Per-entry structured data: the entry itself plus the trail back to the homepage. Breadcrumbs
 * skip a section level because the site has no `/writings` or `/projects` index to point at.
 */
export const ArticleJsonLd = ({ type, title, description, path, date, tags }: ArticleJsonLdProps) => {
  const url = absoluteUrl(path);

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": SCHEMA_TYPE[type],
            "@id": `${url}#entry`,
            url,
            mainEntityOfPage: url,
            headline: title,
            name: title,
            ...(description ? { description } : {}),
            datePublished: date.toISOString(),
            dateModified: date.toISOString(),
            image: absoluteUrl(siteConfig.ogImage.url),
            inLanguage: siteConfig.lang,
            ...(tags?.length ? { keywords: [...tags] } : {}),
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
            isPartOf: { "@id": WEBSITE_ID },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: title, item: url },
            ],
          },
        ],
      }}
    />
  );
};
