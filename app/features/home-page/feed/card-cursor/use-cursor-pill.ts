import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as React from "react";
import { CARD_SELECTOR } from "@/app/features/home-page/feed/card-cursor/card-selector";
import { onScrollFrame } from "@/app/features/utils/scroll";

// Tilt at either edge of the card; the pill runs level through the middle.
const MAX_ROTATION = 14;

// Long enough to cross the gap to the next card, so the pill carries over instead of popping out and back in.
const HIDE_DELAY = 150;

const followSpring = { stiffness: 500, damping: 40, mass: 0.4 };

const tiltAt = (clientX: number, card: Element) => {
  const bounds = card.getBoundingClientRect();
  return ((clientX - bounds.left) / bounds.width - 0.5) * 2 * MAX_ROTATION;
};

/** Follows a mouse over the cards inside `rootRef`, and reports what the pill standing in for it should show. */
export const useCursorPill = (rootRef: React.RefObject<HTMLElement | null>) => {
  const [visible, setVisible] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [fill, setFill] = React.useState<string>();
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const options = prefersReducedMotion ? { duration: 0 } : followSpring;
  const springX = useSpring(x, options);
  const springY = useSpring(y, options);
  const springRotate = useSpring(rotate, options);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let shown = false;
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;
    let pointer: { x: number; y: number } | undefined;

    const show = (next: boolean) => {
      shown = next;
      setVisible(next);
    };

    const hide = () => {
      setPressed(false);
      if (!shown || hideTimeout) return;
      hideTimeout = setTimeout(() => {
        hideTimeout = undefined;
        show(false);
      }, HIDE_DELAY);
    };

    // Follows the pointer through the gaps too, so a pill on its way out can still be caught by the next card.
    const point = (clientX: number, clientY: number, target: Element | null) => {
      const card = target?.closest<HTMLElement>(CARD_SELECTOR);
      const over = card && root.contains(card) ? card : undefined;
      if (!over && !shown) return;

      x.set(clientX);
      y.set(clientY);
      if (!over) return hide();

      clearTimeout(hideTimeout);
      hideTimeout = undefined;
      setFill(over.dataset.fill);
      rotate.set(tiltAt(clientX, over));
      // A fresh reveal starts at the pointer; one carried over from the last card springs across.
      if (!shown) {
        springX.jump(clientX);
        springY.jump(clientY);
        springRotate.jump(rotate.get());
      }
      show(true);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      point(pointer.x, pointer.y, event.target as Element);
    };

    // Scrolling slides the cards under a still pointer without firing any pointer event, so look again.
    const scrollFrames = onScrollFrame(() => {
      if (pointer) point(pointer.x, pointer.y, document.elementFromPoint(pointer.x, pointer.y));
    });

    const onPress = (event: PointerEvent) => {
      if (shown) setPressed(event.type === "pointerdown");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    // Leaving the window fires no move outside the cards, so the root has to catch it.
    root.addEventListener("pointerleave", hide);
    root.addEventListener("pointerdown", onPress);
    root.addEventListener("pointerup", onPress);
    root.addEventListener("pointercancel", onPress);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      scrollFrames.stop();
      root.removeEventListener("pointerleave", hide);
      root.removeEventListener("pointerdown", onPress);
      root.removeEventListener("pointerup", onPress);
      root.removeEventListener("pointercancel", onPress);
      clearTimeout(hideTimeout);
    };
  }, [rootRef, x, y, rotate, springX, springY, springRotate]);

  return { visible, pressed, fill, x: springX, y: springY, rotate: springRotate };
};
