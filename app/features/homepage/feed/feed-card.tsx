import type { StaticImageData } from "next/image";
import { CONTENT_TAG_LABELS, CONTENT_TYPES, type ContentTag, type ContentType } from "@/app/features/content/config";
import { FeedCardShell } from "@/app/features/homepage/feed/feed-card-shell";
import { Card } from "@/app/features/ui/card";
import { Tag } from "@/app/features/ui/tag";

// Three columns at `lg`, two from `md`, one below — see FeedList.
const CARD_SIZES = "(min-width: 64rem) 379px, (min-width: 48rem) 50vw, 100vw";

export type FeedCardProps = {
  type: ContentType;
  href: string;
  title: string;
  tags: readonly ContentTag[];
  cover?: StaticImageData;
  accent?: string;
  /** Skips lazy loading and preloads the cover, for the cards that land above the fold. */
  priority?: boolean;
};

export const FeedCard = ({ type, href, title, tags, cover, accent, priority }: FeedCardProps) => (
  <FeedCardShell href={href} accent={accent}>
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
  </FeedCardShell>
);
