import { CONTENT_TAG_LABELS, CONTENT_TYPES, type ContentTag } from "@/app/features/content/config";
import { FeedCardShell } from "@/app/features/home-page/feed/feed-card-shell";
import type { Accent } from "@/app/features/style/accents";
import { Card } from "@/app/features/ui/card";
import { Tag } from "@/app/features/ui/tag";
import QuoteMark from "./quote-mark.svg";

export type ThoughtCardProps = {
  href: string;
  title: string;
  tags: readonly ContentTag[];
  accent?: Accent;
};

export const ThoughtCard = ({ href, title, tags, accent }: ThoughtCardProps) => (
  <FeedCardShell href={href} accent={accent} className="overflow-hidden p-24">
    <Card.Header className="gap-24">
      {/* biome-ignore lint/a11y/useHeadingContent: the rule cannot see the title Card.Title renders into it. */}
      <Card.Title render={<h3 />} className="body-1">
        “{title}”
      </Card.Title>
      <Card.Tags>
        <Tag shape="rounded">{CONTENT_TYPES.thought.label}</Tag>
        {tags.map((tag) => (
          <Tag key={tag}>{CONTENT_TAG_LABELS[tag]}</Tag>
        ))}
      </Card.Tags>
    </Card.Header>
    {/* Cropped by the card's bottom edge, as in the design. */}
    <QuoteMark aria-hidden="true" className="absolute right-36 -bottom-13 -z-1 h-59 w-66 text-gray-200" />
  </FeedCardShell>
);
