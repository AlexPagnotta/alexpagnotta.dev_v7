import { EntryTags } from "@/app/features/content/entry-tags";
import type { ContentTag } from "@/app/features/content/tags";
import { FeedCardShell } from "@/app/features/home-page/feed/cards/feed-card-shell";
import type { Accent } from "@/app/features/style/accents";
import { Card } from "@/app/features/ui/card";
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
        <EntryTags type="thought" tags={tags} />
      </Card.Tags>
    </Card.Header>
    <QuoteMark aria-hidden="true" className="absolute right-36 -bottom-13 -z-1 h-59 w-66 text-gray-200" />
  </FeedCardShell>
);
