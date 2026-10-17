import type { Metadata } from "next";
import { getBody, getCover, getEntry } from "@/app/features/content/loader";
import { DetailPage } from "@/app/features/detail-page/detail-page";
import { ProjectHero } from "@/app/features/detail-page/hero/project-hero";
import { detailPageMetadata, detailPageParams } from "@/app/features/detail-page/metadata";

type Props = PageProps<"/projects/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => detailPageParams("project");

export const generateMetadata = async ({ params }: Props): Promise<Metadata> =>
  detailPageMetadata("project", (await params).slug);

const ProjectPage = async ({ params }: Props) => {
  const { slug } = await params;
  const entry = getEntry("project", slug);
  const [cover, Body] = await Promise.all([getCover("project", slug, entry.cover), getBody("project", slug)]);

  return (
    <DetailPage
      type="project"
      entry={entry}
      hero={
        <ProjectHero
          title={entry.title}
          tags={entry.tags}
          date={entry.date}
          client={entry.client}
          link={entry.link}
          cover={cover}
          accent={entry.accent}
        />
      }
    >
      <Body />
    </DetailPage>
  );
};

export default ProjectPage;
