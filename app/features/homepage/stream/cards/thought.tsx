import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardCategoryLabel } from "@/app/features/homepage/stream/cards/category-label";

export type ThoughtCardProps = {
  children: React.ReactNode;
};

export const ThoughtCard = ({ children }: ThoughtCardProps) => {
  return (
    <CardLayout label={<CardCategoryLabel color="yellow">Thoughts</CardCategoryLabel>} className="bg-cream p-48">
      <div className="text-black">{children}</div>
    </CardLayout>
  );
};
