"use client";

import { useReducedMotion } from "motion/react";
import ReactFastMarquee, { type MarqueeProps as ReactFastMarqueeProps } from "react-fast-marquee";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";
import { useIsClient } from "@/app/features/utils/use-is-client";

/*
  The band's height is set per size rather than left to the row inside it. react-fast-marquee
  measures its own content before it renders any, so on the swap from the static row the band
  would otherwise collapse to its borders for a frame and drag the whole page up with it.
*/
const marqueeStyles = cva({
  base: "w-full overflow-hidden border-y-2 border-black py-4 text-black",
  variants: {
    size: {
      sm: "h-44 lg:h-48",
      lg: "h-76 lg:h-114",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

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
  const isClient = useIsClient();
  // The trailing space is what keeps the last repeat off the first one.
  const content = separator ? `${text} ${separator} ` : `${text} `;

  return (
    <div className={cx(marqueeStyles({ size }), className)}>
      {/* The scrolling copy is repeated, so expose the text once to assistive tech instead. */}
      <span className="sr-only">{text}</span>
      {isClient ? (
        <ReactFastMarquee
          aria-hidden="true"
          autoFill
          className="overflow-y-hidden"
          play={play && !prefersReducedMotion}
          {...props}
        >
          <span className={marqueeItemStyles({ size })}>{content}</span>
        </ReactFastMarquee>
      ) : (
        // react-fast-marquee measures its content before rendering anything, so the band
        // would collapse to its borders until hydration; one static row holds the height.
        <span aria-hidden="true" className={cx(marqueeItemStyles({ size }), "block")}>
          {content}
        </span>
      )}
    </div>
  );
};
