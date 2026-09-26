import { z } from "zod";
import { ACCENTS } from "@/app/features/style/accents";

export const CONTENT_TAGS = ["work", "personal", "make"] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];

export const CONTENT_TAG_LABELS = {
  work: "Work",
  personal: "Personal",
  make: "Make",
} as const satisfies Record<ContentTag, string>;

const baseEntrySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  // Filename of an image colocated with the entry, e.g. `cover.png`.
  cover: z.string().optional(),
  // Per-entry accent, named by palette family; each consumer picks the cut it needs.
  accent: z.enum(ACCENTS).optional(),
  tags: z.array(z.enum(CONTENT_TAGS)),
  draft: z.boolean().default(false),
});

const writingSchema = baseEntrySchema;

// A short post whose title is the thought itself, so there is no cover to frame it.
const thoughtSchema = baseEntrySchema.omit({ cover: true });

const projectSchema = baseEntrySchema.extend({
  // Who the work was for. The detail header reads "x WILD - 2024", taking the year from `date`.
  client: z.string().optional(),
  // Live site, which the detail header offers as its call to action.
  link: z.url().optional(),
});

export const CONTENT_TYPES = {
  // `label` names one entry, so it stays singular where the feed tabs read "Projects".
  writing: { dir: "writings", basePath: "/writings", label: "Writing", schema: writingSchema },
  project: { dir: "projects", basePath: "/projects", label: "Project", schema: projectSchema },
  thought: { dir: "thoughts", basePath: "/thoughts", label: "Thought", schema: thoughtSchema },
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;

export const CONTENT_TYPE_KEYS = Object.keys(CONTENT_TYPES) as ContentType[];

export type EntryFor<T extends ContentType> = { slug: string } & z.infer<(typeof CONTENT_TYPES)[T]["schema"]>;
