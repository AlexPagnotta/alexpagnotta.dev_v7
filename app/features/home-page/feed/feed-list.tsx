"use client";

import { AnimatePresence, MotionConfig, motion, type Transition } from "motion/react";
import * as React from "react";
import { CardCursorProvider } from "@/app/features/home-page/feed/card-cursor";
import {
  DEFAULT_FEED_FILTER,
  FEED_FILTERS,
  type FeedFacet,
  type FeedFilterValue,
  matchesFeedFilter,
} from "@/app/features/home-page/feed/filters";
import { cx } from "@/app/features/style/cva";
import { Tab, Tabs } from "@/app/features/ui/tabs";
import { useBreakpoint } from "@/app/features/utils/use-breakpoint";
import { useIsClient } from "@/app/features/utils/use-is-client";

// Spelled out so Tailwind generates each one; the row picks up right after the hero copy.
const FILTER_DELAYS = [
  "animation-delay-180",
  "animation-delay-220",
  "animation-delay-260",
  "animation-delay-300",
  "animation-delay-340",
  "animation-delay-380",
] as const;

// Matches `--ease-intro`, so the cards settle like the hero does.
const cardRevealTransition: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

// Cards that come into view together land left to right.
const COLUMN_DELAY = 0.06;

const gridExit = { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } } as const;

export type FeedListItem = {
  key: string;
  facets: readonly FeedFacet[];
  node: React.ReactNode;
};

export type FeedListProps = {
  items: FeedListItem[];
};

const useColumnCount = () => {
  const md = useBreakpoint("md");
  const lg = useBreakpoint("lg");
  const xl = useBreakpoint("xl");
  return xl ? 4 : lg ? 3 : md ? 2 : 1;
};

// Dealt out left to right, so every column gets a card before any gets a second and none is left empty.
const toColumns = <T,>(items: T[], count: number) =>
  Array.from({ length: count }, (_, column) => items.filter((_, index) => index % count === column));

type FeedListCardProps = { item: FeedListItem; column?: number; className?: string };

const FeedListCard = ({ item, column = 0, className }: FeedListCardProps) => (
  <motion.li
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ ...cardRevealTransition, delay: column * COLUMN_DELAY }}
    className={className}
  >
    {item.node}
  </motion.li>
);

export const FeedList = ({ items }: FeedListProps) => {
  const [filter, setFilter] = React.useState<FeedFilterValue>(DEFAULT_FEED_FILTER);
  const isClient = useIsClient();
  const columnCount = useColumnCount();
  const visibleItems = items.filter((item) => matchesFeedFilter(item.facets, filter));

  return (
    // Under reduced motion, drops the travel of every motion animation inside and keeps the fades.
    <MotionConfig reducedMotion="user">
      <Tabs
        aria-label="Filter by"
        value={filter}
        onValueChange={(value) => setFilter(value as FeedFilterValue)}
        className="max-lg:-mx-(--page-side-spacing) max-lg:px-(--page-side-spacing) md:justify-center-safe"
      >
        {FEED_FILTERS.map(({ value, label, shape }, index) => (
          <Tab key={value} value={value} shape={shape} className={cx("animate-intro-fade", FILTER_DELAYS[index])}>
            {label}
          </Tab>
        ))}
      </Tabs>
      <output className="sr-only">
        {`Showing ${visibleItems.length} ${visibleItems.length === 1 ? "entry" : "entries"}`}
      </output>
      <CardCursorProvider>
        {isClient ? (
          // Filtering moves the cards between columns anyway, so the grid leaves as one and the new set reveals.
          <AnimatePresence mode="wait">
            <motion.div key={filter} exit={gridExit} className="flex items-start gap-24">
              {toColumns(visibleItems, columnCount).map((column, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: a column has no identity beyond its position.
                <ul key={index} className="flex min-w-0 flex-1 flex-col gap-24">
                  {column.map((item) => (
                    <FeedListCard key={item.key} item={item} column={index} />
                  ))}
                </ul>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          // The column count is only known once mounted, so until then the browser balances the columns.
          // Every card is still hidden before its reveal, so the switch never shows.
          <ul className="gap-x-24 md:columns-2 lg:columns-3 xl:columns-4">
            {visibleItems.map((item) => (
              <FeedListCard key={item.key} item={item} className="mb-24 break-inside-avoid" />
            ))}
          </ul>
        )}
      </CardCursorProvider>
    </MotionConfig>
  );
};
