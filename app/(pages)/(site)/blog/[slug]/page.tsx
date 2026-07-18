import { getAllEntries, getEntry } from "@/app/features/content/loader";
import { Prose } from "@/app/features/content/prose";
import { ReadingMarquee } from "@/app/features/content/reading-marquee";
import { pageMetadata } from "@/app/features/seo/metadata";
import { Container } from "@/app/features/ui/container";
import { formatRelativeDate } from "@/app/features/utils/relative-date";

type Props = PageProps<"/blog/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("blog").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description } = getEntry("blog", slug);
  return pageMetadata({ title, description, path: `/blog/${slug}`, type: "article" });
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry("blog", slug);
  const { default: Post } = await import(`@/content/blog/${slug}/index.mdx`);

  return (
    <>
      <Container size="md" className="flex flex-col gap-40 px-24 py-64">
        <header className="flex flex-col gap-8">
          <p className="title-2 rotate-1 text-right text-black/25">{formatRelativeDate(entry.date)}</p>
          <h1 className="title-1 rotate-1 text-center">{entry.title}</h1>
        </header>
        <Prose>
          <Post />
        </Prose>
      </Container>
      <ReadingMarquee />
    </>
  );
}
