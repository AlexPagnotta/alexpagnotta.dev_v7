import type { Metadata } from "next";
import { getCover, getEntry } from "@/app/features/content/loader";
import { DetailPage } from "@/app/features/detail-page/detail-page";
import { WritingHero } from "@/app/features/detail-page/hero/writing-hero";
import { detailPageMetadata, detailPageParams } from "@/app/features/detail-page/metadata";

type Props = PageProps<"/writings/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => detailPageParams("writing");

export const generateMetadata = async ({ params }: Props): Promise<Metadata> =>
  detailPageMetadata("writing", (await params).slug);

const WritingPage = async ({ params }: Props) => {
  const { slug } = await params;
  const entry = getEntry("writing", slug);
  const cover = await getCover("writing", slug, entry.cover);
  const { default: Body } = await import(`@/content/writings/${slug}/index.mdx`);

  return (
    <DetailPage
      type="writing"
      entry={entry}
      hero={<WritingHero title={entry.title} tags={entry.tags} date={entry.date} cover={cover} accent={entry.accent} />}
    >
      <Body />
    </DetailPage>
  );
};

export default WritingPage;
