"use client";

import { AnimatePresence, domAnimation, LazyMotion, MotionConfig, m, type Transition } from "motion/react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { CardCursorProvider } from "@/app/features/home-page/feed/card-cursor";
import {
  DEFAULT_FEED_FILTER,
  FEED_FILTER_PARAM,
  FEED_FILTERS,
  type FeedFacet,
  type FeedFilterValue,
  feedFilterFromParam,
  feedFilterHref,
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
  "animation-delay-420",
] as const;

// Matches `--ease-intro`, so the cards settle like the hero does.
const cardRevealTransition: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

// Cards that come into view together land left to right.
const COLUMN_DELAY = 0.06;

const gridExit = { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } } as const;

const singleColumnStyles = "max-md:mx-auto max-md:w-full max-md:max-w-400";

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

const FeedListCard = ({ item, column = 0, className }: FeedListCardProps) => {
  const [revealed, setRevealed] = React.useState(false);

  return (
    <m.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Any sliver counts, or a row that only peeks over the fold stays blank until the page scrolls.
      viewport={{ once: true, amount: "some" }}
      transition={{ ...cardRevealTransition, delay: column * COLUMN_DELAY }}
      onAnimationComplete={() => setRevealed(true)}
      // `CardCursorProvider` holds a touch hover back until this is set.
      data-revealed={revealed || undefined}
      className={className}
    >
      {item.node}
    </m.li>
  );
};

// Pushed rather than replaced, so Back steps through the filters before leaving the page.
const pushFilter = (filter: FeedFilterValue) => {
  const href = feedFilterHref(filter);
  // Re-selecting the active tab would otherwise leave a duplicate entry for Back to step through.
  if (href !== window.location.pathname + window.location.search) window.history.pushState(null, "", href);
};

const scrollToTabs = (tabs: HTMLElement | null) => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  tabs?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
};

type FeedViewProps = FeedListProps & {
  filter: FeedFilterValue;
  tabsRef?: React.Ref<HTMLDivElement>;
};

const FeedView = ({ items, filter, tabsRef }: FeedViewProps) => {
  const isClient = useIsClient();
  const columnCount = useColumnCount();
  const visibleItems = items.filter((item) => matchesFeedFilter(item.facets, filter));

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Under reduced motion, drops the travel of every motion animation inside and keeps the fades. */}
      <MotionConfig reducedMotion="user">
        <Tabs
          ref={tabsRef}
          aria-label="Filter by"
          value={filter}
          onValueChange={(value) => pushFilter(value as FeedFilterValue)}
          className="scroll-mt-48 max-lg:-mx-(--page-side-spacing) max-lg:px-(--page-side-spacing) md:justify-center-safe"
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
              <m.div key={filter} exit={gridExit} className={cx("flex items-start gap-24", singleColumnStyles)}>
                {toColumns(visibleItems, columnCount).map((column, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: a column has no identity beyond its position.
                  <ul key={index} className="flex min-w-0 flex-1 flex-col gap-24">
                    {column.map((item) => (
                      <FeedListCard key={item.key} item={item} column={index} />
                    ))}
                  </ul>
                ))}
              </m.div>
            </AnimatePresence>
          ) : (
            // The column count is only known once mounted, so until then the browser balances the columns.
            // Every card is still hidden before its reveal, so the switch never shows.
            <ul className={cx("gap-x-24 md:columns-2 lg:columns-3 xl:columns-4", singleColumnStyles)}>
              {visibleItems.map((item) => (
                <FeedListCard key={item.key} item={item} className="mb-24 break-inside-avoid" />
              ))}
            </ul>
          )}
        </CardCursorProvider>
      </MotionConfig>
    </LazyMotion>
  );
};

const FeedViewFromUrl = ({ items }: FeedListProps) => {
  const param = useSearchParams().get(FEED_FILTER_PARAM);
  const filter = feedFilterFromParam(param);
  const tabsRef = React.useRef<HTMLDivElement>(null);

  const lastFilter = React.useRef<FeedFilterValue>(DEFAULT_FEED_FILTER);

  // Any change of filter, from a tab, a link or a page landing on one, brings the tabs to the top.
  React.useEffect(() => {
    if (filter === lastFilter.current) return;
    lastFilter.current = filter;
    scrollToTabs(tabsRef.current);
  }, [filter]);

  // A link to the filter already showing changes nothing, so it would never reach the effect above.
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest("a");
      if (!link) return;
      const url = new URL(link.href);
      const isCurrentFilter = url.pathname === window.location.pathname && url.search === window.location.search;
      if (isCurrentFilter && url.searchParams.has(FEED_FILTER_PARAM)) scrollToTabs(tabsRef.current);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  React.useEffect(() => {
    if (param !== null && filter === DEFAULT_FEED_FILTER) {
      window.history.replaceState(null, "", feedFilterHref(DEFAULT_FEED_FILTER));
    }
  }, [param, filter]);

  return <FeedView items={items} filter={filter} tabsRef={tabsRef} />;
};

// The URL is only known in the browser, so the prerendered HTML is the unfiltered feed.
export const FeedList = ({ items }: FeedListProps) => (
  <React.Suspense fallback={<FeedView items={items} filter={DEFAULT_FEED_FILTER} />}>
    <FeedViewFromUrl items={items} />
  </React.Suspense>
);
