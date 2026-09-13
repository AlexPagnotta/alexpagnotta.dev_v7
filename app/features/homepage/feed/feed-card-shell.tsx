import { cx } from "@/app/features/style/utils";
import { Card, type CardProps } from "@/app/features/ui/card";
import { BaseLink } from "@/app/features/ui/link";

const feedCardShellStyles = [
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
  // Defaulting the accent to the card's own fill makes the wash a no-op for an entry
  // without one, so the hover rule needs no condition.
  "[--card-accent:var(--color-white)] transition-colors",
  "hover:bg-(--card-accent) focus-visible:bg-(--card-accent)",
];

export type FeedCardShellProps = CardProps & {
  href: string;
  /** Hex from the entry's frontmatter; washes the card on hover. */
  accent?: string;
};

/** The link, focus ring and accent wash every feed card shares, whatever it holds. */
export const FeedCardShell = ({ href, accent, className, children, ...props }: FeedCardShellProps) => (
  <Card
    render={<BaseLink href={href} />}
    className={cx(feedCardShellStyles, className)}
    // The one value that cannot be a utility class: it comes from content, not the theme.
    style={accent ? ({ "--card-accent": accent } as React.CSSProperties) : undefined}
    {...props}
  >
    {children}
  </Card>
);
