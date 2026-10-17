import { m, type Transition } from "motion/react";
import * as React from "react";
import type { FeedListItem } from "@/app/features/home-page/feed/filters";
import { EASE_INTRO } from "@/app/features/style/easings";

const cardRevealTransition: Transition = { duration: 0.5, ease: EASE_INTRO };

// Cards that come into view together land left to right.
const COLUMN_DELAY = 0.06;

type Props = { item: FeedListItem; column?: number; className?: string };

export const FeedListCard = ({ item, column = 0, className }: Props) => {
  const [revealed, setRevealed] = React.useState(false);

  return (
    <m.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Any sliver counts, or a row that only peeks over the fold stays blank until the page scrolls.
      viewport={{ once: true, amount: "some" }}
      transition={{ ...cardRevealTransition, delay: column * COLUMN_DELAY }}
      onAnimationComplete={() => setRevealed(true)}
      // `useCentredCard` holds a touch hover back until this is set.
      data-revealed={revealed || undefined}
      className={className}
    >
      {item.node}
    </m.li>
  );
};
