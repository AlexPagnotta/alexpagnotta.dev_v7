import * as React from "react";

type SplitLettersProps = {
  text: string;
  children: (letter: string, index: number) => React.ReactNode;
};

/** Renders each character of `text` through `children`, so an effect can move every letter on its own. */
export const SplitLetters = ({ text, children }: SplitLettersProps) =>
  [...text].map((letter, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: the letters never reorder.
    <React.Fragment key={index}>{children(letter, index)}</React.Fragment>
  ));

export type SplitTextProps = SplitLettersProps & { className?: string };

/** `SplitLetters` with the text exposed once to assistive tech, rather than letter by letter. */
export const SplitText = ({ text, className, children }: SplitTextProps) => (
  <>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true" className={className}>
      <SplitLetters text={text}>{children}</SplitLetters>
    </span>
  </>
);
