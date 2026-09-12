import { getAllEntries, getCover, getEntry } from "@/app/features/content/loader";
import { WritingHero } from "@/app/features/detail-page/hero/writing-hero";
import { pageMetadata } from "@/app/features/seo/metadata";
import { Container } from "@/app/features/ui/container";

type Props = PageProps<"/writings/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("writing").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description } = getEntry("writing", slug);
  return pageMetadata({ title, description, path: `/writings/${slug}`, type: "article" });
};

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  const cover = await getCover("writing", slug, entry.cover);
  const { default: Writing } = await import(`@/content/writings/${slug}/index.mdx`);

  return (
    <article>
      <WritingHero title={entry.title} tags={entry.tags} date={entry.date} cover={cover} accent={entry.accent} />
      {/* Body copy is still unstyled; the top padding clears the tag row hanging past the header. */}
      <Container size="md" className="px-(--page-side-spacing) pt-72 lg:pt-120">
        <Writing />
      </Container>
    </article>
  );
}
