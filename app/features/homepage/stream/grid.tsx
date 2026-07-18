import { getStreamItems } from "@/app/features/content/loader";
import { PostCard } from "@/app/features/homepage/stream/cards/post";
import { ProjectCard } from "@/app/features/homepage/stream/cards/project";
import { ThoughtCard } from "@/app/features/homepage/stream/cards/thought";

export const StreamGrid = () => {
  const items = getStreamItems();

  return (
    <ul className="columns-1 gap-56 sm:columns-2 lg:columns-3">
      {items.map((item) => (
        <li key={`${item.kind}-${item.slug}`} className="mb-32 break-inside-avoid">
          {item.kind === "post" && <PostCard title={item.title} description={item.description} href={item.href} />}
          {item.kind === "project" && <ProjectCard title={item.title} href={item.href} />}
          {item.kind === "thought" && <ThoughtCard text={item.text} />}
        </li>
      ))}
    </ul>
  );
};
