import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardCategoryLabel } from "@/app/features/homepage/stream/cards/category-label";

export type ThoughtCardProps = {
  text: string;
};

export const ThoughtCard = ({ text }: ThoughtCardProps) => {
  return (
    <CardLayout label={<CardCategoryLabel color="yellow">Thoughts</CardCategoryLabel>} className="bg-cream p-48">
      <p className="body-1 text-black">{text}</p>
    </CardLayout>
  );
};
