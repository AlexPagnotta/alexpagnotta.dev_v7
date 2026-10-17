import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { StaticImageData } from "next/image";
import type * as React from "react";
import { CONTENT_TYPE_KEYS, CONTENT_TYPES, type ContentType, type EntryFor } from "@/app/features/content/config";
import { isProduction } from "@/app/features/utils/release-channel";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Hidden only in production; evaluated at build time for generateStaticParams.
const INCLUDE_DRAFTS = !isProduction;

const byDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

const dirFor = (type: ContentType) => path.join(CONTENT_DIR, CONTENT_TYPES[type].dir);

/** The entry's folder, where it colocates its `index.mdx` and assets. */
export const entryDirFor = (type: ContentType, slug: string) => path.join(dirFor(type), slug);

const fileFor = (type: ContentType, slug: string) => path.join(entryDirFor(type, slug), "index.mdx");

type CoverType = Exclude<ContentType, "thought">;

// The bundler needs a literal prefix to build a module per matching file, hence one entry per type.
const coverImports = {
  writing: (file: string) => import(`@/content/writings/${file}`),
  project: (file: string) => import(`@/content/projects/${file}`),
} satisfies Record<CoverType, (file: string) => Promise<{ default: StaticImageData }>>;

/** The entry's colocated `cover`, imported so it keeps its size and blur placeholder; a missing file throws. */
export const getCover = async (
  type: CoverType,
  slug: string,
  file: string | undefined
): Promise<StaticImageData | undefined> => {
  if (!file) return undefined;
  const { default: cover } = await coverImports[type](`${slug}/${file}`);
  return cover;
};

const bodyImports = {
  writing: (slug: string) => import(`@/content/writings/${slug}/index.mdx`),
  project: (slug: string) => import(`@/content/projects/${slug}/index.mdx`),
  thought: (slug: string) => import(`@/content/thoughts/${slug}/index.mdx`),
} satisfies Record<ContentType, (slug: string) => Promise<{ default: React.ComponentType }>>;

export const getBody = async (type: ContentType, slug: string) => (await bodyImports[type](slug)).default;

const getSlugs = (type: ContentType): string[] => {
  const dir = dirFor(type);
  if (!fs.existsSync(dir)) return [];

  return (
    fs
      .readdirSync(dir, { withFileTypes: true })
      // `_template` keeps each folder non-empty, or the imports above fail to resolve.
      .filter(
        (entry) =>
          entry.isDirectory() && !entry.name.startsWith("_") && fs.existsSync(path.join(dir, entry.name, "index.mdx"))
      )
      .map((entry) => entry.name)
  );
};

export const getEntry = <T extends ContentType>(type: T, slug: string): EntryFor<T> => {
  const { data } = matter(fs.readFileSync(fileFor(type, slug), "utf8"));
  // Throws on invalid frontmatter so a malformed file fails the build loudly.
  const frontmatter = CONTENT_TYPES[type].schema.parse(data);
  // Cast through unknown: TS can't narrow the schema union under a generic key.
  return { slug, ...frontmatter } as unknown as EntryFor<T>;
};

export const getAllEntries = <T extends ContentType>(type: T): EntryFor<T>[] =>
  getSlugs(type)
    .map((slug) => getEntry(type, slug))
    .filter((entry) => INCLUDE_DRAFTS || !entry.draft)
    .sort(byDateDesc);

// Every type in one list, newest first: what the homepage feed renders.
// Keyed by `type`, so narrowing on it narrows the entry's fields too.
export type FeedEntry = { [T in ContentType]: { type: T } & EntryFor<T> }[ContentType];

export const getFeedEntries = (): FeedEntry[] =>
  CONTENT_TYPE_KEYS.flatMap((type) => getAllEntries(type).map((entry) => ({ type, ...entry }) as FeedEntry)).sort(
    byDateDesc
  );
