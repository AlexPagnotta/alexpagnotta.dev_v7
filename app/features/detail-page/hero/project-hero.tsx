import { ExternalLink } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { ContentTag } from "@/app/features/content/config";
import { DetailPageHero } from "@/app/features/detail-page/hero/hero";
import { ButtonLink } from "@/app/features/ui/button";

const CTA_LABEL = "Visit the site";

export type ProjectHeroProps = {
  title: string;
  tags: readonly ContentTag[];
  date: Date;
  client?: string;
  link?: string;
  cover?: StaticImageData;
  accent?: string;
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
        <>
          {/* A label this size would swamp the row on a phone, so it shrinks to the icon alone. */}
          <ButtonLink
            href={link}
            target="_blank"
            rel="noreferrer"
            color="yellow-1"
            size="icon-md"
            aria-label={CTA_LABEL}
            className="lg:hidden"
          >
            <ExternalLink aria-hidden="true" className="size-16" />
          </ButtonLink>
          <ButtonLink
            href={link}
            target="_blank"
            rel="noreferrer"
            color="yellow-1"
            size="lg"
            className="hidden rotate-4 lg:inline-flex"
          >
            {CTA_LABEL}
          </ButtonLink>
        </>
      )
    }
  />
);
