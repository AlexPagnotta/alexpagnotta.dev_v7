import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardContentTypeLabel } from "@/app/features/homepage/stream/cards/content-type-label";

export type ThoughtCardProps = {
  children: React.ReactNode;
};

export const ThoughtCard = ({ children }: ThoughtCardProps) => {
  return (
    <CardLayout label={<CardContentTypeLabel color="yellow">Thoughts</CardContentTypeLabel>} className="bg-cream p-40">
      <div className="text-black">{children}</div>
    </CardLayout>
  );
};
