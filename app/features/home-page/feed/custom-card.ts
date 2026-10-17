import "server-only";
import fs from "node:fs";
import path from "node:path";
import type * as React from "react";
import type { ContentType } from "@/app/features/content/config";
import { entryDirFor } from "@/app/features/content/loader";
import type { CustomFeedCardProps } from "@/app/features/home-page/feed/cards/feed-card-shell";

// The bundler needs a literal prefix to build a module per matching file, hence one entry per type.
const cardImports = {
  writing: (file: string) => import(`@/content/writings/${file}`),
  project: (file: string) => import(`@/content/projects/${file}`),
  thought: (file: string) => import(`@/content/thoughts/${file}`),
} satisfies Record<ContentType, (file: string) => Promise<{ default: React.ComponentType<CustomFeedCardProps> }>>;

/** The default export of a `card.tsx` next to the entry's `index.mdx`, which replaces its standard feed card. */
export const getCustomCard = async (
  type: ContentType,
  slug: string
): Promise<React.ComponentType<CustomFeedCardProps> | undefined> => {
  if (!fs.existsSync(path.join(entryDirFor(type, slug), "card.tsx"))) return undefined;
  const { default: CustomCard } = await cardImports[type](`${slug}/card`);
  return CustomCard;
};
