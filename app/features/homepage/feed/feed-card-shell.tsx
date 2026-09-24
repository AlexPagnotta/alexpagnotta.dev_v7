import { CardCursor } from "@/app/features/homepage/feed/card-cursor";
import { type Accent, lightAccent } from "@/app/features/style/accents";
import { cx } from "@/app/features/style/utils";
import { Card, type CardProps } from "@/app/features/ui/card";
import { BaseLink } from "@/app/features/ui/link";

const feedCardShellStyles = cx(
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
  // Lets the pill overflow onto the neighbouring cards, while staying under the navbar's z-10.
  "hover:z-1"
);

export type FeedCardShellProps = CardProps & {
  href: string;
  /** Named in the entry's frontmatter; fills the pill that follows the pointer. */
  accent?: Accent;
};

/** The link, focus ring and hover cursor every feed card shares, whatever it holds. */
export const FeedCardShell = ({ href, accent, className, children, ...props }: FeedCardShellProps) => (
  <Card render={<BaseLink href={href} />} className={cx(feedCardShellStyles, className)} {...props}>
    {children}
    <CardCursor fill={lightAccent(accent)} />
  </Card>
);
