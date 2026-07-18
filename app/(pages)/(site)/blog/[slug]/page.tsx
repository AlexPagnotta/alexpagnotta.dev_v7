import { getAllEntries, getEntry } from "@/app/features/content/loader";
import { Prose } from "@/app/features/content/prose";
import { ReadingMarquee } from "@/app/features/content/reading-marquee";
import { Container } from "@/app/features/ui/container";

type Props = PageProps<"/blog/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("blog").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description } = getEntry("blog", slug);
  return { title, description };
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry("blog", slug);
  const { default: Post } = await import(`@/content/blog/${slug}/index.mdx`);

  return (
    <>
      <Container size="md" className="flex flex-col gap-40 px-24 py-64">
        <header className="flex flex-col gap-16">
          <h1 className="title-1">{entry.title}</h1>
          <p className="caption text-black/60">
            {entry.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </header>
        <Prose>
          <Post />
        </Prose>
      </Container>
      <ReadingMarquee />
    </>
  );
}
