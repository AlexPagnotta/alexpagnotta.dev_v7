"use client";

import { motion, type Transition, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as React from "react";
import { cx } from "@/app/features/style/utils";

const LABEL = "OPEN";

// Tilt at either edge of the card; the pill runs level through the middle.
const MAX_ROTATION = 14;

const followSpring = { stiffness: 500, damping: 40, mass: 0.4 };

const revealSpring: Transition = { type: "spring", stiffness: 600, damping: 32, mass: 0.5 };

// Tailwind's translate is its own CSS property, so it composes with the transform motion drives.
const pillStyles = cx(
  "pointer-events-none absolute top-0 left-0 -translate-x-1/2 translate-y-24",
  "inline-flex items-center rounded-full border border-black px-24 py-8",
  "body-2 whitespace-nowrap bg-white text-black shadow-depth-md shadow-black/25"
);

export type CardCursorProps = {
  fill?: string;
};

/** Tracks the pointer across its own layer, so it has to fill the card it belongs to. */
export const CardCursor = ({ fill }: CardCursorProps) => {
  const [visible, setVisible] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const options = prefersReducedMotion ? { duration: 0 } : followSpring;
  const springX = useSpring(x, options);
  const springY = useSpring(y, options);
  const springRotate = useSpring(rotate, options);

  const positionIn = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;

    return {
      x: offsetX,
      y: event.clientY - bounds.top,
      rotate: (offsetX / bounds.width - 0.5) * 2 * MAX_ROTATION,
    };
  };

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    const next = positionIn(event);
    x.set(next.x);
    y.set(next.y);
    rotate.set(next.rotate);
  };

  const reveal = (event: React.PointerEvent<HTMLDivElement>) => {
    const next = positionIn(event);
    x.jump(next.x);
    y.jump(next.y);
    rotate.jump(next.rotate);
    // Without this the pill springs in from wherever the pointer last left the card.
    springX.jump(next.x);
    springY.jump(next.y);
    springRotate.jump(next.rotate);
    setVisible(true);
  };

  return (
    <div
      aria-hidden
      className="absolute inset-0 z-20 rounded-lg pointer-coarse:hidden"
      onPointerEnter={reveal}
      onPointerMove={track}
      onPointerLeave={() => setVisible(false)}
    >
      <motion.span
        className={pillStyles}
        style={{ x: springX, y: springY, rotate: springRotate, backgroundColor: fill }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
        transition={prefersReducedMotion ? { duration: 0 } : revealSpring}
      >
        {LABEL}
      </motion.span>
    </div>
  );
};
