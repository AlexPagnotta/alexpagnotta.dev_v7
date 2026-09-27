import { CONTENT_TAG_LABELS, CONTENT_TYPES } from "@/app/features/content/config";
import { type CustomFeedCardProps, FeedCardShell } from "@/app/features/home-page/feed/feed-card-shell";
import { cx } from "@/app/features/style/cva";
import { Card } from "@/app/features/ui/card";
import { Image } from "@/app/features/ui/image";
import { Tag } from "@/app/features/ui/tag";
import nokiaOff from "./nokia-off.png";
import nokiaOn from "./nokia-on.png";

const nokiaStyles = cx(
  "absolute -bottom-70 left-12 h-auto w-124 rotate-21 xl:left-0",
  "transition-[opacity,rotate,scale] duration-200",
  "motion-safe:group-hover:rotate-17 motion-safe:group-hover:scale-105",
  "motion-safe:group-focus-visible:rotate-17 motion-safe:group-focus-visible:scale-105"
);

const OverheardCard = ({ href, tags, accent }: CustomFeedCardProps) => (
  <FeedCardShell href={href} accent={accent} className="group h-255 gap-16 overflow-hidden pt-40">
    <h3 className="body-4 w-full text-right">
      A funky website for
      <br />
      <em>Overheard</em>
    </h3>
    <Card.Tags align="end" className="relative z-10 mt-auto">
      <Tag shape="rounded">{CONTENT_TYPES.project.label}</Tag>
      {tags.map((tag) => (
        <Tag key={tag}>{CONTENT_TAG_LABELS[tag]}</Tag>
      ))}
    </Card.Tags>
    <Image src={nokiaOff} alt="" sizes="124px" placeholder="empty" className={nokiaStyles} />
    {/* Stacked on the switched-off phone, so hovering the card lights the screen. */}
    <Image
      src={nokiaOn}
      alt=""
      sizes="124px"
      placeholder="empty"
      className={cx(nokiaStyles, "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")}
    />
  </FeedCardShell>
);

export default OverheardCard;
