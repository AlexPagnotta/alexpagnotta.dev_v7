"use client";

import { m, type Transition } from "motion/react";
import * as React from "react";
import { useCentredCard } from "@/app/features/home-page/feed/card-cursor/use-centred-card";
import { useCursorPill } from "@/app/features/home-page/feed/card-cursor/use-cursor-pill";
import { cx } from "@/app/features/style/cva";

const LABEL = "OPEN";

const revealSpring: Transition = { type: "spring", stiffness: 600, damping: 32, mass: 0.5 };

// Tailwind's translate is its own CSS property, so it composes with the transform motion drives.
const pillStyles = cx(
  // Hangs straight off the pointer and pivots there, so the tilt keeps it attached.
  "pointer-events-none fixed top-0 left-0 z-1 origin-top -translate-x-1/2",
  "inline-flex items-center rounded-full border border-black px-24 py-8",
  "label-2 whitespace-nowrap bg-white text-black shadow-depth-4 shadow-black/10",
  // CSS rather than motion, since the fill arrives as a `var()` it would have to resolve first.
  "transition-colors duration-300 ease-out"
);

type Props = { children: React.ReactNode };

/** One pill shared by every card inside, so it carries across the gaps between them. */
export const CardCursorProvider = ({ children }: Props) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const { visible, pressed, fill, x, y, rotate } = useCursorPill(rootRef);
  useCentredCard(rootRef);

  return (
    <>
      {/* Hides the system cursor through the gaps too, while the pill stands in for it. */}
      <div ref={rootRef} className={cx(visible && "cursor-none")}>
        {children}
      </div>
      <m.span
        aria-hidden="true"
        className={pillStyles}
        style={{ x, y, rotate, backgroundColor: fill }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? (pressed ? 0.85 : 1) : 0.8 }}
        transition={revealSpring}
      >
        {LABEL}
      </m.span>
    </>
  );
};
