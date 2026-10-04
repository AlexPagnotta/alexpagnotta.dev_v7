import type { ContentTag, ContentType } from "@/app/features/content/config";
import type { TabShape } from "@/app/features/ui/tabs";

/*
  A tab matches an entry when its value is one of the entry's facets: its content type
  (Projects/Writing/Thoughts) plus its tags (Work/Personal/Make). `all` matches everything.
*/
export type FeedFacet = ContentType | ContentTag;

// Like the tags on a card, content types are squared off and leave the pills to the tags.
// `param` is what the tab reads as in the URL; `all` has none and leaves the URL bare.
export const FEED_FILTERS = [
  { value: "all", label: "All", shape: "rounded", param: null },
  { value: "project", label: "Projects", shape: "rounded", param: "projects" },
  { value: "writing", label: "Writing", shape: "rounded", param: "writing" },
  { value: "thought", label: "Thoughts", shape: "rounded", param: "thoughts" },
  { value: "work", label: "Work", shape: "pill", param: "work" },
  { value: "personal", label: "Personal", shape: "pill", param: "personal" },
  { value: "make", label: "Make", shape: "pill", param: "make" },
] as const satisfies readonly { value: "all" | FeedFacet; label: string; shape: TabShape; param: string | null }[];

export type FeedFilterValue = (typeof FEED_FILTERS)[number]["value"];

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
