import { type MotionValue, motionValue, useReducedMotion } from "motion/react";
import * as React from "react";

const RADIUS = 220;
const MAX_PUSH = 64;

type Point = { x: number; y: number };

export type PushTarget = { x: MotionValue<number>; y: MotionValue<number> };

// Straight away from the pointer, harder the closer the letter sits, and not at all out of reach.
const pushFrom = (pointer: Point | null, centre: Point): Point => {
  if (!pointer) return { x: 0, y: 0 };
  const dx = centre.x - pointer.x;
  const dy = centre.y - pointer.y;
  const distance = Math.hypot(dx, dy) || 1;
  if (distance >= RADIUS) return { x: 0, y: 0 };
  const strength = (1 - distance / RADIUS) * MAX_PUSH;
  return { x: (dx / distance) * strength, y: (dy / distance) * strength };
};

/**
 * Where each `[data-letter]` inside `rootRef` is pushed to by the pointer, per word and letter.
 * The letters' springs chase these targets, so the effect only ever sets them.
 */
export const useElasticPush = (rootRef: React.RefObject<HTMLElement | null>, words: readonly string[]) => {
  const reduceMotion = useReducedMotion();
  const [wordTargets] = React.useState<PushTarget[][]>(() =>
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

    const push = (pointer: Point | null) => {
      const origin = root.getBoundingClientRect();
      targets.forEach((target, index) => {
        const { x, y } = pushFrom(pointer, { x: origin.left + rests[index].x, y: origin.top + rests[index].y });
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
  }, [rootRef, reduceMotion, wordTargets]);

  return wordTargets;
};
