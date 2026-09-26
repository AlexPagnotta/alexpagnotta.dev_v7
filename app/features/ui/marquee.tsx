import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";

const marqueeStyles = cva({
  base: "w-full overflow-hidden border-black py-8 text-black",
  variants: {
    size: {
      sm: "h-56 border-b-2",
      lg: "h-64 border-y-2 lg:h-108 lg:py-16",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

// The row drifts by one of its two halves per loop; the time per character, measured in PP Frama, holds it near 50px/s.
const marqueeItemStyles = cva({
  base: [
    // `whitespace-pre` keeps the spaces around the separator, which are what space the repeats apart.
    "block w-max whitespace-pre [--drift-x:-50%]",
    "[--drift-duration:calc(var(--marquee-chars)*var(--marquee-char-time))]",
  ],
  variants: {
    size: {
      sm: "body-3 [--marquee-char-time:190ms]",
      lg: "heading-2 [--marquee-char-time:400ms] lg:[--marquee-char-time:630ms]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

// Characters per half, enough to cover a 4K-wide viewport at the smallest size.
const MIN_CHARS = 400;

export type MarqueeVariants = VariantProps<typeof marqueeItemStyles>;
export type MarqueeSize = NonNullable<MarqueeVariants["size"]>;

export type MarqueeProps = MarqueeVariants & {
  text: string;
  /** Mark repeated between copies of `text`. Omit for no separator. */
  separator?: string;
  play?: boolean;
  className?: string;
  /** Styles the row inside the band, apart from the element that drifts. */
  trackClassName?: string;
};

export const Marquee = ({ className, trackClassName, size = "sm", text, separator, play = true }: MarqueeProps) => {
  // The trailing space is what keeps the last repeat off the first one.
  const content = separator ? `${text} ${separator} ` : `${text} `;
  const half = content.repeat(Math.ceil(MIN_CHARS / content.length));

  return (
    <div className={cx(marqueeStyles({ size }), className)}>
      {/* The scrolling copy is repeated, so expose the text once to assistive tech instead. */}
      <span className="sr-only">{text}</span>
      <div aria-hidden="true" className={trackClassName}>
        <span
          className={cx(marqueeItemStyles({ size }), play && "motion-safe:animate-drift")}
          // The one value that cannot be a utility class: it is counted off the text.
          style={{ "--marquee-chars": half.length } as React.CSSProperties}
        >
          {half + half}
        </span>
      </div>
    </div>
  );
};
