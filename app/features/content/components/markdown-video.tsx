import { MarkdownFigure } from "@/app/features/content/components/markdown-figure";
import { Video, type VideoProps } from "@/app/features/ui/video";

export type MarkdownVideoProps = {
  caption?: React.ReactNode;
} & VideoProps;

/**
 * Body video: framed and captioned like an image. Body clips are silent loops by default;
 * pass `autoplay={false}` for anything with sound, which brings up controls. Always pass
 * `width` and `height` so the frame reserves its box before the clip loads.
 */
export const MarkdownVideo = ({ caption, autoplay = true, ...props }: MarkdownVideoProps) => (
  <MarkdownFigure caption={caption}>
    <Video autoplay={autoplay} {...props} />
  </MarkdownFigure>
);
