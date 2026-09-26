import type { StaticImageData } from "next/image";
import { CONTENT_TAG_LABELS, CONTENT_TYPES, type ContentTag, type ContentType } from "@/app/features/content/config";
import { FeedCardShell } from "@/app/features/home-page/feed/feed-card-shell";
import type { Accent } from "@/app/features/style/accents";
import { Card } from "@/app/features/ui/card";
import { Tag } from "@/app/features/ui/tag";

// Four columns at `xl`, three at `lg`, two from `md`, one below — see FeedList.
const CARD_SIZES = "(min-width: 80rem) 290px, (min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw";

export type FeedCardProps = {
  type: ContentType;
  href: string;
  title: string;
  tags: readonly ContentTag[];
  cover?: StaticImageData;
  accent?: Accent;
};

export const FeedCard = ({ type, href, title, tags, cover, accent }: FeedCardProps) => (
  <FeedCardShell href={href} accent={accent}>
    {/* The title carries the link, so the cover is decorative. */}
    {/* Lazy even in the first row: React would preload an eager one in the head, ahead of the fonts. */}
    {cover && <Card.Image src={cover} alt="" sizes={CARD_SIZES} />}
    <Card.Header>
      <Card.Tags>
        {/* The design leads with the content type, squared off against the pill tags. */}
        <Tag shape="rounded">{CONTENT_TYPES[type].label}</Tag>
        {tags.map((tag) => (
          <Tag key={tag}>{CONTENT_TAG_LABELS[tag]}</Tag>
        ))}
      </Card.Tags>
      {/* biome-ignore lint/a11y/useHeadingContent: the rule cannot see the title Card.Title renders into it. */}
      <Card.Title render={<h3 />} className="body-3">
        {title}
      </Card.Title>
    </Card.Header>
  </FeedCardShell>
);
