import { CONTENT_TAG_LABELS, CONTENT_TYPES } from "@/app/features/content/config";
import { type CustomFeedCardProps, FeedCardShell } from "@/app/features/home-page/feed/feed-card-shell";
import { Card } from "@/app/features/ui/card";
import { Tag } from "@/app/features/ui/tag";
import Logo from "./logo.svg";

const CLIENT = "WILD";

const PlaceholderOneCard = ({ href, tags, accent }: CustomFeedCardProps) => (
  <FeedCardShell href={href} accent={accent} className="h-288 gap-16">
    {/* The only child in flow, so `mt-auto` drops it into the card's bottom corner. */}
    <Card.Tags align="end" className="mt-auto">
      <Tag shape="rounded">{CONTENT_TYPES.project.label}</Tag>
      {tags.map((tag) => (
        <Tag key={tag}>{CONTENT_TAG_LABELS[tag]}</Tag>
      ))}
    </Card.Tags>
    {/* Deeper bottom inset than the shell's own, so the logo centres above the tag row. */}
    <Card.CustomBody cardSpacing className="flex flex-col items-center justify-center gap-16 pb-48">
      <p className="body-4 text-center">A fun project for</p>
      <Logo role="img" aria-label={CLIENT} className="h-auto w-full max-w-237 rotate-2" />
    </Card.CustomBody>
  </FeedCardShell>
);

export default PlaceholderOneCard;
