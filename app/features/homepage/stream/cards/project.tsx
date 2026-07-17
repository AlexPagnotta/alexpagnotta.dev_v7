import { CardLabel, CardLayout } from "@/app/features/homepage/stream/cards/card-layout";

/*
  Project card — mocked. A portrait cover image tagged with the "PROJECT"
  category, with the source of the work pinned over the bottom-right corner.
  Real cover art and source come later; the image is a solid placeholder for now.
*/
export const ProjectCard = () => {
  return (
    <CardLayout label={<CardLabel color="magenta">Project</CardLabel>} className="bg-cream p-16">
      <div className="relative aspect-[349/455] w-full rounded-sm bg-cyan">
        <CardLabel color="green" className="absolute bottom-8 right-8">
          Duolingo
        </CardLabel>
      </div>
    </CardLayout>
  );
};
