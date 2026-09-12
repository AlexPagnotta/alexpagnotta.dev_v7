import type { StaticImageData } from "next/image";
import type { ContentTag } from "@/app/features/content/config";
import { DetailPageHero } from "@/app/features/detail-page/hero/hero";

const pad = (part: number) => String(part).padStart(2, "0");

// The design spells the date out as "18 - 09 - 2025". Read in UTC, because frontmatter
// dates carry no time and `z.coerce.date()` parks them at UTC midnight.
const formatDate = (date: Date) =>
  `${pad(date.getUTCDate())} - ${pad(date.getUTCMonth() + 1)} - ${date.getUTCFullYear()}`;

export type WritingHeroProps = {
  title: string;
  tags: readonly ContentTag[];
  date: Date;
  cover?: StaticImageData;
  accent?: string;
};

export const WritingHero = ({ title, tags, date, cover, accent }: WritingHeroProps) => (
  <DetailPageHero type="writing" title={title} tags={tags} cover={cover} accent={accent} meta={formatDate(date)} />
);
