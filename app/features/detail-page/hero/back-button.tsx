"use client";

import * as React from "react";
import { cx } from "@/app/features/style/cva";
import { ButtonLink } from "@/app/features/ui/button";
import { createScrollDirection, onScrollFrame } from "@/app/features/utils/scroll";

type Props = { className?: string };

/** Held back on arrival; it shows only once the reader has scrolled past the hero and heads back up. */
export const BackButton = ({ className }: Props) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero || revealed) return;

    const readDirection = createScrollDirection();
    let passedHero = false;

    return onScrollFrame(() => {
      if (hero.getBoundingClientRect().bottom <= 0) passedHero = true;
      if (readDirection() === "up" && passedHero) setRevealed(true);
    }).stop;
  }, [revealed]);

  return (
    <ButtonLink ref={ref} href="/" size="sm" className={cx(!revealed && "invisible", className)}>
      <span aria-hidden="true">←</span> Back
    </ButtonLink>
  );
};
