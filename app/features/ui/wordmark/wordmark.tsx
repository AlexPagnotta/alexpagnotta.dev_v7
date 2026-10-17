import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cssVars } from "@/app/features/style/css-vars";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import type { LetterSetting } from "@/app/features/ui/wordmark/letters";
import { WordmarkRepeat } from "@/app/features/ui/wordmark/repeat";
import { WordmarkWord } from "@/app/features/ui/wordmark/word";

// Sized from the width to cover divided by `ratio`, clamped between the two `display-1` cuts.
const wordmarkStyles = cva({
  base: [
    // The line carries the size so the space between the words scales with them, and the tracking so
    // that space is tracked like the letters are.
    "font-sans font-black tracking-xs whitespace-nowrap text-center",
    // After the size, which tailwind-merge would otherwise let reset the leading.
    "text-(length:--wordmark-size) leading-none [--wordmark-bleed:calc(69*var(--spacing))]",
    "[--wordmark-fit:calc((100cqw+2*var(--wordmark-bleed))/var(--wordmark-ratio))]",
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
      true: "mb-[-0.3em]",
      false: "",
    },
  },
  defaultVariants: {
    stacked: false,
    sunk: false,
  },
});

type WordmarkVariants = VariantProps<typeof wordmarkStyles>;

export type WordmarkProps = useRender.ComponentProps<"p"> &
  WordmarkVariants & {
    /** The pair to set, the second sitting under the first when `stacked`. */
    words: readonly [string, string];
    /** How wide the spaced pair runs per 1px of font size, measured in the browser for these exact words. */
    ratio: number;
    /** Kerning pairs in em, measured like `ratio`, since a letter in its own box loses the font's kerning. */
    kerning?: Readonly<Record<string, number>>;
    /** Flanks the line with a copy each side from `lg`, so a viewport wider than the capped line reads as a band. */
    repeated?: boolean;
    /** With `stacked`, runs each word along its row on phones and drifts the rows apart in a seamless loop. */
    drift?: boolean;
    /** With `stacked`, slides the rows to each other's offset as the page scrolls. */
    slideOnScroll?: boolean;
    /** From `md`, drops the letters as the page scrolls, more the further they sit from the centre, bending the line. */
    bendOnScroll?: boolean;
  };

/** A pair of words at display size, held wider than the viewport until it reaches `display-1`. */
export const Wordmark = ({
  words,
  ratio,
  kerning = {},
  className,
  stacked,
  sunk,
  repeated,
  drift,
  slideOnScroll,
  bendOnScroll,
  render,
  ...props
}: WordmarkProps) => {
  const [first, second] = words;
  const slide = stacked && slideOnScroll;
  const drifting = stacked && drift;

  // Positions count characters along the line, the space between the words included.
  const length = first.length + 1 + second.length;
  const letters: LetterSetting = { kerning, bend: bendOnScroll, centre: (length - 1) / 2 };
  const rowProps = { letters, stacked, drift: drifting, slide };

  const line = useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">(
      {
        className: cx(wordmarkStyles({ stacked, sunk }), repeated && "relative", className),
        style: cssVars({ "--wordmark-ratio": ratio }),
        children: (
          <>
            {repeated && <WordmarkRepeat side="start" words={words} letters={letters} />}
            <WordmarkWord value={first} row="first" from={0} {...rowProps} />{" "}
            <WordmarkWord value={second} row="second" from={first.length + 1} {...rowProps} />
            {repeated && <WordmarkRepeat side="end" words={words} letters={letters} />}
          </>
        ),
      },
      props
    ),
  });

  // `clip` so the bleed cannot be scrolled to; centred as a flex item, which `text-align` would clamp to the left edge.
  return <div className="@container flex w-full justify-center overflow-x-clip">{line}</div>;
};
