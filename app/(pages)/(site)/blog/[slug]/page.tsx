import { getAllEntries, getEntry } from "@/app/features/content/loader";
import { Prose } from "@/app/features/content/prose";
import { ReadingMarquee } from "@/app/features/content/reading-marquee";
import { pageMetadata } from "@/app/features/seo/metadata";
import { Container } from "@/app/features/ui/container";
import { formatRelativeDate } from "@/app/features/utils/date";

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
      <Container size="md" className="flex flex-col gap-64 lg:gap-96 px-24 py-64 lg:py-80" enableMdMaxWidth>
        <header className="flex flex-col text-left lg:text-right">
          <p className="title-2 -rotate-1 text-black/25 lg:-mb-8">{formatRelativeDate(entry.date)}</p>
          <h1 className="title-1 -rotate-1">{entry.title}</h1>
        </header>
        <Prose>
          <Post />
        </Prose>
      </Container>
      <ReadingMarquee />
    </>
  );
}
