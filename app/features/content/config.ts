import { z } from "zod";

export const CONTENT_TAGS = ["work", "personal", "make"] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];

// Shared for now — split into per-type schemas when the two diverge.
const entrySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.enum(CONTENT_TAGS)),
  draft: z.boolean().default(false),
});

export const CONTENT_TYPES = {
  writing: { dir: "writings", basePath: "/writings", schema: entrySchema },
  project: { dir: "projects", basePath: "/projects", schema: entrySchema },
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;

export const CONTENT_TYPE_KEYS = Object.keys(CONTENT_TYPES) as ContentType[];

export type EntryFor<T extends ContentType> = { slug: string } & z.infer<(typeof CONTENT_TYPES)[T]["schema"]>;

export type WritingEntry = EntryFor<"writing">;
export type ProjectEntry = EntryFor<"project">;
