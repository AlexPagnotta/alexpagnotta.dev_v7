"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import * as React from "react";
import { CardCursorProvider } from "@/app/features/home-page/feed/card-cursor/card-cursor-provider";
import {
  DEFAULT_FEED_FILTER,
  type FeedFilterValue,
  type FeedListItem,
  matchesFeedFilter,
} from "@/app/features/home-page/feed/filters";
import { FeedFilterTabs } from "@/app/features/home-page/feed/list/feed-filter-tabs";
import { FeedGrid } from "@/app/features/home-page/feed/list/feed-grid";
import { useFeedFilter } from "@/app/features/home-page/feed/list/use-feed-filter";

export type FeedListProps = {
  items: FeedListItem[];
};

type FeedViewProps = FeedListProps & {
  filter: FeedFilterValue;
  tabsRef?: React.Ref<HTMLDivElement>;
};

const FeedView = ({ items, filter, tabsRef }: FeedViewProps) => {
  const visibleItems = items.filter((item) => matchesFeedFilter(item.facets, filter));

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Under reduced motion, drops the travel of every motion animation inside and keeps the fades. */}
      <MotionConfig reducedMotion="user">
        <FeedFilterTabs filter={filter} tabsRef={tabsRef} />
        <output className="sr-only">
          {`Showing ${visibleItems.length} ${visibleItems.length === 1 ? "entry" : "entries"}`}
        </output>
        <CardCursorProvider>
          <FeedGrid items={visibleItems} filter={filter} />
        </CardCursorProvider>
      </MotionConfig>
    </LazyMotion>
  );
};

const FeedViewFromUrl = ({ items }: FeedListProps) => {
  const { filter, tabsRef } = useFeedFilter();
  return <FeedView items={items} filter={filter} tabsRef={tabsRef} />;
};

// The URL is only known in the browser, so the prerendered HTML is the unfiltered feed.
export const FeedList = ({ items }: FeedListProps) => (
  <React.Suspense fallback={<FeedView items={items} filter={DEFAULT_FEED_FILTER} />}>
    <FeedViewFromUrl items={items} />
  </React.Suspense>
);
