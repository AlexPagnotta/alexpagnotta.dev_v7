import { CardLabel, CardLayout } from "@/app/features/homepage/stream/cards/card-layout";

/*
  Project card — mocked. A full-bleed portrait cover image tagged with the
  "PROJECT" category, with the source of the work pinned over the bottom-right
  corner. The source tag carries a depth shadow in a darker green, mirroring the
  huge button variant. Real cover art and source come later; the image is a solid
  placeholder for now.
*/
export const ProjectCard = () => {
  return (
    <CardLayout
      label={<CardLabel color="magenta">Project</CardLabel>}
      className="aspect-[349/455] w-full overflow-hidden bg-cyan"
    >
      <CardLabel
        color="green"
        className="absolute right-16 bottom-16 border-2 border-(--tag-shade) shadow-depth-md shadow-(color:--tag-shade) [--tag-shade:color-mix(in_oklab,var(--color-green)_78%,black)]"
      >
        Duolingo
      </CardLabel>
    </CardLayout>
  );
};
