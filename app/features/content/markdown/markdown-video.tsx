import type { StaticImageData } from "next/image";
import type * as React from "react";
import { MarkdownFigure } from "@/app/features/content/markdown/markdown-figure";
import { posterWithBlur } from "@/app/features/ui/image";
import { Video, type VideoProps } from "@/app/features/ui/video";

// The body column's widest, as in `markdown-image.tsx`.
const POSTER_WIDTH = 672;

export type MarkdownVideoProps = {
  caption?: React.ReactNode;
  poster?: StaticImageData;
} & Omit<VideoProps, "poster">;

/**
 * Body video: framed and captioned like an image. Body clips are silent loops by default;
 * pass `autoplay={false}` for anything with sound, which brings up controls. Always pass
 * `width` and `height` so the frame reserves its box before the clip loads.
 */
export const MarkdownVideo = ({ caption, poster, autoplay = true, style, ...props }: MarkdownVideoProps) => {
  const posterProps = poster && posterWithBlur(poster, POSTER_WIDTH);

  return (
    <MarkdownFigure caption={caption}>
      <Video autoplay={autoplay} poster={posterProps?.poster} style={{ ...posterProps?.style, ...style }} {...props} />
    </MarkdownFigure>
  );
};
