import NextImage, { type StaticImageData } from "next/image";
import { CardLayout } from "@/app/features/homepage/stream/cards/card-layout";
import { CardContentTypeLabel } from "@/app/features/homepage/stream/cards/content-type-label";
import { BaseLink } from "@/app/features/ui/link";
import { Pill } from "@/app/features/ui/pill";

export type ProjectCardProps = {
  title: string;
  href: string;
  image: StaticImageData;
  color: string;
};

export const ProjectCard = ({ title, href, image, color }: ProjectCardProps) => {
  return (
    <CardLayout
      label={<CardContentTypeLabel color="magenta">Project</CardContentTypeLabel>}
      className="aspect-3/4 w-full overflow-hidden"
    >
      <NextImage
        src={image}
        alt=""
        fill
        placeholder="blur"
        // Actual rendered card width: a 3-column grid capped at 360px per column on desktop,
        // 2 columns (~50vw) on tablet, full width on mobile.
        sizes="(min-width: 1024px) min(33vw, 360px), (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <BaseLink
        href={href}
        aria-label={title}
        className="absolute inset-0 block focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black"
      >
        <Pill
          uppercase={false}
          className="absolute right-24 bottom-24 bg-(--tag-color) text-black shadow-depth-md shadow-(color:--tag-shade) [--tag-shade:color-mix(in_oklab,var(--tag-color)_80%,black)]"
          style={{ "--tag-color": color } as React.CSSProperties}
        >
          {title}
        </Pill>
      </BaseLink>
    </CardLayout>
  );
};
