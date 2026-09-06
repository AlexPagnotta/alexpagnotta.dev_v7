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
      <ul>
        {items.map((item) => (
          <li key={item.key} hidden={!matchesFeedFilter(item.facets, filter)}>
            {item.node}
          </li>
        ))}
      </ul>
    </>
  );
};
