import type { ContentTag, ContentType } from "@/app/features/content/config";

/*
  A tab matches an entry when its value is one of the entry's facets: its content type
  (Projects/Writing) plus its tags (Work/Personal/Make). `all` matches everything.
*/
export type FeedFacet = ContentType | ContentTag;

export const FEED_FILTERS = [
  { value: "all", label: "All" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "project", label: "Projects" },
  { value: "writing", label: "Writing" },
  { value: "make", label: "Make" },
] as const satisfies readonly { value: "all" | FeedFacet; label: string }[];

export type FeedFilterValue = (typeof FEED_FILTERS)[number]["value"];

export const DEFAULT_FEED_FILTER: FeedFilterValue = "all";

export const facetsFor = (entry: { type: ContentType; tags: readonly ContentTag[] }): FeedFacet[] => [
  entry.type,
  ...entry.tags,
];

export const matchesFeedFilter = (facets: readonly FeedFacet[], filter: FeedFilterValue) =>
  filter === "all" || facets.includes(filter);
