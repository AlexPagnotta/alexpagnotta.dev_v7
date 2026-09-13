import { Prose } from "@/app/features/content/components/prose";
import { CONTENT_TAG_LABELS, CONTENT_TYPES } from "@/app/features/content/config";
import { getAllEntries, getCover, getEntry, hrefFor } from "@/app/features/content/loader";
import { WritingHero } from "@/app/features/detail-page/hero/writing-hero";
import { ArticleJsonLd } from "@/app/features/seo/json-ld";
import { pageMetadata } from "@/app/features/seo/metadata";
import { Container } from "@/app/features/ui/container";

type Props = PageProps<"/writings/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("writing").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description, date, tags } = getEntry("writing", slug);
  return pageMetadata({
    title,
    description,
    path: hrefFor("writing", slug),
    type: "article",
    article: {
      publishedTime: date,
      section: CONTENT_TYPES.writing.label,
      tags: tags.map((tag) => CONTENT_TAG_LABELS[tag]),
    },
  });
};

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  const cover = await getCover("writing", slug, entry.cover);
  const { default: Writing } = await import(`@/content/writings/${slug}/index.mdx`);

  return (
    <article>
      <WritingHero title={entry.title} tags={entry.tags} date={entry.date} cover={cover} accent={entry.accent} />
      <Container size="sm" className="px-(--page-side-spacing) pt-120 pb-120 lg:pb-160">
        <Prose>
          <Writing />
        </Prose>
      </Container>
      <ArticleJsonLd
        type="writing"
        title={entry.title}
        description={entry.description}
        path={hrefFor("writing", slug)}
        date={entry.date}
        tags={entry.tags.map((tag) => CONTENT_TAG_LABELS[tag])}
      />
    </article>
  );
}
