import type * as React from "react";
import { cx } from "@/app/features/style/cva";

export type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * The body column both detail pages render their markdown into. The flex gap sets the wide
 * step, used wherever prose meets something that is not prose; every other relationship
 * pulls back from it with a margin that stacks on top.
 */
export const Prose = ({ children, className }: ProseProps) => (
  <div
    className={cx(
      // The wide step: prose to media.
      "flex flex-col gap-64 lg:gap-80",
      /*
        Running text closes up to roughly one line of leading, so consecutive paragraphs read
        as one argument rather than as separate cards. A list counts as running text: it is
        nearly always introduced by the line above it. So does an aside, which wraps a passage.
      */
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
