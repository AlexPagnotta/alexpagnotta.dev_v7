import type * as React from "react";
import { cx } from "@/app/features/style/cva";

export type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

/** The detail pages' body column: the flex gap is the wide step, and closer relationships pull back with margins. */
export const Prose = ({ children, className }: ProseProps) => (
  <div
    className={cx(
      // The wide step: prose to media.
      "flex flex-col gap-64 lg:gap-80",
      // Running text, lists and asides included, closes up to about one line of leading.
      "[&>:is(p,ul,ol,[data-aside])+:is(p,ul,ol,[data-aside])]:-mt-40",
      "lg:[&>:is(p,ul,ol,[data-aside])+:is(p,ul,ol,[data-aside])]:-mt-48",
      // A section break takes the wide step above, and the tightest below.
      "[&_h2+*]:-mt-40 lg:[&_h2+*]:-mt-56",
      className
    )}
  >
    {children}
  </div>
);
