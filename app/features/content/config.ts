import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
});

export const projectSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  cardImage: z.string(),
  coverImage: z.string().optional(),
  draft: z.boolean().default(false),
});

export const thoughtSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
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
