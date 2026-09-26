import type { ContentTag } from "@/app/features/content/config";
import { type Accent, lightAccent } from "@/app/features/style/accents";
import { cx } from "@/app/features/style/cva";
import { Card, type CardProps } from "@/app/features/ui/card";
import { BaseLink } from "@/app/features/ui/link";

const feedCardShellStyles = cx(
  "cursor-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
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
  // `data-card-cursor` hands the pointer to the pill in `CardCursorProvider`.
  <Card
    render={<BaseLink href={href} />}
    data-card-cursor
    data-fill={lightAccent(accent)}
    className={cx(feedCardShellStyles, className)}
    {...props}
  >
    {children}
  </Card>
);

/**
 * What an entry's own `card.tsx` receives: the values that have to stay in step with its
 * frontmatter. Everything else about the card — copy, art, layout — is authored by hand.
 */
export type CustomFeedCardProps = {
  href: string;
  tags: readonly ContentTag[];
  accent?: Accent;
};
