"use client";

import { useReducedMotion } from "motion/react";
import ReactFastMarquee, { type MarqueeProps as ReactFastMarqueeProps } from "react-fast-marquee";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const marqueeStyles = cva({
  base: "",
  variants: {
    variant: {
      dark: "bg-black text-cream",
      light: "text-black",
      yellow: "bg-yellow text-black",
    },
    size: {
      md: "py-16",
      lg: "py-32",
    },
  },
  defaultVariants: {
    variant: "dark",
    size: "md",
  },
});

const marqueeTextStyles = cva({
  base: "flex items-center px-10 font-black",
  variants: {
    size: {
      md: "title-2",
      lg: "title-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MarqueeProps = ReactFastMarqueeProps & VariantProps<typeof marqueeStyles>;

export const Marquee = ({ className, style, variant, size, play = true, children, ...props }: MarqueeProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cx(marqueeStyles({ variant, size }), className)} style={style}>
      <span className="sr-only">{children}</span>
      <ReactFastMarquee
        aria-hidden="true"
        autoFill
        className="overflow-y-hidden"
        play={play && !prefersReducedMotion}
        {...props}
      >
        <span className={marqueeTextStyles({ size })}>{children}</span>
      </ReactFastMarquee>
    </div>
  );
};
