import type * as React from "react";
import type { ContentType } from "@/app/features/content/config";
import { CONTENT_TAG_LABELS, CONTENT_TAGS, type ContentTag } from "@/app/features/content/tags";
import type { TabShape } from "@/app/features/ui/tabs";

// An entry's facets are its content type plus its tags; a tab matches when its value is one of them.
export type FeedFacet = ContentType | ContentTag;

export type FeedFilterValue = "all" | FeedFacet;

type FeedFilter = { value: FeedFilterValue; label: string; shape: TabShape; param: string | null };

// A tab names its whole section, so types read plural where an entry's own label is singular. Keyed in tab order.
const TYPE_TABS = {
  project: { label: "Projects", param: "projects" },
  writing: { label: "Writing", param: "writing" },
  thought: { label: "Thoughts", param: "thoughts" },
} as const satisfies Record<ContentType, { label: string; param: string }>;

// Like the tags on a card, content types are squared off and leave the pills to the tags; `all` leaves the URL bare.
export const FEED_FILTERS: readonly FeedFilter[] = [
  { value: "all", label: "All", shape: "rounded", param: null },
  ...(Object.keys(TYPE_TABS) as ContentType[]).map((type) => ({
    value: type,
    shape: "rounded" as const,
    ...TYPE_TABS[type],
  })),
  ...CONTENT_TAGS.map((tag) => ({ value: tag, label: CONTENT_TAG_LABELS[tag], shape: "pill" as const, param: tag })),
];

export const DEFAULT_FEED_FILTER: FeedFilterValue = "all";

export const facetsFor = (entry: { type: ContentType; tags: readonly ContentTag[] }): FeedFacet[] => [
  entry.type,
  ...entry.tags,
];

export const matchesFeedFilter = (facets: readonly FeedFacet[], filter: FeedFilterValue) =>
  filter === "all" || facets.includes(filter);

export const FEED_FILTER_PARAM = "filter";

export const feedFilterFromParam = (param: string | null): FeedFilterValue =>
  FEED_FILTERS.find((filter) => filter.param !== null && filter.param === param)?.value ?? DEFAULT_FEED_FILTER;

export const feedFilterHref = (value: FeedFilterValue) => {
  const param = FEED_FILTERS.find((filter) => filter.value === value)?.param;
  return param ? `/?${FEED_FILTER_PARAM}=${param}` : "/";
};

// Pushed rather than replaced, so Back steps through the filters before leaving the page.
export const pushFilter = (filter: FeedFilterValue) => {
  const href = feedFilterHref(filter);
  // Re-selecting the active tab would otherwise leave a duplicate entry for Back to step through.
  if (href !== window.location.pathname + window.location.search) window.history.pushState(null, "", href);
};

/** A rendered card and the facets the tabs filter it by. */
export type FeedListItem = {
  key: string;
  facets: readonly FeedFacet[];
  node: React.ReactNode;
};
