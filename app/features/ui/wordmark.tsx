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
    "[--wordmark-size:min(var(--text-display-1),max(var(--text-display-1-mobile),var(--wordmark-fit)))]",
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
const wordStyles = cx(
  "tracking-xs drop-shadow-depth-6 lg:drop-shadow-depth-12",
  "bg-(image:--wordmark-fill) bg-clip-text text-transparent",
  "[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:var(--color-black)]"
);

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
  };

/** A pair of words at display size, held wider than the viewport until it reaches `display-1`. */
export const Wordmark = ({
  words: [first, second],
  ratio,
  className,
  stacked,
  sunk,
  repeated,
  render,
  ...props
}: WordmarkProps) => {
  const pair = (
    <>
      <span className={cx(wordStyles, stacked && "max-md:-ml-24")}>{first}</span>{" "}
      <span className={cx(wordStyles, stacked && "max-md:ml-63")}>{second}</span>
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
