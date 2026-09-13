import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

// What a space and its tracking cost the ratio below, which holds for any words either side of it.
const SPACE_RATIO = 0.2;

/*
  The line is sized from the width it should cover rather than from a type token: dividing that width
  by the ratio gives the size that fills it, bleed and all. It stops at `display-1`, past which the
  line sits in full and the gutters grow around it instead.
*/
const wordmarkStyles = cva({
  base: [
    // The line carries the size so the space between the words scales with them, and the tracking so
    // that space is tracked like the letters are.
    "font-sans leading-xs tracking-xs whitespace-nowrap text-center",
    "text-(length:--wordmark-size) [--wordmark-bleed:calc(69*var(--spacing))]",
    "[--wordmark-size:min(var(--text-display-1),calc((100cqw_+_2*var(--wordmark-bleed))/var(--wordmark-ratio)))]",
  ],
  variants: {
    // Below `md` the words split onto their own cuts, each held at its own token size.
    stacked: {
      true: "flex flex-col items-center md:block max-md:[--wordmark-size:var(--text-display-2-mobile)]",
      false: "",
    },
    // Drops the line past the bottom of whatever clips it, so that edge crops the letters.
    sunk: {
      true: "-mb-[0.45em]",
      false: "",
    },
  },
  defaultVariants: {
    stacked: false,
    sunk: false,
  },
});

// Tracking and stroke are both `em`, and the words are sized apart when stacked, so they sit on the words.
const wordStyles = cx(
  "tracking-xs drop-shadow-depth-md sm:drop-shadow-depth-lg [paint-order:stroke_fill]",
  "[-webkit-text-stroke-width:0.023em] [-webkit-text-stroke-color:var(--color-black)]"
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
    /** Runs the words together, with no space between them. */
    joined?: boolean;
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
  joined,
  sunk,
  repeated,
  render,
  ...props
}: WordmarkProps) => {
  const pair = (start: string, end: string) => (
    <>
      <span className={cx(wordStyles, stacked && "max-md:text-(length:--text-display-1-mobile)")}>{start}</span>
      {!joined && " "}
      {/* Stacked, the second word tucks up under the first. */}
      <span className={cx(wordStyles, stacked && "max-md:mt-[-0.444em]")}>{end}</span>
    </>
  );

  /*
    Where the pair ends on the letter it starts with, the copies drop it so the band reads as one run:
    ALEX PAGNOTT-A-LEX PAGNOTT-A-LEX PAGNOTTA. They hang off the line rather than sitting beside it,
    because the two kern differently at the join and would otherwise push the line off centre.
  */
  const shared = second.at(-1) === first.at(0) ? 1 : 0;
  const copy = (start: string, end: string, side: string) =>
    repeated ? (
      <span aria-hidden className={cx("absolute top-0 hidden lg:block", side)}>
        {pair(start, end)}
      </span>
    ) : null;

  const line = useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">(
      {
        className: cx(wordmarkStyles({ stacked, sunk }), repeated && "relative", className),
        // The one value that cannot be a utility class: it is measured off the words, not the theme.
        style: { "--wordmark-ratio": joined ? ratio - SPACE_RATIO : ratio } as React.CSSProperties,
        children: (
          <>
            {copy(first, second.slice(0, second.length - shared), "right-full")}
            {pair(first, second)}
            {copy(first.slice(shared), second, "left-full")}
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
