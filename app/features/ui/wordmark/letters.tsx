import { cssVars } from "@/app/features/style/css-vars";
import { cx } from "@/app/features/style/cva";
import { SplitLetters, SplitText } from "@/app/features/ui/split-text";
import { extrusionFor } from "@/app/features/ui/wordmark/extrusions";

// The fill is a background clipped to the glyphs; the stroke paints over its inner edge, so 2px reads as Figma's 2px.
const glyphStyles = "tracking-xs bg-(image:--wordmark-fill) bg-clip-text text-transparent glyph-stroke-2";

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

export type LetterSetting = {
  kerning: Readonly<Record<string, number>>;
  bend?: boolean;
  /** The centre of the whole line, in characters, that `--bend-x` is measured from. */
  centre: number;
};

type Props = LetterSetting & {
  text: string;
  /** Where `text` starts along the line; without it the letters only fill a row, which never bends. */
  from?: number;
};

const letterRenderer = ({ kerning, bend, centre }: LetterSetting, text: string, from?: number) => {
  const chars = [...text];

  return (letter: string, index: number) =>
    letter === " " ? (
      " "
    ) : (
      <span
        data-bend={bend && from !== undefined ? "" : undefined}
        className={cx(letterStyles, extrusionStyles)}
        style={cssVars({
          "--extrusion": extrusionFor(letter),
          "--kern": `${kerning[`${chars[index - 1]}${letter}`] ?? 0}em`,
          "--bend-x": from === undefined ? undefined : (from + index - centre) / centre,
        })}
      >
        <span className={faceStyles}>{letter}</span>
      </span>
    );
};

/** Letters that only paint, for the copies that fill a row around the real text. */
export const WordmarkLetters = ({ text, from, ...setting }: Props) => (
  <SplitLetters text={text}>{letterRenderer(setting, text, from)}</SplitLetters>
);

/** The heading's own text, read once by assistive tech. */
export const WordmarkText = ({ text, from, ...setting }: Props) => (
  <SplitText text={text}>{letterRenderer(setting, text, from)}</SplitText>
);
