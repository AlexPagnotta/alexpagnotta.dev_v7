import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import a from "./extrusions/a.svg?url";
import e from "./extrusions/e.svg?url";
import g from "./extrusions/g.svg?url";
import l from "./extrusions/l.svg?url";
import n from "./extrusions/n.svg?url";
import o from "./extrusions/o.svg?url";
import p from "./extrusions/p.svg?url";
import t from "./extrusions/t.svg?url";
import x from "./extrusions/x.svg?url";

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

/*
  The fill is a background clipped to the glyphs, set by the caller through `--wordmark-fill`. The
  stroke paints over its inner edge, so it runs at Figma's visible 2px rather than twice that.
*/
const glyphStyles = cx(
  "tracking-xs bg-(image:--wordmark-fill) bg-clip-text text-transparent",
  "[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:var(--color-black)]"
);

// Black glyphs overhang their advance, and the background only paints inside the box, so it is widened past them.
const inkBleedStyles = "px-[0.25em] -mx-[0.25em]";

const faceStyles = cx(glyphStyles, inkBleedStyles, "relative");

// Each letter is its own box so it can carry its own kerning, bend and extrusion.
const letterStyles = cx("relative inline-block ml-(--kern)", "md:data-bend:scroll-bend");

// The extrusion SVG spans 3em from 1em before the glyph origin, matching its viewBox.
const extrusionStyles = cx(
  "before:pointer-events-none before:absolute before:-top-[1em] before:-left-[1em] before:size-[3em]",
  "before:bg-(image:--extrusion) before:bg-cover before:bg-no-repeat before:content-['']"
);

const EXTRUSIONS = { A: a, E: e, G: g, L: l, N: n, O: o, P: p, T: t, X: x } as Readonly<Record<string, typeof a>>;

const extrusionFor = (letter: string) => {
  const src = EXTRUSIONS[letter];
  return src && `url(${typeof src === "string" ? src : src.src})`;
};

// Runs of each word along a drifting row; the drift loops by exactly one run, a third of the track.
const RUNS = 3;

// Hangs off a row's start to cover what the drift and slide expose there.
const leadStyles = "absolute top-0 right-full whitespace-pre md:hidden";

// Inline boxes ignore `translate`, so the track is an inline-block sized by its runs alone.
const trackStyles = "max-md:relative max-md:inline-block max-md:whitespace-pre";

const driftStyles = {
  first: cx("max-md:motion-safe:animate-drift", "max-md:[--drift-x:calc(100%/3)]"),
  second: cx("max-md:motion-safe:animate-drift", "max-md:[--drift-x:calc(-100%/3)]"),
};

// Both rows travel the same distance in opposite directions.
const slideStyles = {
  first: cx("max-md:scroll-slide-x", "max-md:[--scroll-slide-x:--spacing(320)]"),
  second: cx("max-md:scroll-slide-x", "max-md:[--scroll-slide-x:--spacing(-320)]"),
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
     * Kerning pairs in em, measured in the browser like `ratio`. Each letter is set in its own box, which
     * loses the font's own kerning, so it is put back from these.
     */
    kerning?: Readonly<Record<string, number>>;
    /**
     * Flanks the line with a copy each side from `lg`, so a viewport wider than the capped line still
     * reads as a full band rather than one centred line between two empty gutters.
     */
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
  words: [first, second],
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
  const slide = stacked && slideOnScroll;
  const drifting = stacked && drift;

  // Positions count characters along the line, the space between the words included, so the copies carry on outward.
  const length = first.length + 1 + second.length;
  const centre = (length - 1) / 2;
  const start = { first: 0, second: first.length + 1 };

  // Without `from` the letters only fill a row, which never bends.
  const letters = (text: string, from?: number) =>
    [...text].map((letter, index, chars) =>
      letter === " " ? (
        " "
      ) : (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: the letters never reorder.
          key={index}
          data-bend={bendOnScroll && from !== undefined ? "" : undefined}
          className={cx(letterStyles, extrusionStyles)}
          style={
            {
              "--extrusion": extrusionFor(letter),
              "--kern": `${kerning[`${chars[index - 1]}${letter}`] ?? 0}em`,
              "--bend-x": from === undefined ? undefined : (from + index - centre) / centre,
            } as React.CSSProperties
          }
        >
          <span className={faceStyles}>{letter}</span>
        </span>
      )
    );

  // Split into letters, so the word is exposed once to assistive tech instead.
  const text = (value: string, row: "first" | "second") => (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{letters(value, start[row])}</span>
    </>
  );

  // The first run is the heading's text; the rest only fill the row, so they stay out of its name.
  const word = (value: string, row: "first" | "second") =>
    drifting ? (
      <span className={cx(offsetStyles[row], slide && slideStyles[row])}>
        <span className={cx(trackStyles, driftStyles[row])}>
          <span aria-hidden className={leadStyles}>
            {letters(`${value} `.repeat(RUNS))}
          </span>
          {text(value, row)}
          <span aria-hidden className="md:hidden">
            {letters(`${` ${value}`.repeat(RUNS - 1)} `)}
          </span>
        </span>
      </span>
    ) : (
      <span className={cx(stacked && offsetStyles[row], slide && slideStyles[row])}>{text(value, row)}</span>
    );

  const pair = (
    <>
      {word(first, "first")} {word(second, "second")}
    </>
  );

  // The copies hang off the line rather than sitting beside it, so they cannot push it off centre.
  // `whitespace-pre` keeps the space at their inner edge, which `nowrap` would trim at the line end.
  const copy = (side: "start" | "end") => {
    const offset = side === "start" ? -(length + 1) : length + 1;
    return repeated ? (
      <span
        aria-hidden
        className={cx("absolute top-0 hidden whitespace-pre lg:block", side === "start" ? "right-full" : "left-full")}
      >
        {side === "end" && " "}
        {letters(first, offset + start.first)} {letters(second, offset + start.second)}
        {side === "start" && " "}
      </span>
    ) : null;
  };

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
