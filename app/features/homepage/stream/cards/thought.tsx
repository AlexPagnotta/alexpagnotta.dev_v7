import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardCategoryLabel } from "@/app/features/homepage/stream/cards/category-label";

export const ThoughtCard = () => {
  return (
    <CardLayout label={<CardCategoryLabel color="yellow">Thoughts</CardCategoryLabel>} className="bg-cream p-48">
      <p className="body-1 text-black">
        With the advent of AI I am not just a dev, I am a maker. The tools got faster, the distance between an idea and
        a working thing got shorter, and the only real bottleneck left is taste.
      </p>
    </CardLayout>
  );
};
