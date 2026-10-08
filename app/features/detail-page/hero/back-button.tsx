"use client";

import * as React from "react";
import { cx } from "@/app/features/style/cva";
import { ButtonLink } from "@/app/features/ui/button";

/** Trackpads and rubber-banding jitter by a few px, so ask for real travel before reading a direction. */
const DIRECTION_THRESHOLD = 4;

type Props = { className?: string };

/** Held back on arrival; it shows only once the reader has scrolled past the hero and heads back up. */
export const BackButton = ({ className }: Props) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero || revealed) return;

    let lastY = window.scrollY;
    let passedHero = false;
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (hero.getBoundingClientRect().bottom <= 0) passedHero = true;

      const y = window.scrollY;
      if (Math.abs(y - lastY) <= DIRECTION_THRESHOLD) return;
      if (passedHero && y < lastY) setRevealed(true);
      lastY = y;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [revealed]);

  return (
    <ButtonLink ref={ref} href="/" size="sm" className={cx(!revealed && "invisible", className)}>
      <span aria-hidden="true">←</span> Back
    </ButtonLink>
  );
};
