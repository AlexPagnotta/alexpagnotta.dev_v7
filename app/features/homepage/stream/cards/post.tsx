import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardCategoryLabel } from "@/app/features/homepage/stream/cards/category-label";

export const PostCard = () => {
  return (
    <CardLayout label={<CardCategoryLabel color="cyan">Post</CardCategoryLabel>} className="bg-cream p-48">
      <div className="flex flex-col gap-8">
        <h3 className="title-3 text-black">Building in the open</h3>
        <p className="body-1 text-black">
          Notes on shipping small, sharing early, and letting the work double as the portfolio.
        </p>
      </div>
    </CardLayout>
  );
};
