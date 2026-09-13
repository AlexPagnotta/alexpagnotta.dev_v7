import { Prose } from "@/app/features/content/components/prose";
import { getAllEntries, getCover, getEntry } from "@/app/features/content/loader";
import { ProjectHero } from "@/app/features/detail-page/hero/project-hero";
import { pageMetadata } from "@/app/features/seo/metadata";
import { Container } from "@/app/features/ui/container";

type Props = PageProps<"/projects/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => getAllEntries("project").map((entry) => ({ slug: entry.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const { title, description } = getEntry("project", slug);
  return pageMetadata({ title, description, path: `/projects/${slug}`, type: "article" });
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry("project", slug);
  const cover = await getCover("project", slug, entry.cover);
  const { default: Project } = await import(`@/content/projects/${slug}/index.mdx`);

  return (
    <article>
      <ProjectHero
        title={entry.title}
        tags={entry.tags}
        date={entry.date}
        client={entry.client}
        link={entry.link}
        cover={cover}
        accent={entry.accent}
      />
      <Container size="sm" className="px-(--page-side-spacing) pt-120 pb-120 lg:pb-160">
        <Prose>
          <Project />
        </Prose>
      </Container>
    </article>
  );
}
