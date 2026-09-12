import type { StaticImageData } from "next/image";
import { CONTENT_TAG_LABELS, CONTENT_TYPES, type ContentTag, type ContentType } from "@/app/features/content/config";
import { cx } from "@/app/features/style/utils";
import { ButtonLink } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";
import { Image } from "@/app/features/ui/image";
import { Tag } from "@/app/features/ui/tag";

// The header holds the design's content column, so the cover never renders wider than that.
const COVER_SIZES = "(min-width: 64rem) 960px, 100vw";

export type DetailPageHeroProps = {
  type: ContentType;
  title: string;
  tags: readonly ContentTag[];
  /** One short line, set on its side in the desktop margin: a date, or a client and year. */
  meta: string;
  cover?: StaticImageData;
  /** Hex from the page's frontmatter; fills the whole header. */
  accent?: string;
  /** Sits opposite the tags, straddling the header's bottom border. */
  cta?: React.ReactNode;
};

/** The header both detail pages open with; only the meta line and the call to action differ. */
export const DetailPageHero = ({ type, title, tags, meta, cover, accent, cta }: DetailPageHeroProps) => (
  <section
    className="relative border-b-2 border-black bg-(--hero-accent) py-72 [--hero-accent:var(--color-grey-1)] lg:pt-120 lg:pb-96"
    // The one value that cannot be a utility class: it comes from content, not the theme.
    style={accent ? ({ "--hero-accent": accent } as React.CSSProperties) : undefined}
  >
    <Container size="md" className="relative flex flex-col gap-32 px-(--page-side-spacing) lg:gap-48">
      <div className="relative flex items-start">
        {cover && (
          <figure className="w-full">
            {/* Landscape frame rather than the cover's own ratio, so a tall cover cannot own the page. */}
            {/*
              The ratio sits on the image itself: a percentage height against a parent sized only
              by `aspect-ratio` is what left the frame empty until a resize forced a second layout.
              Always the page's topmost image too, so it preloads rather than lazy-loads.
            */}
            <Image
              src={cover}
              alt=""
              sizes={COVER_SIZES}
              priority
              placeholder="empty"
              className="aspect-[4/3] w-full border-2 border-black bg-grey-2 object-cover lg:aspect-[8/5]"
            />
          </figure>
        )}
        {/* Hooked over the cover's top-left corner; without a cover it just opens the column. */}
        <ButtonLink href="/" className={cx("-rotate-4", cover && "absolute -top-26 -left-8 lg:-top-22 lg:-left-18")}>
          ← BACK
        </ButtonLink>
      </div>

      <div className="flex flex-col gap-8">
        {/*
          Set on its side in the column's left margin from `xl`, where the margin is finally
          wide enough to hold it; above the title at every narrower width.
        */}
        <p className="body-4 xl:absolute xl:top-1/2 xl:right-full xl:mr-24 xl:-translate-y-1/2 xl:rotate-180 xl:[writing-mode:vertical-rl]">
          {meta}
        </p>
        <h1 className="headline-3 text-balance">{title}</h1>
      </div>
    </Container>

    {/* Straddles the header's bottom border, the way the wordmark straddles the navbar's. */}
    <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
      <Container size="md" className="flex items-center justify-between gap-16 px-(--page-side-spacing)">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* The design leads with the content type, squared off against the pill tags. */}
          <Tag shape="rounded" size="md">
            {CONTENT_TYPES[type].label}
          </Tag>
          {tags.map((tag) => (
            <Tag key={tag} size="md">
              {CONTENT_TAG_LABELS[tag]}
            </Tag>
          ))}
        </div>
        {cta}
      </Container>
    </div>
  </section>
);
