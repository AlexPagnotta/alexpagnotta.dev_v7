import type { Metadata } from "next";
import { formatDate } from "@/app/features/content/format";
import { getBody, getEntry } from "@/app/features/content/loader";
import { DetailPage } from "@/app/features/detail-page/detail-page";
import { DetailPageHero } from "@/app/features/detail-page/hero/detail-page-hero";
import { detailPageMetadata, detailPageParams } from "@/app/features/detail-page/metadata";

type Props = PageProps<"/thoughts/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => detailPageParams("thought");

export const generateMetadata = async ({ params }: Props): Promise<Metadata> =>
  detailPageMetadata("thought", (await params).slug);

const ThoughtPage = async ({ params }: Props) => {
  const { slug } = await params;
  const entry = getEntry("thought", slug);
  const Body = await getBody("thought", slug);

  return (
    <DetailPage
      type="thought"
      entry={entry}
      hero={
        <DetailPageHero
          type="thought"
          title={entry.title}
          tags={entry.tags}
          meta={formatDate(entry.date)}
          accent={entry.accent}
        />
      }
    >
      <Body />
    </DetailPage>
  );
};

export default ThoughtPage;
