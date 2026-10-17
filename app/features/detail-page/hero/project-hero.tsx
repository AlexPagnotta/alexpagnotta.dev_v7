import { ExternalLink } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { ContentTag } from "@/app/features/content/tags";
import { DetailPageHero } from "@/app/features/detail-page/hero/detail-page-hero";
import type { Accent } from "@/app/features/style/accents";
import { ButtonLink } from "@/app/features/ui/button";

const CTA_LABEL = "Visit the site";
const NEW_TAB_HINT = "(opens in a new tab)";

export type ProjectHeroProps = {
  title: string;
  tags: readonly ContentTag[];
  date: Date;
  client?: string;
  link?: string;
  cover?: StaticImageData;
  accent?: Accent;
};

export const ProjectHero = ({ title, tags, date, client, link, cover, accent }: ProjectHeroProps) => (
  <DetailPageHero
    type="project"
    title={title}
    tags={tags}
    cover={cover}
    accent={accent}
    // "x WILD - 2024"; the year comes off the date already in frontmatter, so only the client is authored.
    meta={[client && `x ${client}`, date.getUTCFullYear()].filter(Boolean).join(" - ")}
    cta={
      link && (
        // A label this size would swamp the row on a phone, so below `lg` it shrinks to the icon alone.
        <ButtonLink
          href={link}
          target="_blank"
          rel="noreferrer"
          color="yellow-dark"
          size="icon-md"
          className="animate-intro-appear intro-delay-action lg:rotate-4"
        >
          <ExternalLink aria-hidden="true" className="size-16 lg:hidden" />
          <span className="max-lg:sr-only">{CTA_LABEL}</span>
          <span className="sr-only"> {NEW_TAB_HINT}</span>
        </ButtonLink>
      )
    }
  />
);
