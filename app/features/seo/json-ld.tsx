import type { ContentType } from "@/app/features/content/config";
import { absoluteUrl, siteConfig } from "@/app/features/site/config";

const PERSON_ID = absoluteUrl("/#person");
const WEBSITE_ID = absoluteUrl("/#website");

type JsonLdScriptProps = { data: object };

const JsonLdScript = ({ data }: JsonLdScriptProps) => (
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
      worksFor: { "@type": "Organization", ...siteConfig.author.employer },
      email: `mailto:${siteConfig.author.email}`,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.author.image),
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
  thought: "BlogPosting",
} as const satisfies Record<ContentType, string>;

export type ArticleJsonLdProps = {
  type: ContentType;
  title: string;
  description?: string;
  /** Root-relative path of the entry, e.g. `/writings/hello-world`. */
  path: string;
  date: Date;
  tags?: readonly string[];
};

/** The entry plus its breadcrumb home; there is no `/writings` or `/projects` index, so the trail skips that level. */
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
