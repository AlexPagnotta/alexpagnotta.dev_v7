import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardCategoryLabel } from "@/app/features/homepage/stream/cards/category-label";

export const ProjectCard = () => {
  return (
    <CardLayout
      label={<CardCategoryLabel color="magenta">Project</CardCategoryLabel>}
      className="aspect-3/4 w-full overflow-hidden bg-cyan"
    >
      <CardCategoryLabel
        color="green"
        className="absolute right-16 bottom-16 border-2 border-(--tag-shade) shadow-depth-md shadow-(color:--tag-shade) [--tag-shade:color-mix(in_oklab,var(--color-green)_78%,black)]"
      >
        Duolingo
      </CardCategoryLabel>
    </CardLayout>
  );
};
