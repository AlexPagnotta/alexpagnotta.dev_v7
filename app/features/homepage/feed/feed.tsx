import { type FeedEntry, getCover, getCustomCard, getFeedEntries, hrefFor } from "@/app/features/content/loader";
import { FeedCard } from "@/app/features/homepage/feed/feed-card";
import { FeedList, type FeedListItem } from "@/app/features/homepage/feed/feed-list";
import { facetsFor } from "@/app/features/homepage/feed/filters";
import { Container } from "@/app/features/ui/container";

// One row of the widest grid, so the covers above the fold load eagerly and preload.
const EAGER_COVERS = 3;

const toNode = async (entry: FeedEntry, index: number) => {
  const href = hrefFor(entry.type, entry.slug);

  const CustomCard = await getCustomCard(entry.type, entry.slug);
  if (CustomCard) return <CustomCard href={href} tags={entry.tags} accent={entry.accent} />;

  return (
    <FeedCard
      type={entry.type}
      href={href}
      title={entry.title}
      tags={entry.tags}
      cover={await getCover(entry.type, entry.slug, entry.cover)}
      accent={entry.accent}
      priority={index < EAGER_COVERS}
    />
  );
};

const toItem = async (entry: FeedEntry, index: number): Promise<FeedListItem> => ({
  key: `${entry.type}-${entry.slug}`,
  facets: facetsFor(entry),
  node: await toNode(entry, index),
});

export const Feed = async () => {
  const items = await Promise.all(getFeedEntries().map(toItem));

  return (
    <section className="bg-grey-1 pt-56 pb-120 lg:pt-80 lg:pb-160">
      <Container className="flex flex-col gap-64 px-(--page-side-spacing) lg:gap-80">
        <FeedList items={items} />
      </Container>
    </section>
  );
};
