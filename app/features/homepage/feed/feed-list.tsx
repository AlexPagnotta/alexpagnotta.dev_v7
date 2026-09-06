"use client";

import * as React from "react";
import {
  DEFAULT_FEED_FILTER,
  FEED_FILTERS,
  type FeedFacet,
  type FeedFilterValue,
  matchesFeedFilter,
} from "@/app/features/homepage/feed/filters";
import { Tab, Tabs } from "@/app/features/ui/tabs";

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
        {FEED_FILTERS.map(({ value, label }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </Tabs>
      {/* Masonry by multi-column: the browser balances the columns, so cards of different
          heights stack without gaps. Reading order runs down a column, then to the next. */}
      <ul className="gap-x-32 md:columns-2 lg:columns-3">
        {items.map((item) => (
          <li
            key={item.key}
            hidden={!matchesFeedFilter(item.facets, filter)}
            className="mb-40 break-inside-avoid lg:mb-32"
          >
            {item.node}
          </li>
        ))}
      </ul>
    </>
  );
};
