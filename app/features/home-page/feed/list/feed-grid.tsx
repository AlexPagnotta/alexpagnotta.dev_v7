import { AnimatePresence, m } from "motion/react";
import type { FeedFilterValue, FeedListItem } from "@/app/features/home-page/feed/filters";
import { FeedListCard } from "@/app/features/home-page/feed/list/feed-list-card";
import { cx } from "@/app/features/style/cva";
import { useBreakpoint } from "@/app/features/utils/use-breakpoint";
import { useIsClient } from "@/app/features/utils/use-is-client";

const gridExit = { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } } as const;

const singleColumnStyles = "max-md:mx-auto max-md:w-full max-md:max-w-400";

const useColumnCount = () => {
  const md = useBreakpoint("md");
  const lg = useBreakpoint("lg");
  const xl = useBreakpoint("xl");
  return xl ? 4 : lg ? 3 : md ? 2 : 1;
};

// Dealt out left to right, so every column gets a card before any gets a second and none is left empty.
const toColumns = <T,>(items: T[], count: number) =>
  Array.from({ length: count }, (_, column) => items.filter((_, index) => index % count === column));

type Props = { items: FeedListItem[]; filter: FeedFilterValue };

export const FeedGrid = ({ items, filter }: Props) => {
  const isClient = useIsClient();
  const columnCount = useColumnCount();

  // The column count is only known once mounted, so until then the browser balances the columns.
  // Every card is still hidden before its reveal, so the switch never shows.
  if (!isClient) {
    return (
      <ul className={cx("gap-x-24 md:columns-2 lg:columns-3 xl:columns-4", singleColumnStyles)}>
        {items.map((item) => (
          <FeedListCard key={item.key} item={item} className="mb-24 break-inside-avoid" />
        ))}
      </ul>
    );
  }

  return (
    // Filtering moves the cards between columns anyway, so the grid leaves as one and the new set reveals.
    <AnimatePresence mode="wait">
      <m.div key={filter} exit={gridExit} className={cx("flex items-start gap-24", singleColumnStyles)}>
        {toColumns(items, columnCount).map((column, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: a column has no identity beyond its position.
          <ul key={index} className="flex min-w-0 flex-1 flex-col gap-24">
            {column.map((item) => (
              <FeedListCard key={item.key} item={item} column={index} />
            ))}
          </ul>
        ))}
      </m.div>
    </AnimatePresence>
  );
};
