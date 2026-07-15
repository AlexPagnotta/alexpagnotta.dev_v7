"use client";

import { motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { cx } from "@/app/features/style/utils";

/*
  A fanned stack of cards. The front card is whatever the consumer puts in
  `content` (typically a link); the areas either side of the stack are the
  prev/next controls, so the card itself stays a single uninterrupted target.

  Cycling is two-phase on purpose. A card leaving the front has to stay above
  the stack while it slides clear, then drop below it to tuck back in — there is
  no single tween that can flip z-index halfway. So `out` slides the card to
  SLIDE_X, and completing that rotates the order, which retargets the same card
  at the back of the stack and lets motion animate it home. `prev` is the same
  path played in reverse.
*/

const VISIBLE = 3;
const OFFSET_X = 16;
const OFFSET_Y = 12;
const OFFSET_ROTATE = 4;
// Card width plus clearance, so the card is provably clear of the stack before
// its z-index flips. Negative: the stack fans right, cards leave to the left.
const SLIDE_X = -430;

type Direction = "next" | "prev";
type Anim = { id: string; dir: Direction; phase: "out" | "in" } | null;

const rotateForward = (ids: readonly string[]) => [...ids.slice(1), ids[0]];
const rotateBackward = (ids: readonly string[]) => [ids[ids.length - 1], ...ids.slice(0, -1)];

export type StackedCarouselItem = {
  id: string;
  content: React.ReactNode;
};

export type StackedCarouselProps = {
  items: readonly StackedCarouselItem[];
  label: string;
  prevLabel: string;
  nextLabel: string;
  className?: string;
  /* Sizes the stack: applied to every card and to the spacer that gives the stack its box. */
  cardClassName?: string;
};

export const StackedCarousel = ({
  items,
  label,
  prevLabel,
  nextLabel,
  className,
  cardClassName,
}: StackedCarouselProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [order, setOrder] = React.useState(() => items.map((item) => item.id));
  const [anim, setAnim] = React.useState<Anim>(null);

  /*
    Resync when the items change. Also the escape hatch if an exit animation is
    ever cancelled without completing — `anim` would otherwise latch on and both
    controls would early-return forever.
  */
  const itemsKey = items.map((item) => item.id).join("|");
  // biome-ignore lint/correctness/useExhaustiveDependencies: itemsKey is the serialised identity of items.
  React.useEffect(() => {
    setOrder(items.map((item) => item.id));
    setAnim(null);
  }, [itemsKey]);

  const go = (dir: Direction) => {
    // Locked for the whole cycle, including the tuck-back — interrupting it
    // would strand the travelling card outside the stack.
    if (anim || items.length < 2) return;

    if (prefersReducedMotion) {
      setOrder(dir === "next" ? rotateForward : rotateBackward);
      return;
    }

    const id = dir === "next" ? order[0] : order[order.length - 1];
    setAnim({ id, dir, phase: "out" });
  };

  const handleAnimationComplete = (id: string) => {
    if (!anim || anim.id !== id) return;

    if (anim.phase === "out") {
      // Batches into a single commit, so there is no frame where the order has
      // rotated but the card is still targeting SLIDE_X.
      setOrder(anim.dir === "next" ? rotateForward : rotateBackward);
      setAnim({ ...anim, phase: "in" });
      return;
    }

    setAnim(null);
  };

  return (
    /*
      A labelled section is the APG carousel container: it carries an implicit
      region role, so aria-roledescription has something to rename.
    */
    <section
      className={cx("flex items-stretch justify-center", className)}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => go("prev")}
        aria-label={prevLabel}
        disabled={items.length < 2}
        className="flex-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      />
      <div className="relative shrink-0">
        {/* Gives the stack its box; the cards themselves are absolutely positioned. */}
        <div aria-hidden="true" className={cx("invisible", cardClassName)} />
        {/*
          Mapped over `items` rather than `order` so the DOM order never changes —
          only the transforms and z-index do.
        */}
        {items.map((item) => {
          const depth = order.indexOf(item.id);
          // Cards deeper than the visible window sit exactly on the last visible
          // card and hide, so a stack of any size fans the same way.
          const visualDepth = Math.min(depth, VISIBLE - 1);
          const isAnimating = anim?.id === item.id;
          const isOut = isAnimating && anim?.phase === "out";
          const isFront = depth === 0 && !anim;

          return (
            <motion.div
              key={item.id}
              className={cx("absolute inset-0", cardClassName)}
              /*
                z-index has to be a raw style: it is derived from state, the
                theme resets the named z-index scale, and in `animate` motion
                would interpolate it to fractional values that browsers drop.
              */
              style={{ zIndex: items.length - depth }}
              initial={false}
              animate={
                isOut
                  ? { x: SLIDE_X, y: 0, rotate: 0, opacity: 1 }
                  : {
                      x: visualDepth * OFFSET_X,
                      y: visualDepth * OFFSET_Y,
                      rotate: visualDepth * OFFSET_ROTATE,
                      // Kept visible while travelling, so a card tucking back
                      // past the visible window doesn't blink out mid-flight.
                      opacity: depth < VISIBLE || isAnimating ? 1 : 0,
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : isOut
                    ? { duration: 0.28, ease: "easeIn", opacity: { duration: 0 } }
                    : { duration: 0.42, ease: "easeOut" }
              }
              onAnimationComplete={() => handleAnimationComplete(item.id)}
              // Only the front card is reachable; back cards are inert so their
              // links can't be clicked or tabbed to through the stack.
              inert={!isFront}
              data-front={isFront}
              data-depth={depth}
            >
              {item.content}
            </motion.div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => go("next")}
        aria-label={nextLabel}
        disabled={items.length < 2}
        className="flex-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      />
    </section>
  );
};
