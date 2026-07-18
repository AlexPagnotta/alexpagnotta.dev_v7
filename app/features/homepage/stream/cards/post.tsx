import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardContentTypeLabel } from "@/app/features/homepage/stream/cards/content-type-label";
import type { CursorVariant } from "@/app/features/ui/cursor";
import { BaseLink } from "@/app/features/ui/link";

export type PostCardProps = {
  title: string;
  description?: string;
  href: string;
};

export const PostCard = ({ title, description, href }: PostCardProps) => {
  return (
    <CardLayout label={<CardContentTypeLabel color="cyan">Post</CardContentTypeLabel>} className="bg-cream p-48">
      <BaseLink
        href={href}
        aria-label={title}
        data-cursor={"open-yellow" satisfies CursorVariant}
        className="absolute inset-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      />
      <div className="flex flex-col gap-8">
        <h3 className="title-3 text-black">{title}</h3>
        {description && <p className="body-1 text-black">{description}</p>}
      </div>
    </CardLayout>
  );
};
