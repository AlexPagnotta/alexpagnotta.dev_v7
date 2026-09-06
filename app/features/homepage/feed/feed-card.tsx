import type { StaticImageData } from "next/image";
import { CONTENT_TAG_LABELS, CONTENT_TYPES, type ContentTag, type ContentType } from "@/app/features/content/config";
import { cx } from "@/app/features/style/utils";
import { Card } from "@/app/features/ui/card";
import { BaseLink } from "@/app/features/ui/link";
import { Tag } from "@/app/features/ui/tag";

// Three columns at `lg`, two from `md`, one below — see FeedList.
const CARD_SIZES = "(min-width: 64rem) 379px, (min-width: 48rem) 50vw, 100vw";

const feedCardStyles = [
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
  // Defaulting the accent to the card's own fill makes the wash a no-op for an entry
  // without one, so the hover rule needs no condition.
  "[--card-accent:var(--color-white)] transition-colors",
  "hover:bg-(--card-accent) focus-visible:bg-(--card-accent)",
];

export type FeedCardProps = {
  type: ContentType;
  href: string;
  title: string;
  tags: readonly ContentTag[];
  cover?: StaticImageData;
  /** Hex from the entry's frontmatter; washes the card on hover. */
  accent?: string;
  /** Skips lazy loading and preloads the cover, for the cards that land above the fold. */
  priority?: boolean;
};

export const FeedCard = ({ type, href, title, tags, cover, accent, priority }: FeedCardProps) => (
  <Card
    render={<BaseLink href={href} />}
    className={cx(feedCardStyles)}
    // The one value that cannot be a utility class: it comes from content, not the theme.
    style={accent ? ({ "--card-accent": accent } as React.CSSProperties) : undefined}
  >
    {/* The title carries the link, so the cover is decorative. */}
    {cover && <Card.Image src={cover} alt="" sizes={CARD_SIZES} priority={priority} />}
    <Card.Header>
      <Card.Tags>
        {/* The design leads with the content type, squared off against the pill tags. */}
        <Tag shape="rounded">{CONTENT_TYPES[type].label}</Tag>
        {tags.map((tag) => (
          <Tag key={tag}>{CONTENT_TAG_LABELS[tag]}</Tag>
        ))}
      </Card.Tags>
      <Card.Title className="body-4">{title}</Card.Title>
    </Card.Header>
  </Card>
);
