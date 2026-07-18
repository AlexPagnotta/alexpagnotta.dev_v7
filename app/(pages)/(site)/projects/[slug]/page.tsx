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
  const { default: Project } = await import(`@/content/projects/${slug}.mdx`);

  return (
    <>
      <Container size="md" className="flex flex-col gap-40 px-24 py-64">
        <header className="flex flex-col gap-16">
          <h1 className="title-1">{entry.title}</h1>
          {entry.stack.length > 0 && <p className="caption text-black/60">{entry.stack.join(" · ")}</p>}
        </header>
        <Prose>
          <Project />
        </Prose>
      </Container>
      <ReadingMarquee />
    </>
  );
}
