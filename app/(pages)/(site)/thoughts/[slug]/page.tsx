import type { Metadata } from "next";
import { getEntry } from "@/app/features/content/loader";
import { DetailPage } from "@/app/features/detail-page/detail-page";
import { ThoughtHero } from "@/app/features/detail-page/hero/thought-hero";
import { detailPageMetadata, detailPageParams } from "@/app/features/detail-page/metadata";

type Props = PageProps<"/thoughts/[slug]">;

export const dynamicParams = false;

export const generateStaticParams = () => detailPageParams("thought");

export const generateMetadata = async ({ params }: Props): Promise<Metadata> =>
  detailPageMetadata("thought", (await params).slug);

const ThoughtPage = async ({ params }: Props) => {
  const { slug } = await params;
  const entry = getEntry("thought", slug);
  const { default: Body } = await import(`@/content/thoughts/${slug}/index.mdx`);

  return (
    <DetailPage
      type="thought"
      entry={entry}
      hero={<ThoughtHero title={entry.title} tags={entry.tags} date={entry.date} accent={entry.accent} />}
    >
      <Body />
    </DetailPage>
  );
};

export default ThoughtPage;
