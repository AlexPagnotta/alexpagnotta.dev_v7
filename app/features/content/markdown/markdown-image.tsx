import type * as React from "react";
import { MarkdownFigure } from "@/app/features/content/markdown/markdown-figure";
import { Image, type ImageProps } from "@/app/features/ui/image";

// The body column caps at 672px, `--content-sm` minus the gutters, once the viewport reaches 45rem.
const IMAGE_SIZES = "(min-width: 45rem) 672px, calc(100vw - 48px)";

export type MarkdownImageProps = {
  caption?: React.ReactNode;
} & ImageProps;

/** Body imagery: framed, captioned, and sized to the text column. */
export const MarkdownImage = ({ caption, sizes, ...props }: MarkdownImageProps) => (
  <MarkdownFigure caption={caption}>
    <Image sizes={sizes ?? IMAGE_SIZES} {...props} />
  </MarkdownFigure>
);
