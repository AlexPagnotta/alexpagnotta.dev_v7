import { cx } from "@/app/features/style/utils";

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
      "flex flex-col gap-40 lg:gap-64",
      /*
        Running text closes up to roughly one line of leading, so consecutive paragraphs read
        as one argument rather than as separate cards. A list counts as running text: it is
        nearly always introduced by the line above it.
      */
      "[&_:is(p,ul,ol)+:is(p,ul,ol)]:-mt-8 lg:[&_:is(p,ul,ol)+:is(p,ul,ol)]:-mt-28",
      // A section break takes the widest step above, and the tightest below.
      "[&_h2:not(:first-child)]:mt-24 lg:[&_h2:not(:first-child)]:mt-32",
      "[&_h2+*]:-mt-16 lg:[&_h2+*]:-mt-24",
      className
    )}
  >
    {children}
  </div>
);
