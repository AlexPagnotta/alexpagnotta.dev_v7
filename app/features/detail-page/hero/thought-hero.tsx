import type { ContentTag } from "@/app/features/content/config";
import { DetailPageHero } from "@/app/features/detail-page/hero/detail-page-hero";
import { formatDate } from "@/app/features/detail-page/hero/writing-hero";
import type { Accent } from "@/app/features/style/accents";

export type ThoughtHeroProps = {
  title: string;
  tags: readonly ContentTag[];
  date: Date;
  accent?: Accent;
};

export const ThoughtHero = ({ title, tags, date, accent }: ThoughtHeroProps) => (
  <DetailPageHero type="thought" title={title} tags={tags} accent={accent} meta={formatDate(date)} back={false} />
);
