import { EntryTags } from "@/app/features/content/entry-tags";
import { type CustomFeedCardProps, FeedCardShell } from "@/app/features/home-page/feed/cards/feed-card-shell";
import { cx } from "@/app/features/style/cva";
import { Card } from "@/app/features/ui/card";
import { Image } from "@/app/features/ui/image";
import kindle from "./kindle.png";

const kindleStyles = cx(
  "absolute z-10 -right-72 -bottom-64 h-auto w-290 -rotate-10",
  "transition-[rotate,scale] duration-200 pointer-coarse:duration-400",
  "motion-safe:group-engaged:-rotate-6 motion-safe:group-engaged:scale-105"
);

const KindleDashCard = ({ type, href, tags, accent }: CustomFeedCardProps) => (
  <FeedCardShell href={href} accent={accent} className="group h-255 gap-12 overflow-hidden pt-32">
    <Card.Tags>
      <EntryTags type={type} tags={tags} />
    </Card.Tags>
    <h3 className="body-4">Kindle Dash</h3>
    <Image src={kindle} alt="" sizes="290px" placeholder="empty" className={kindleStyles} />
  </FeedCardShell>
);

export default KindleDashCard;
