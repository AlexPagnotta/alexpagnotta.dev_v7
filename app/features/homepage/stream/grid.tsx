import { PostCard } from "@/app/features/homepage/stream/cards/post";
import { ProjectCard } from "@/app/features/homepage/stream/cards/project";
import { ThoughtCard } from "@/app/features/homepage/stream/cards/thought";

const ITEMS = [
  ProjectCard,
  ThoughtCard,
  PostCard,
  ThoughtCard,
  ProjectCard,
  PostCard,
  ProjectCard,
  PostCard,
  ThoughtCard,
  PostCard,
  ProjectCard,
  ThoughtCard,
];

export const StreamGrid = () => {
  return (
    <ul className="columns-1 gap-56 sm:columns-2 lg:columns-3">
      {ITEMS.map((Card, index) => (
        <li key={index} className="mb-16 break-inside-avoid">
          <Card />
        </li>
      ))}
    </ul>
  );
};
