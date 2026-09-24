import type { ContentTag, ContentType } from "@/app/features/content/config";
import type { TabShape } from "@/app/features/ui/tabs";

/*
  A tab matches an entry when its value is one of the entry's facets: its content type
  (Projects/Writing) plus its tags (Work/Personal/Make). `all` matches everything.
*/
export type FeedFacet = ContentType | ContentTag;

// Like the tags on a card, content types are squared off and leave the pills to the tags.
export const FEED_FILTERS = [
  { value: "all", label: "All", shape: "rounded" },
  { value: "project", label: "Projects", shape: "rounded" },
  { value: "writing", label: "Writing", shape: "rounded" },
  { value: "work", label: "Work", shape: "pill" },
  { value: "personal", label: "Personal", shape: "pill" },
  { value: "make", label: "Make", shape: "pill" },
] as const satisfies readonly { value: "all" | FeedFacet; label: string; shape: TabShape }[];

export type FeedFilterValue = (typeof FEED_FILTERS)[number]["value"];

export const DEFAULT_FEED_FILTER: FeedFilterValue = "all";

export const facetsFor = (entry: { type: ContentType; tags: readonly ContentTag[] }): FeedFacet[] => [
  entry.type,
  ...entry.tags,
];

export const matchesFeedFilter = (facets: readonly FeedFacet[], filter: FeedFilterValue) =>
  filter === "all" || facets.includes(filter);
