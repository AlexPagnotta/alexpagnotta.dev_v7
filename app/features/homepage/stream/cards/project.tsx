import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardCategoryLabel } from "@/app/features/homepage/stream/cards/category-label";
import { BaseLink } from "@/app/features/ui/link";

export type ProjectCardProps = {
  title: string;
  href: string;
};

export const ProjectCard = ({ title, href }: ProjectCardProps) => {
  return (
    <CardLayout
      label={<CardCategoryLabel color="magenta">Project</CardCategoryLabel>}
      className="aspect-3/4 w-full overflow-hidden bg-cyan"
    >
      <BaseLink
        href={href}
        className="absolute inset-0 block focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black"
      >
        <CardCategoryLabel
          color="green"
          className="absolute right-16 bottom-16 border-2 border-(--tag-shade) shadow-depth-md shadow-(color:--tag-shade) [--tag-shade:color-mix(in_oklab,var(--color-green)_78%,black)]"
        >
          {title}
        </CardCategoryLabel>
      </BaseLink>
    </CardLayout>
  );
};
