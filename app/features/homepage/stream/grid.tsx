import { getStreamItems, type StreamItem } from "@/app/features/content/loader";
import { PostCard } from "@/app/features/homepage/stream/cards/post";
import { ProjectCard } from "@/app/features/homepage/stream/cards/project";
import { ThoughtCard } from "@/app/features/homepage/stream/cards/thought";
import { type StreamCard, StreamFeed } from "@/app/features/homepage/stream/feed";

export const StreamGrid = async () => {
  const items = getStreamItems();

  // Resolve per-card assets up front: project cards need their colocated card image
  // (dynamic import → optimized StaticImageData), thought cards render their MDX body.
  const cards = await Promise.all(
    items.map(
      async (item): Promise<StreamCard> => ({
        key: `${item.kind}-${item.slug}`,
        category: item.category,
        node: await renderCard(item),
      })
    )
  );

  return <StreamFeed cards={cards} />;
};

const renderCard = async (item: StreamItem) => {
  if (item.kind === "project") {
    const { default: image } = await import(`@/content/projects/${item.slug}/${item.cardImage}`);
    return <ProjectCard title={item.title} href={item.href} image={image} color={item.color} />;
  }
  if (item.kind === "thought") {
    const { default: Thought } = await import(`@/content/thoughts/${item.slug}.mdx`);
    return (
      <ThoughtCard>
        <Thought />
      </ThoughtCard>
    );
  }
  return <PostCard title={item.title} description={item.description} href={item.href} />;
};
