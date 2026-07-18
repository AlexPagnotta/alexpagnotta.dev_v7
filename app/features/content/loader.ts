import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Category, CONTENT_TYPES, type ContentType, type EntryFor } from "@/app/features/content/config";
import { isProduction } from "@/app/features/utils/release-channel";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Drafts are visible on every channel except production, so they can be reviewed on local
// dev and preview/staging deploys but never ship. Evaluated at build time, which is what
// generateStaticParams uses to decide whether a draft's page exists at all.
const INCLUDE_DRAFTS = !isProduction;

const byDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

const dirFor = (type: ContentType) => path.join(CONTENT_DIR, CONTENT_TYPES[type].dir);

// Folder-layout entries colocate their assets in `<slug>/index.mdx`; file-layout
// entries are a flat `<slug>.mdx`.
const fileFor = (type: ContentType, slug: string) =>
  CONTENT_TYPES[type].layout === "folder"
    ? path.join(dirFor(type), slug, "index.mdx")
    : path.join(dirFor(type), `${slug}.mdx`);

export const getSlugs = (type: ContentType): string[] => {
  const dir = dirFor(type);
  if (!fs.existsSync(dir)) return [];

  if (CONTENT_TYPES[type].layout === "folder") {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, "index.mdx")))
      .map((entry) => entry.name);
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
};

export const getEntry = <T extends ContentType>(type: T, slug: string): EntryFor<T> => {
  const file = fileFor(type, slug);
  const { data } = matter(fs.readFileSync(file, "utf8"));
  // Throws on invalid frontmatter so a malformed file fails the build loudly.
  const frontmatter = CONTENT_TYPES[type].schema.parse(data);
  // Cast through unknown: TS can't narrow the schema union under a generic key.
  return { slug, ...frontmatter } as unknown as EntryFor<T>;
};

const readVisibleEntries = <T extends ContentType>(type: T): EntryFor<T>[] =>
  getSlugs(type)
    .map((slug) => getEntry(type, slug))
    .filter((entry) => INCLUDE_DRAFTS || !entry.draft);

export const getAllEntries = <T extends ContentType>(type: T): EntryFor<T>[] =>
  readVisibleEntries(type).sort(byDateDesc);

export type StreamItem = { category: Category } & (
  | { kind: "post"; slug: string; title: string; description?: string; date: Date; href: string }
  | { kind: "project"; slug: string; title: string; cardImage: string; color: string; date: Date; href: string }
  | { kind: "thought"; slug: string; date: Date }
);

export const getStreamItems = (): StreamItem[] => {
  const posts = readVisibleEntries("blog").map(
    (entry): StreamItem => ({
      kind: "post",
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      category: entry.category,
      date: entry.date,
      href: `/blog/${entry.slug}`,
    })
  );
  const projects = readVisibleEntries("project").map(
    (entry): StreamItem => ({
      kind: "project",
      slug: entry.slug,
      title: entry.title,
      cardImage: entry.cardImage,
      color: entry.color,
      category: entry.category,
      date: entry.date,
      href: `/projects/${entry.slug}`,
    })
  );
  const thoughts = readVisibleEntries("thought").map(
    (entry): StreamItem => ({ kind: "thought", slug: entry.slug, category: entry.category, date: entry.date })
  );

  return [...posts, ...projects, ...thoughts].sort(byDateDesc);
};
