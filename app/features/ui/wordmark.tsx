import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  The line is sized from the width it should cover rather than from a type token: dividing that width
  by the ratio gives the size that fills it, bleed and all. It is held between the two `display-1`
  cuts: past the desktop one the gutters grow instead, below the mobile one the line overflows.
*/
const wordmarkStyles = cva({
  base: [
    // The line carries the size so the space between the words scales with them, and the tracking so
    // that space is tracked like the letters are.
    "font-sans font-black tracking-xs whitespace-nowrap text-center",
    // After the size, which tailwind-merge would otherwise let reset the leading.
    "text-(length:--wordmark-size) leading-none [--wordmark-bleed:calc(69*var(--spacing))]",
    "[--wordmark-fit:calc((100cqw_+_2*var(--wordmark-bleed))/var(--wordmark-ratio))]",
    // The floor is a variable so a caller can change the smallest size, as the footer does.
    "[--wordmark-floor:var(--text-display-1-mobile)]",
    "[--wordmark-size:min(var(--text-display-1),max(var(--wordmark-floor),var(--wordmark-fit)))]",
  ],
  variants: {
    // Below `md` the words split onto their own lines, staggered so each runs off one edge.
    stacked: {
      true: "flex w-full flex-col items-start md:block md:w-auto",
      false: "",
    },
    // Drops the line past the bottom of whatever clips it, so that edge crops the letters.
    sunk: {
      true: "-mb-[0.3em]",
      false: "",
    },
  },
  defaultVariants: {
    stacked: false,
    sunk: false,
  },
});

/*
  The fill is a background clipped to the glyphs, set by the caller through `--wordmark-fill`. The
  stroke paints over its inner edge, so it runs at Figma's visible 2px rather than twice that.
*/
const glyphStyles = cx(
  "tracking-xs bg-(image:--wordmark-fill) bg-clip-text text-transparent",
  "[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:var(--color-black)]"
);

const shadowStyles = "drop-shadow-depth-6 lg:drop-shadow-depth-12";

const wordStyles = cx(glyphStyles, shadowStyles);

// Runs of each word along a drifting row; the drift loops by exactly one run, a third of the track.
const RUNS = 3;

// Hangs off a row's start to cover what the drift and slide expose there. The row's shadow filter already covers it.
const leadStyles = cx(glyphStyles, "absolute top-0 right-full whitespace-pre md:hidden");

// Inline boxes ignore `translate`, so the track is an inline-block sized by its runs alone.
const trackStyles = "max-md:relative max-md:inline-block max-md:whitespace-pre";

const driftStyles = {
  first: cx("max-md:motion-safe:animate-drift", "max-md:[--drift-x:calc(100%/3)]"),
  second: cx("max-md:motion-safe:animate-drift", "max-md:[--drift-x:calc(-100%/3)]"),
};

// Both rows travel the same distance in opposite directions.
const slideStyles = {
  first: cx("max-md:scroll-slide-x", "max-md:[--scroll-slide-x:calc(var(--spacing)*320)]"),
  second: cx("max-md:scroll-slide-x", "max-md:[--scroll-slide-x:calc(var(--spacing)*-320)]"),
};

const offsetStyles = { first: "max-md:-ml-24", second: "max-md:ml-63" };

export type WordmarkVariants = VariantProps<typeof wordmarkStyles>;

export type WordmarkProps = useRender.ComponentProps<"p"> &
  WordmarkVariants & {
    /** The pair to set, the second sitting under the first when `stacked`. */
    words: readonly [string, string];
    /**
     * How wide the spaced pair runs per 1px of font size in PP Frama, measured in the browser for
     * these exact words. It converts the width the line should cover into a size, so rounding it
     * only drifts the bleed by a pixel or two.
     */
    ratio: number;
    /**
     * Flanks the line with a copy each side from `lg`, so a viewport wider than the capped line still
     * reads as a full band rather than one centred line between two empty gutters.
     */
    repeated?: boolean;
    /** With `stacked`, runs each word along its row on phones and drifts the rows apart in a seamless loop. */
    drift?: boolean;
    /** With `stacked`, slides the rows to each other's offset as the page scrolls. */
    slideOnScroll?: boolean;
  };

/** A pair of words at display size, held wider than the viewport until it reaches `display-1`. */
export const Wordmark = ({
  words: [first, second],
  ratio,
  className,
  stacked,
  sunk,
  repeated,
  drift,
  slideOnScroll,
  render,
  ...props
}: WordmarkProps) => {
  const slide = stacked && slideOnScroll;
  const drifting = stacked && drift;

  // The first run is the heading's text; the rest only fill the row, so they stay out of its name.
  const word = (text: string, row: "first" | "second") =>
    drifting ? (
      <span className={cx(shadowStyles, offsetStyles[row], slide && slideStyles[row])}>
        <span className={cx(glyphStyles, trackStyles, driftStyles[row])}>
          <span aria-hidden className={leadStyles}>
            {`${text} `.repeat(RUNS)}
          </span>
          {text}
          <span aria-hidden className="md:hidden">
            {`${` ${text}`.repeat(RUNS - 1)} `}
          </span>
        </span>
      </span>
    ) : (
      <span className={cx(wordStyles, stacked && offsetStyles[row], slide && slideStyles[row])}>{text}</span>
    );

  const pair = (
    <>
      {word(first, "first")} {word(second, "second")}
    </>
  );

  // The copies hang off the line rather than sitting beside it, so they cannot push it off centre.
  // `whitespace-pre` keeps the space at their inner edge, which `nowrap` would trim at the line end.
  const copy = (side: "start" | "end") =>
    repeated ? (
      <span
        aria-hidden
        className={cx("absolute top-0 hidden whitespace-pre lg:block", side === "start" ? "right-full" : "left-full")}
      >
        {side === "end" && " "}
        {pair}
        {side === "start" && " "}
      </span>
    ) : null;

  const line = useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">(
      {
        className: cx(wordmarkStyles({ stacked, sunk }), repeated && "relative", className),
        // The one value that cannot be a utility class: it is measured off the words, not the theme.
        style: { "--wordmark-ratio": ratio } as React.CSSProperties,
        children: (
          <>
            {copy("start")}
            {pair}
            {copy("end")}
          </>
        ),
      },
      props
    ),
  });

  /*
    The box the line measures itself against; `clip` rather than `hidden` so the bleed cannot be
    scrolled to. The line centres as a flex item rather than with `text-align`, which a clipping
    parent would clamp to the left edge instead of letting it hang off both.
  */
  return <div className="@container flex w-full justify-center overflow-x-clip">{line}</div>;
};
