import { CONTENT_TAG_LABELS, CONTENT_TYPES } from "@/app/features/content/config";
import { type CustomFeedCardProps, FeedCardShell } from "@/app/features/home-page/feed/feed-card-shell";
import { cx } from "@/app/features/style/cva";
import { Card } from "@/app/features/ui/card";
import { Image } from "@/app/features/ui/image";
import { Tag } from "@/app/features/ui/tag";
import logo from "./logo.svg?url";

const logoStyles = cx(
  "w-191 transition-[rotate,scale] duration-300 ease-pop",
  "motion-safe:group-engaged:-rotate-3 motion-safe:group-engaged:scale-108"
);

const DuolingoCard = ({ href, tags, accent }: CustomFeedCardProps) => (
  <FeedCardShell href={href} accent={accent} className="group h-288 gap-16">
    {/* The only child in flow, so `mt-auto` drops it into the card's bottom corner. */}
    <Card.Tags align="end" className="mt-auto">
      <Tag shape="rounded">{CONTENT_TYPES.project.label}</Tag>
      {tags.map((tag) => (
        <Tag key={tag}>{CONTENT_TAG_LABELS[tag]}</Tag>
      ))}
    </Card.Tags>
    {/* Deeper bottom inset than the shell's own, so the logo centres above the tag row. */}
    <Card.CustomBody cardSpacing className="flex items-center justify-center pb-48">
      <h3 className="body-4 flex flex-col items-center gap-16 text-center">
        <span>A fun project for</span>
        <Image src={logo} alt="Duolingo" className={logoStyles} />
      </h3>
    </Card.CustomBody>
  </FeedCardShell>
);

export default DuolingoCard;
