import { z } from "zod";

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
  // Per-entry accent, as a 6-digit hex. Free-form rather than a token name, so an entry
  // can carry a colour pulled from its own artwork.
  accent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Expected a 6-digit hex colour, e.g. #33cc92")
    .optional(),
  tags: z.array(z.enum(CONTENT_TAGS)),
  draft: z.boolean().default(false),
});

const writingSchema = baseEntrySchema;

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
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;

export const CONTENT_TYPE_KEYS = Object.keys(CONTENT_TYPES) as ContentType[];

export type EntryFor<T extends ContentType> = { slug: string } & z.infer<(typeof CONTENT_TYPES)[T]["schema"]>;

export type WritingEntry = EntryFor<"writing">;
export type ProjectEntry = EntryFor<"project">;
