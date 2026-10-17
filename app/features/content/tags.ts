// Apart from `config.ts`, so the feed filters in the client bundle can read them without pulling in zod.
export const CONTENT_TAGS = ["work", "personal", "make", "photos"] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];

export const CONTENT_TAG_LABELS = {
  work: "Work",
  personal: "Personal",
  make: "Make",
  photos: "Photos",
} as const satisfies Record<ContentTag, string>;
