import { Image, type ImageProps } from "@/app/features/ui/image";

// Prose renders inside a max-w-900 container with px-24, so the image never
// exceeds ~852px; cap the sizes hint there instead of the 100vw default.
export const MarkdownImage = (props: ImageProps) => (
  <figure className="overflow-hidden rounded-lg">
    <Image sizes="(min-width: 948px) 852px, 100vw" {...props} />
  </figure>
);
