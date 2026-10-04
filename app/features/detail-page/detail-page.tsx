import type * as React from "react";
import { CONTENT_TAG_LABELS, type ContentType, type EntryFor } from "@/app/features/content/config";
import { hrefFor } from "@/app/features/content/loader";
import { Prose } from "@/app/features/content/markdown/prose";
import { ArticleJsonLd } from "@/app/features/seo/json-ld";
import { Container } from "@/app/features/ui/container";

export type DetailPageProps = {
  type: ContentType;
  entry: EntryFor<ContentType>;
  hero: React.ReactNode;
  /** The entry's rendered MDX. */
  children: React.ReactNode;
};

export const DetailPage = ({ type, entry, hero, children }: DetailPageProps) => (
  // Clips media that an aside hangs past the screen edge, without becoming a scroll container.
  <article className="overflow-x-clip">
    {hero}
    <Container size="sm" className="px-(--page-side-spacing) pt-80 pb-96 lg:pt-96 lg:pb-160">
      <Prose>{children}</Prose>
    </Container>
    <ArticleJsonLd
      type={type}
      title={entry.title}
      description={entry.description}
      path={hrefFor(type, entry.slug)}
      date={entry.date}
      tags={entry.tags.map((tag) => CONTENT_TAG_LABELS[tag])}
    />
  </article>
);
