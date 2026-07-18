import { Image, type ImageProps } from "@/app/features/ui/image";

export const MarkdownImage = (props: ImageProps) => (
  <figure className="overflow-hidden rounded-lg">
    <Image sizes="(min-width: 948px) 850px, 100vw" {...props} />
  </figure>
);
