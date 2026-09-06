import { getFeedEntries, hrefFor } from "@/app/features/content/loader";
import { FeedList, type FeedListItem } from "@/app/features/homepage/feed/feed-list";
import { facetsFor } from "@/app/features/homepage/feed/filters";
import { Container } from "@/app/features/ui/container";
import { Link } from "@/app/features/ui/link";

// Placeholder node until the cards land — the item shape is what the list filters on.
const toItem = (entry: ReturnType<typeof getFeedEntries>[number]): FeedListItem => ({
  key: `${entry.type}-${entry.slug}`,
  facets: facetsFor(entry),
  node: <Link href={hrefFor(entry.type, entry.slug)}>{entry.title}</Link>,
});

export const Feed = () => {
  const items = getFeedEntries().map(toItem);

  return (
    <section className="bg-grey-1 pt-56 pb-120 lg:pt-80 lg:pb-160">
      <Container className="flex flex-col gap-64 px-(--page-side-spacing) lg:gap-80">
        <FeedList items={items} />
      </Container>
    </section>
  );
};
