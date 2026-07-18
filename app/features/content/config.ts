import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
});

export const projectSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  cover: z.string().optional(),
  stack: z.array(z.string()).default([]),
  links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  draft: z.boolean().default(false),
});

export const thoughtSchema = z.object({
  text: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(false),
});

export const CONTENT_TYPES = {
  blog: { dir: "blog", schema: blogSchema, hasDetailPage: true },
  project: { dir: "projects", schema: projectSchema, hasDetailPage: true },
  thought: { dir: "thoughts", schema: thoughtSchema, hasDetailPage: false },
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;

export type EntryFor<T extends ContentType> = { slug: string } & z.infer<(typeof CONTENT_TYPES)[T]["schema"]>;

export type BlogEntry = EntryFor<"blog">;
export type ProjectEntry = EntryFor<"project">;
export type ThoughtEntry = EntryFor<"thought">;
