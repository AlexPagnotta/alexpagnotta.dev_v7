"use client";

import { useReducedMotion } from "motion/react";
import ReactFastMarquee, { type MarqueeProps as ReactFastMarqueeProps } from "react-fast-marquee";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const marqueeStyles = cva({
  base: "py-16",
  variants: {
    variant: {
      dark: "bg-black text-cream",
      light: "text-black",
    },
  },
  defaultVariants: {
    variant: "dark",
  },
});

export type MarqueeProps = ReactFastMarqueeProps & VariantProps<typeof marqueeStyles>;

export const Marquee = ({ className, variant, play = true, children, ...props }: MarqueeProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cx(marqueeStyles({ variant }), className)}>
      <span className="sr-only">{children}</span>
      <ReactFastMarquee
        aria-hidden="true"
        autoFill
        className="overflow-y-hidden"
        play={play && !prefersReducedMotion}
        {...props}
      >
        <span className="title-2 flex items-center px-10 font-black">{children}</span>
      </ReactFastMarquee>
    </div>
  );
};
