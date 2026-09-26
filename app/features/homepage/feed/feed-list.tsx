"use client";

import * as React from "react";
import {
  DEFAULT_FEED_FILTER,
  FEED_FILTERS,
  type FeedFacet,
  type FeedFilterValue,
  matchesFeedFilter,
} from "@/app/features/homepage/feed/filters";
import { cx } from "@/app/features/style/utils";
import { Tab, Tabs } from "@/app/features/ui/tabs";

// Spelled out so Tailwind generates each one; the row picks up right after the hero copy.
const FILTER_DELAYS = [
  "animation-delay-180",
  "animation-delay-220",
  "animation-delay-260",
  "animation-delay-300",
  "animation-delay-340",
  "animation-delay-380",
] as const;

export type FeedListItem = {
  key: string;
  facets: readonly FeedFacet[];
  node: React.ReactNode;
};

export type FeedListProps = {
  items: FeedListItem[];
};

export const FeedList = ({ items }: FeedListProps) => {
  const [filter, setFilter] = React.useState<FeedFilterValue>(DEFAULT_FEED_FILTER);

  return (
    <>
      <Tabs
        aria-label="Filter by"
        value={filter}
        onValueChange={(value) => setFilter(value as FeedFilterValue)}
        className="max-lg:-mx-(--page-side-spacing) max-lg:px-(--page-side-spacing) lg:justify-center-safe"
      >
        {FEED_FILTERS.map(({ value, label, shape }, index) => (
          <Tab key={value} value={value} shape={shape} className={cx("animate-intro-fade", FILTER_DELAYS[index])}>
            {label}
          </Tab>
        ))}
      </Tabs>
      {/* Masonry by multi-column: the browser balances the columns, so cards of different
          heights stack without gaps. Reading order runs down a column, then to the next. */}
      <ul className="gap-x-24 md:columns-2 lg:columns-3 xl:columns-4">
        {items.map((item) => (
          <li key={item.key} hidden={!matchesFeedFilter(item.facets, filter)} className="mb-24 break-inside-avoid">
            {item.node}
          </li>
        ))}
      </ul>
    </>
  );
};
