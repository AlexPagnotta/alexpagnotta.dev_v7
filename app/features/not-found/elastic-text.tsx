"use client";

import {
  domAnimation,
  LazyMotion,
  type MotionValue,
  m,
  motionValue,
  type SpringOptions,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";
import { cx } from "@/app/features/style/cva";

const RADIUS = 220;
const MAX_PUSH = 64;
const TILT = 0.25;

const pushSpring: SpringOptions = { stiffness: 360, damping: 13, mass: 1 };

type Point = { x: number; y: number };
type Target = { x: MotionValue<number>; y: MotionValue<number> };

const glyphStyles = cx(
  "inline-block text-white",
  "[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:var(--color-black)]",
  "px-[0.08em] -mx-[0.08em] will-change-transform"
);

type LetterProps = { children: string; target: Target };

const Letter = ({ children, target }: LetterProps) => {
  const x = useSpring(target.x, pushSpring);
  const y = useSpring(target.y, pushSpring);
  const rotate = useTransform(x, (value) => value * TILT);

  return (
    <m.span data-letter style={{ x, y, rotate }} className={glyphStyles}>
      {children}
    </m.span>
  );
};

type ElasticTextProps = { words: string[]; className?: string };

export const ElasticText = ({ words, className }: ElasticTextProps) => {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  // Where each letter is pushed to; its springs chase the target, so the effect only ever sets these.
  const [wordTargets] = React.useState<Target[][]>(() =>
    words.map((word) => [...word].map(() => ({ x: motionValue(0), y: motionValue(0) })))
  );

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const targets = wordTargets.flat();
    const letters = [...root.querySelectorAll<HTMLElement>("[data-letter]")];
    // Rest centres relative to the root; offsets ignore transforms, so they hold however far a letter is pushed.
    let rests: Point[] = [];
    let scrollable = false;

    const measure = () => {
      rests = letters.map((letter) => ({
        x: letter.offsetLeft + letter.offsetWidth / 2,
        y: letter.offsetTop + letter.offsetHeight / 2,
      }));
      scrollable = document.documentElement.scrollHeight > window.innerHeight;
    };

    // Each letter within reach is pushed straight away from the pointer, harder the closer it sits.
    const push = (pointer: Point | null) => {
      const origin = root.getBoundingClientRect();
      targets.forEach((target, index) => {
        let x = 0;
        let y = 0;
        if (pointer) {
          const dx = origin.left + rests[index].x - pointer.x;
          const dy = origin.top + rests[index].y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < RADIUS) {
            const strength = (1 - distance / RADIUS) * MAX_PUSH;
            x = (dx / distance) * strength;
            y = (dy / distance) * strength;
          }
        }
        target.x.set(x);
        target.y.set(y);
      });
    };

    // A touch only moves while the finger is down, so a dragging finger pushes the letters like a hovering cursor.
    const onMove = (event: PointerEvent) => push({ x: event.clientX, y: event.clientY });
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") push({ x: event.clientX, y: event.clientY });
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") push(null);
    };
    const onLeave = () => push(null);

    // While the page fits, a one-finger drag anywhere pushes the letters instead of panning; pinch zoom stays.
    const onTouchMove = (event: TouchEvent) => {
      if (!scrollable && event.touches.length === 1) event.preventDefault();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    observer.observe(document.documentElement);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      push(null);
    };
  }, [reduceMotion, wordTargets]);

  return (
    <LazyMotion features={domAnimation} strict>
      {/* `touch-none` keeps a drag that starts on the letters from scrolling a page that overflows. */}
      <span ref={rootRef} className={cx("relative flex touch-none flex-wrap justify-center gap-x-[0.25em]", className)}>
        <span className="sr-only">{words.join(" ")}</span>
        {words.map((word, wordIndex) => (
          <span key={word} aria-hidden="true" className="whitespace-nowrap">
            {[...word].map((letter, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: the letters never reorder.
              <Letter key={index} target={wordTargets[wordIndex][index]}>
                {letter}
              </Letter>
            ))}
          </span>
        ))}
      </span>
    </LazyMotion>
  );
};
