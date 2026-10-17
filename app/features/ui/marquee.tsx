import * as React from "react";
import { cssVars } from "@/app/features/style/css-vars";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import { BaseLink } from "@/app/features/ui/link";

const marqueeStyles = cva({
  base: [
    "group/marquee w-full overflow-hidden border-black text-black",
    // Inset, since the band runs edge to edge and an outer ring would fall off the viewport.
    "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-black",
  ],
  variants: {
    size: {
      sm: "flex h-48 items-center border-b-2 py-4",
      lg: "block h-64 border-y-2 py-8 lg:h-108 lg:py-16",
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
      sm: "body-2 [--marquee-char-time:211ms]",
      lg: "heading-2 [--marquee-char-time:400ms] lg:[--marquee-char-time:630ms]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

// Plain focus rather than `focus-visible`, so a tap holds the row on touch screens, which have no hover.
const pausedStyles = cx(
  "group-hover/marquee:[animation-play-state:paused]",
  "group-focus/marquee:[animation-play-state:paused]"
);

// Characters per half, enough to cover a 4K-wide viewport at the smallest size.
const MIN_CHARS = 400;

type MarqueeVariants = VariantProps<typeof marqueeItemStyles>;

export type MarqueeProps = MarqueeVariants & {
  text: string;
  /** Turns the whole band into a link, named by `text`. */
  href?: string;
  /** Mark repeated between copies of `text`. Omit for no separator. */
  separator?: string;
  play?: boolean;
  className?: string;
  /** Styles the row inside the band, apart from the element that drifts. */
  trackClassName?: string;
};

export const Marquee = ({
  className,
  trackClassName,
  size = "sm",
  text,
  href,
  separator,
  play = true,
}: MarqueeProps) => {
  const labelId = React.useId();
  // The trailing space is what keeps the last repeat off the first one.
  const content = separator ? `${text} ${separator} ` : `${text} `;
  const half = content.repeat(Math.ceil(MIN_CHARS / content.length));

  const children = (
    <>
      {/* The scrolling copy is repeated, so expose the text once to assistive tech instead. */}
      <span id={labelId} className="sr-only">
        {text}
      </span>
      <div aria-hidden="true" className={trackClassName}>
        <span
          className={cx(marqueeItemStyles({ size }), play && ["motion-safe:animate-drift", pausedStyles])}
          style={cssVars({ "--marquee-chars": half.length })}
        >
          {half + half}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <BaseLink href={href} className={cx(marqueeStyles({ size }), className)}>
        {children}
      </BaseLink>
    );
  }

  return (
    <div
      role="marquee"
      aria-labelledby={labelId}
      // Moving text needs a way to stop it (WCAG 2.2.2), and focus is how a keyboard holds the row.
      tabIndex={play ? 0 : undefined}
      className={cx(marqueeStyles({ size }), className)}
    >
      {children}
    </div>
  );
};
