import type * as React from "react";
import { type ContentType, type EntryFor, hrefFor } from "@/app/features/content/config";
import { Prose } from "@/app/features/content/markdown/prose";
import { CONTENT_TAG_LABELS } from "@/app/features/content/tags";
import { ArticleJsonLd } from "@/app/features/seo/json-ld";
import { Container } from "@/app/features/ui/container";

export type DetailPageProps<T extends ContentType> = {
  type: T;
  entry: EntryFor<T>;
  hero: React.ReactNode;
  /** The entry's rendered MDX. */
  children: React.ReactNode;
};

export const DetailPage = <T extends ContentType>({ type, entry, hero, children }: DetailPageProps<T>) => (
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
