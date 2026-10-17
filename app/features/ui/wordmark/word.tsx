import { cx } from "@/app/features/style/cva";
import { type LetterSetting, WordmarkLetters, WordmarkText } from "@/app/features/ui/wordmark/letters";

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

type Props = {
  value: string;
  row: "first" | "second";
  /** Where the word starts along the line, in characters. */
  from: number;
  letters: LetterSetting;
  stacked?: boolean;
  drift?: boolean;
  slide?: boolean;
};

/** One of the pair; drifting, it runs along its row and only the first run is the heading's text. */
export const WordmarkWord = ({ value, row, from, letters, stacked, drift, slide }: Props) => {
  const text = <WordmarkText text={value} from={from} {...letters} />;

  if (!drift) return <span className={cx(stacked && offsetStyles[row], slide && slideStyles[row])}>{text}</span>;

  return (
    <span className={cx(offsetStyles[row], slide && slideStyles[row])}>
      <span className={cx(trackStyles, driftStyles[row])}>
        <span aria-hidden="true" className={leadStyles}>
          <WordmarkLetters text={`${value} `.repeat(RUNS)} {...letters} />
        </span>
        {text}
        <span aria-hidden="true" className="md:hidden">
          <WordmarkLetters text={`${` ${value}`.repeat(RUNS - 1)} `} {...letters} />
        </span>
      </span>
    </span>
  );
};
