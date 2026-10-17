import type { StaticImageData } from "next/image";
import type { ContentType } from "@/app/features/content/config";
import { EntryTags } from "@/app/features/content/entry-tags";
import type { ContentTag } from "@/app/features/content/tags";
import { FeedCardShell } from "@/app/features/home-page/feed/cards/feed-card-shell";
import type { Accent } from "@/app/features/style/accents";
import { cx } from "@/app/features/style/cva";
import { Card } from "@/app/features/ui/card";

// Four columns at `xl`, three at `lg`, two from `md`, one below, as in `FeedGrid`.
const CARD_SIZES = "(min-width: 80rem) 290px, (min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw";

export type FeedCardProps = {
  type: ContentType;
  href: string;
  title: string;
  tags: readonly ContentTag[];
  cover?: StaticImageData;
  excerpt?: string;
  accent?: Accent;
};

export const FeedCard = ({ type, href, title, tags, cover, excerpt, accent }: FeedCardProps) => (
  <FeedCardShell href={href} accent={accent}>
    {/* Decorative, as the title carries the link. Lazy even in the first row, or React preloads it before the fonts. */}
    {cover && <Card.Image src={cover} alt="" sizes={CARD_SIZES} />}
    <Card.Header className={cx(!cover && "gap-16")}>
      <Card.Tags>
        <EntryTags type={type} tags={tags} />
      </Card.Tags>
      <div className="flex flex-col gap-12">
        {/* biome-ignore lint/a11y/useHeadingContent: the rule cannot see the title Card.Title renders into it. */}
        <Card.Title render={<h3 />} className={cover ? "body-3" : "body-4 leading-32"}>
          {title}
        </Card.Title>
        {!cover && excerpt && <p className="body-1 line-clamp-4 leading-28">{excerpt}</p>}
      </div>
    </Card.Header>
  </FeedCardShell>
);
