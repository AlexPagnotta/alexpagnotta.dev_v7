import NextImage, { type StaticImageData } from "next/image";
import { getAllEntries, getEntry } from "@/app/features/content/loader";
import { Prose } from "@/app/features/content/prose";
import { ReadingMarquee } from "@/app/features/content/reading-marquee";
import { Container } from "@/app/features/ui/container";

type Props = PageProps<"/projects/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("project").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description } = getEntry("project", slug);
  return { title, description };
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry("project", slug);
  const { default: Project } = await import(`@/content/projects/${slug}/index.mdx`);

  let cover: StaticImageData | null = null;
  if (entry.coverImage) {
    ({ default: cover } = await import(`@/content/projects/${slug}/${entry.coverImage}`));
  }

  return (
    <>
      <Container size="md" className="flex flex-col gap-40 px-24 py-64">
        {cover && (
          <NextImage
            src={cover}
            alt={entry.title}
            placeholder="blur"
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full rounded-md"
          />
        )}
        <header className="flex flex-col gap-16">
          <h1 className="title-1">{entry.title}</h1>
          <p className="caption text-black/60">
            {entry.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </header>
        <Prose>
          <Project />
        </Prose>
      </Container>
      <ReadingMarquee />
    </>
  );
}
