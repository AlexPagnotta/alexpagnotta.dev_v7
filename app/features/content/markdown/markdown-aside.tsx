import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import { Image, type ImageProps } from "@/app/features/ui/image";
import { Video, type VideoProps } from "@/app/features/ui/video";

/*
  The aside owns where its media sits: the side, the size, and the edge it hangs from. The media
  and its tilt come from the caller.

  The media is pinned to the screen edge, hanging a fixed share past it at every width. Below
  `lg` it floats, so the wrapped text reflows around whatever reaches into the column; from `lg`
  the gutter is wide enough that it would only leave a gap, so it is lifted out of the flow and
  centred on its passage.
  `50vw - 50%` is the gutter between the column and the screen edge.
*/
const markdownAsideStyles = cva({
  base: "pointer-events-none relative h-auto lg:absolute lg:top-1/2 lg:m-0 lg:-translate-y-1/2",
  variants: {
    side: {
      left: "float-left lg:float-none",
      right: "float-right lg:float-none",
    },
    size: {
      sm: "[--aside-w:calc(var(--spacing)*96)] xl:[--aside-w:calc(var(--spacing)*128)]",
      lg: "[--aside-w:calc(var(--spacing)*128)] xl:[--aside-w:calc(var(--spacing)*240)]",
    },
  },
  compoundVariants: [
    {
      side: "left",
      size: "sm",
      className: cx(
        "-ml-[calc(50vw_-_50%_+_var(--spacing)*32)]",
        "lg:right-[calc(50%_+_50vw_-_var(--spacing)*64)]",
        "xl:right-[calc(50%_+_50vw_-_var(--spacing)*90)]"
      ),
    },
    {
      side: "right",
      size: "sm",
      className: cx(
        "-mr-[calc(50vw_-_50%_+_var(--spacing)*32)]",
        "lg:left-[calc(50%_+_50vw_-_var(--spacing)*64)]",
        "xl:left-[calc(50%_+_50vw_-_var(--spacing)*90)]"
      ),
    },
    {
      side: "left",
      size: "lg",
      className: cx(
        "-ml-[calc(50vw_-_50%_+_var(--spacing)*54)]",
        "lg:right-[calc(50%_+_50vw_-_var(--spacing)*74)]",
        "xl:right-[calc(50%_+_50vw_-_var(--spacing)*171)]"
      ),
    },
    {
      side: "right",
      size: "lg",
      className: cx(
        "-mr-[calc(50vw_-_50%_+_var(--spacing)*54)]",
        "lg:left-[calc(50%_+_50vw_-_var(--spacing)*74)]",
        "xl:left-[calc(50%_+_50vw_-_var(--spacing)*171)]"
      ),
    },
  ],
  defaultVariants: {
    side: "right",
    size: "lg",
  },
});

/*
  Layout only sees the unrotated box, so the tilted corners would eat into the gap. `dx`/`dy` are
  how far the rotated box's bounds reach past it on each side, added to the 16 kept clear of the
  text beside and below. The previous block's own spacing already clears the top.
*/
const mediaBoxStyles = cx(
  "w-(--aside-w) aspect-(--aside-aspect) rotate-(--aside-rotate)",
  "[--aside-h:calc(var(--aside-w)*var(--aside-ratio))]",
  "[--aside-dx:calc((var(--aside-w)*cos(var(--aside-turn))_+_var(--aside-h)*sin(var(--aside-turn))_-_var(--aside-w))/2)]",
  "[--aside-dy:calc((var(--aside-h)*cos(var(--aside-turn))_+_var(--aside-w)*sin(var(--aside-turn))_-_var(--aside-h))/2)]",
  "mt-(--aside-dy) mb-[calc(var(--aside-dy)_+_var(--spacing)*16)]"
);

const clearanceStyles = {
  left: "mr-[calc(var(--aside-dx)_+_var(--spacing)*16)]",
  right: "ml-[calc(var(--aside-dx)_+_var(--spacing)*16)]",
} as const;

const IMAGE_SIZES = {
  sm: "(min-width: 80rem) 128px, 96px",
  lg: "(min-width: 80rem) 240px, 128px",
} as const;

// Running text inside sits in block flow, not the prose flex column, so it takes the same visible step.
const asideStyles = cx(
  "relative flow-root",
  "[&>:is(p,ul,ol)+:is(p,ul,ol)]:mt-24 lg:[&>:is(p,ul,ol)+:is(p,ul,ol)]:mt-32"
);

export type MarkdownAsideProps = VariantProps<typeof markdownAsideStyles> & {
  /** A looping clip; for transparency, the hvc1 mp4 first and the webm after, as `Video` explains. */
  video?: VideoProps["src"];
  poster?: string;
  image?: ImageProps["src"];
  /** The media's intrinsic size; crop it to its content so the gap to the text is the real one. */
  width: number;
  height: number;
  /** Tilt in degrees, clockwise. */
  rotate?: number;
  /** A soft shadow under the media. */
  shadow?: boolean;
  /** The passage the media sits beside; keep it to running text, which is all a float wraps. */
  children: React.ReactNode;
};

/** Decorative media hung off one side of a passage, as the detail page designs place it. */
export const MarkdownAside = ({
  side,
  size,
  video,
  poster,
  image,
  width,
  height,
  rotate = 0,
  shadow = true,
  children,
}: MarkdownAsideProps) => {
  const mediaStyles = cx(
    markdownAsideStyles({ side, size }),
    mediaBoxStyles,
    clearanceStyles[side ?? "right"],
    shadow && "drop-shadow-soft"
  );

  return (
    <div
      data-aside
      className={asideStyles}
      // The media's shape and tilt come from content, so they can only arrive as custom properties.
      style={
        {
          "--aside-aspect": `${width} / ${height}`,
          "--aside-ratio": height / width,
          "--aside-rotate": `${rotate}deg`,
          "--aside-turn": `${Math.abs(rotate)}deg`,
        } as React.CSSProperties
      }
    >
      {video ? (
        <Video autoplay src={video} poster={poster} aria-hidden className={mediaStyles} />
      ) : image ? (
        // Usually a cut-out, so a blur placeholder would show as a smudge around the shape.
        <Image src={image} alt="" sizes={IMAGE_SIZES[size ?? "lg"]} placeholder="empty" className={mediaStyles} />
      ) : null}
      {children}
    </div>
  );
};
