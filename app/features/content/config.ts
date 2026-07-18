import { z } from "zod";

export const CATEGORIES = ["personal", "work"] as const;
export type Category = (typeof CATEGORIES)[number];

// Tags every stream entry as work or personal so the stream can be filtered.
const categorySchema = z.enum(CATEGORIES);

export const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: categorySchema,
  cover: z.string().optional(),
  draft: z.boolean().default(false),
});

export const projectSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: categorySchema,
  cardImage: z.string(),
  coverImage: z.string().optional(),
  // Drives the title label's background on the stream card and the title marquee
  // on the project's detail page.
  color: z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "must be a hex color, e.g. #f9ef38"),
  draft: z.boolean().default(false),
});

export const thoughtSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  category: categorySchema,
  draft: z.boolean().default(false),
});

export const CONTENT_TYPES = {
  blog: { dir: "blog", schema: blogSchema, hasDetailPage: true, layout: "folder" },
  project: { dir: "projects", schema: projectSchema, hasDetailPage: true, layout: "folder" },
  thought: { dir: "thoughts", schema: thoughtSchema, hasDetailPage: false, layout: "file" },
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;

export type EntryFor<T extends ContentType> = { slug: string } & z.infer<(typeof CONTENT_TYPES)[T]["schema"]>;

export type BlogEntry = EntryFor<"blog">;
export type ProjectEntry = EntryFor<"project">;
export type ThoughtEntry = EntryFor<"thought">;
