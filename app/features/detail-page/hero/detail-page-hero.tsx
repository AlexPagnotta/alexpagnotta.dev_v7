import type { StaticImageData } from "next/image";
import type * as React from "react";
import type { ContentType } from "@/app/features/content/config";
import { EntryTags } from "@/app/features/content/entry-tags";
import type { ContentTag } from "@/app/features/content/tags";
import { BackButton } from "@/app/features/detail-page/hero/back-button";
import { type Accent, darkAccent } from "@/app/features/style/accents";
import { cssVars } from "@/app/features/style/css-vars";
import { cx } from "@/app/features/style/cva";
import { Container } from "@/app/features/ui/container";
import { Image } from "@/app/features/ui/image";

// The header holds the design's content column, so the cover never renders wider than that.
const COVER_SIZES = "(min-width: 64rem) 960px, 100vw";

export type DetailPageHeroProps = {
  type: ContentType;
  title: string;
  tags: readonly ContentTag[];
  /** One short line, set on its side in the desktop margin: a date, or a client and year. */
  meta: string;
  cover?: StaticImageData;
  /** Named in the page's frontmatter; fills the whole header with its dark cut, and the footer with it. */
  accent?: Accent;
  /** Sits opposite the tags, straddling the header's bottom border. */
  cta?: React.ReactNode;
};

/** The header every detail page opens with; only the meta line and the call to action differ. */
export const DetailPageHero = ({ type, title, tags, meta, cover, accent, cta }: DetailPageHeroProps) => (
  <section
    data-page-accent={accent}
    className="relative border-b-2 border-black bg-(--hero-accent) py-64 [--hero-accent:var(--color-gray-100)] lg:pt-96 lg:pb-80"
    style={accent ? cssVars({ "--hero-accent": darkAccent(accent) }) : undefined}
  >
    <Container size="md" className="relative flex flex-col gap-32 px-(--page-side-spacing) lg:gap-48">
      {/* The back button hangs off the cover's corner, so a page without one goes without it. */}
      {cover && (
        <div className="relative flex items-start">
          <figure className="w-full animate-intro-rise">
            {/*
              A landscape frame, so a tall cover cannot own the page; set on the image itself,
              since an `aspect-ratio` parent stayed empty until a resize.
            */}
            <Image
              src={cover}
              alt=""
              sizes={COVER_SIZES}
              preload
              fetchPriority="high"
              className="aspect-3/2 w-full border-2 border-black bg-gray-300 object-cover md:aspect-video"
            />
          </figure>
          <BackButton className="absolute -top-20 -left-8 -rotate-4 lg:-top-16 lg:-left-18" />
        </div>
      )}

      <div className="flex flex-col gap-8">
        {/* Beside a cover it turns on its side in the left margin from `xl`, the first width that fits it. */}
        <p
          className={cx(
            "body-3",
            cover &&
              "xl:absolute xl:top-1/2 xl:right-full xl:mr-24 xl:-translate-y-1/2 xl:rotate-180 xl:[writing-mode:vertical-rl]"
          )}
        >
          {meta}
        </p>
        <h1 className="heading-3 max-w-(--content-sm) text-balance">{title}</h1>
      </div>
    </Container>

    {/* Straddles the header's bottom border, the way the wordmark straddles the navbar's. */}
    <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
      <Container size="md" className="flex items-center justify-between gap-16 px-(--page-side-spacing)">
        <div className="flex items-center -space-x-1">
          <EntryTags type={type} tags={tags} size="md" />
        </div>
        {cta}
      </Container>
    </div>
  </section>
);
