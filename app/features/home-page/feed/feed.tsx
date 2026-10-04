import { type FeedEntry, getCover, getCustomCard, getFeedEntries, hrefFor } from "@/app/features/content/loader";
import { FeedCard } from "@/app/features/home-page/feed/feed-card";
import { FeedList, type FeedListItem } from "@/app/features/home-page/feed/feed-list";
import { facetsFor } from "@/app/features/home-page/feed/filters";
import { ThoughtCard } from "@/app/features/home-page/feed/thought-card";
import { Container } from "@/app/features/ui/container";

const toNode = async (entry: FeedEntry) => {
  const href = hrefFor(entry.type, entry.slug);

  const CustomCard = await getCustomCard(entry.type, entry.slug);
  if (CustomCard) return <CustomCard href={href} tags={entry.tags} accent={entry.accent} />;

  if (entry.type === "thought") {
    return <ThoughtCard href={href} title={entry.title} tags={entry.tags} accent={entry.accent} />;
  }

  return (
    <FeedCard
      type={entry.type}
      href={href}
      title={entry.title}
      tags={entry.tags}
      cover={await getCover(entry.type, entry.slug, entry.cover)}
      excerpt={entry.excerpt}
      accent={entry.accent}
    />
  );
};

const toItem = async (entry: FeedEntry): Promise<FeedListItem> => ({
  key: `${entry.type}-${entry.slug}`,
  facets: facetsFor(entry),
  node: await toNode(entry),
});

export const Feed = async () => {
  const items = await Promise.all(getFeedEntries().map(toItem));

  return (
    <section className="bg-gray-100 pt-48 pb-80 lg:pt-64 lg:pb-160">
      <Container className="flex flex-col gap-40 px-(--page-side-spacing) lg:gap-80">
        <h2 className="sr-only">Projects, writing and thoughts</h2>
        <FeedList items={items} />
      </Container>
    </section>
  );
};
