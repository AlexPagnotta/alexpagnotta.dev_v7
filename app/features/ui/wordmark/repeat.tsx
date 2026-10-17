import { cx } from "@/app/features/style/cva";
import { type LetterSetting, WordmarkLetters } from "@/app/features/ui/wordmark/letters";

type Props = {
  side: "start" | "end";
  words: readonly [string, string];
  letters: LetterSetting;
};

// Hangs off the line so it cannot push it off centre; `whitespace-pre` keeps the inner space `nowrap` would trim.
export const WordmarkRepeat = ({ side, words: [first, second], letters }: Props) => {
  const length = first.length + 1 + second.length;
  // Positions carry on outward from the line, so the bend continues into the copies.
  const offset = side === "start" ? -(length + 1) : length + 1;

  return (
    <span
      aria-hidden="true"
      className={cx("absolute top-0 hidden whitespace-pre lg:block", side === "start" ? "right-full" : "left-full")}
    >
      {side === "end" && " "}
      <WordmarkLetters text={first} from={offset} {...letters} />{" "}
      <WordmarkLetters text={second} from={offset + first.length + 1} {...letters} />
      {side === "start" && " "}
    </span>
  );
};
