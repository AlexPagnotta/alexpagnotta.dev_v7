import type { MDXComponents } from "mdx/types";
import NextImage, { type StaticImageData } from "next/image";
import { getAllEntries, getEntry } from "@/app/features/content/loader";
import { Prose } from "@/app/features/content/prose";
import { ReadingMarquee } from "@/app/features/content/reading-marquee";
import { Container } from "@/app/features/ui/container";
import { Marquee } from "@/app/features/ui/marquee";

type Props = PageProps<"/projects/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("project").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description } = getEntry("project", slug);
  return { title, description };
};

// The project body sits on a dark section, and its copy runs one step larger than
// the default prose paragraph.
const projectComponents: MDXComponents = {
  p: ({ children }) => <p className="body-2">{children}</p>,
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
      <Marquee variant="yellow" size="lg" className="border-y-4 border-black">
        {entry.title}&nbsp;&nbsp;&nbsp;&nbsp;
      </Marquee>
      {cover && (
        <div className="relative h-[70vh] w-full shrink-0">
          <NextImage
            src={cover}
            alt={entry.title}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <section className="bg-black">
        <Container size="md" className="px-24 py-64">
          <Prose tone="onDark">
            <Project components={projectComponents} />
          </Prose>
        </Container>
      </section>
      <ReadingMarquee />
    </>
  );
}
