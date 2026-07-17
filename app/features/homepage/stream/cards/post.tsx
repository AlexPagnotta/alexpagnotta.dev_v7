import { CardLabel, CardLayout } from "@/app/features/homepage/stream/cards/card-layout";

/*
  Post card — mocked. A short title and excerpt on a cream sheet, tagged with the
  "POST" category. Copy is placeholder until real posts are wired in.
*/
export const PostCard = () => {
  return (
    <CardLayout label={<CardLabel color="cyan">Post</CardLabel>} className="bg-cream p-48">
      <div className="flex flex-col gap-8">
        <h3 className="title-3 text-black">Building in the open</h3>
        <p className="body-1 text-black">
          Notes on shipping small, sharing early, and letting the work double as the portfolio.
        </p>
      </div>
    </CardLayout>
  );
};
