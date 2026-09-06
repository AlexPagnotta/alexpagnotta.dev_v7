"use client";

import { useReducedMotion } from "motion/react";
import ReactFastMarquee, { type MarqueeProps as ReactFastMarqueeProps } from "react-fast-marquee";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const marqueeStyles = "w-full border-y-2 border-black py-4 text-black";

const marqueeItemStyles = cva({
  // `whitespace-pre` keeps the spaces around the separator, which are what space the repeats apart.
  base: "whitespace-pre",
  variants: {
    size: {
      sm: "body-3",
      lg: "headline-2",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type MarqueeVariants = VariantProps<typeof marqueeItemStyles>;
export type MarqueeSize = NonNullable<MarqueeVariants["size"]>;

export type MarqueeProps = Omit<ReactFastMarqueeProps, "children"> &
  MarqueeVariants & {
    text: string;
    /** Mark repeated between copies of `text`. Omit for no separator. */
    separator?: string;
  };

export const Marquee = ({ className, size = "sm", text, separator, play = true, ...props }: MarqueeProps) => {
  const prefersReducedMotion = useReducedMotion();
  // The trailing space is what keeps the last repeat off the first one.
  const content = separator ? `${text} ${separator} ` : `${text} `;

  return (
    <div className={cx(marqueeStyles, className)}>
      {/* The scrolling copy is repeated, so expose the text once to assistive tech instead. */}
      <span className="sr-only">{text}</span>
      <ReactFastMarquee
        aria-hidden="true"
        autoFill
        className="overflow-y-hidden"
        play={play && !prefersReducedMotion}
        {...props}
      >
        <span className={marqueeItemStyles({ size })}>{content}</span>
      </ReactFastMarquee>
    </div>
  );
};
