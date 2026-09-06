import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CONTENT_TYPE_KEYS, CONTENT_TYPES, type ContentType, type EntryFor } from "@/app/features/content/config";
import { isProduction } from "@/app/features/utils/release-channel";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Hidden only in production; evaluated at build time for generateStaticParams.
const INCLUDE_DRAFTS = !isProduction;

const byDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

const dirFor = (type: ContentType) => path.join(CONTENT_DIR, CONTENT_TYPES[type].dir);

// Entries colocate their assets in `<slug>/index.mdx`.
const fileFor = (type: ContentType, slug: string) => path.join(dirFor(type), slug, "index.mdx");

export const hrefFor = (type: ContentType, slug: string) => `${CONTENT_TYPES[type].basePath}/${slug}`;

export const getSlugs = (type: ContentType): string[] => {
  const dir = dirFor(type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, "index.mdx")))
    .map((entry) => entry.name);
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

// Every type in one list, newest first — what the homepage feed renders.
export type FeedEntry = { type: ContentType } & EntryFor<ContentType>;

export const getFeedEntries = (): FeedEntry[] =>
  CONTENT_TYPE_KEYS.flatMap((type) => getAllEntries(type).map((entry) => ({ type, ...entry }))).sort(byDateDesc);
