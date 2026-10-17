import type { Metadata } from "next";
import { formatDate } from "@/app/features/content/format";
import { getBody, getCover, getEntry } from "@/app/features/content/loader";
import { DetailPage } from "@/app/features/detail-page/detail-page";
import { DetailPageHero } from "@/app/features/detail-page/hero/detail-page-hero";
import { detailPageMetadata, detailPageParams } from "@/app/features/detail-page/metadata";

type Props = PageProps<"/writings/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => detailPageParams("writing");

export const generateMetadata = async ({ params }: Props): Promise<Metadata> =>
  detailPageMetadata("writing", (await params).slug);

const WritingPage = async ({ params }: Props) => {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  const [cover, Body] = await Promise.all([getCover("writing", slug, entry.cover), getBody("writing", slug)]);

  return (
    <DetailPage
      type="writing"
      entry={entry}
      hero={
        <DetailPageHero
          type="writing"
          title={entry.title}
          tags={entry.tags}
          meta={formatDate(entry.date)}
          cover={cover}
          accent={entry.accent}
        />
      }
    >
      <Body />
    </DetailPage>
  );
};

export default WritingPage;
