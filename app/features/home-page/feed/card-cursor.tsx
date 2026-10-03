"use client";

import { m, type Transition, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as React from "react";
import { useMediaQuery } from "usehooks-ts";
import { cx } from "@/app/features/style/cva";
import { screens } from "@/app/features/utils/screens";

const LABEL = "OPEN";

/** Mark a card with this attribute, and optionally `data-fill`, to have the pill stand in for the cursor over it. */
const CARD_SELECTOR = "[data-card-cursor]";

// Tilt at either edge of the card; the pill runs level through the middle.
const MAX_ROTATION = 14;

// Long enough to cross the gap to the next card, so the pill carries over instead of popping out and back in.
const HIDE_DELAY = 150;

// A touch phone has no hover, so the card crossing the middle of the viewport gets it instead.
const CENTRED_CARD_QUERY = `(pointer: coarse) and (width < ${screens.md})`;

// How long a card has to hold the middle: a flick past never lights it up, and crossing a gap never drops the last one.
const CENTRED_DWELL = 150;

const followSpring = { stiffness: 500, damping: 40, mass: 0.4 };

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

const tiltAt = (clientX: number, card: Element) => {
  const bounds = card.getBoundingClientRect();
  return ((clientX - bounds.left) / bounds.width - 0.5) * 2 * MAX_ROTATION;
};

export type CardCursorProviderProps = {
  children: React.ReactNode;
};

/** One pill shared by every card inside, so it carries across the gaps between them. */
export const CardCursorProvider = ({ children }: CardCursorProviderProps) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [fill, setFill] = React.useState<string>();
  const prefersReducedMotion = useReducedMotion();
  const flagsCentredCard = useMediaQuery(CENTRED_CARD_QUERY, { initializeWithValue: false });

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
    let frame = 0;

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
    const onScroll = () => {
      frame ||= requestAnimationFrame(() => {
        frame = 0;
        if (pointer) point(pointer.x, pointer.y, document.elementFromPoint(pointer.x, pointer.y));
      });
    };

    const onPress = (event: PointerEvent) => {
      if (shown) setPressed(event.type === "pointerdown");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    // Leaving the window fires no move outside the cards, so the root has to catch it.
    root.addEventListener("pointerleave", hide);
    root.addEventListener("pointerdown", onPress);
    root.addEventListener("pointerup", onPress);
    root.addEventListener("pointercancel", onPress);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerleave", hide);
      root.removeEventListener("pointerdown", onPress);
      root.removeEventListener("pointerup", onPress);
      root.removeEventListener("pointercancel", onPress);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(frame);
    };
  }, [x, y, rotate, springX, springY, springRotate]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !flagsCentredCard) return;

    let active: Element | null = null;
    let candidate: Element | null = null;
    let dwellTimeout: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;

    const look = () => {
      frame = 0;
      const card = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.closest(CARD_SELECTOR);
      // Waits out the reveal, or the hover plays on top of the card still rising in.
      const next = card && root.contains(card) && card.closest("[data-revealed]") ? card : null;
      if (next === candidate) return;

      candidate = next;
      clearTimeout(dwellTimeout);
      if (candidate === active) return;
      dwellTimeout = setTimeout(() => {
        active?.removeAttribute("data-active");
        active = candidate;
        active?.setAttribute("data-active", "");
      }, CENTRED_DWELL);
    };

    const onChange = () => {
      frame ||= requestAnimationFrame(look);
    };

    // Filtering and a reveal finishing change the candidate without a scroll.
    const mutation = new MutationObserver(onChange);
    mutation.observe(root, { childList: true, subtree: true, attributeFilter: ["data-revealed"] });
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange, { passive: true });
    onChange();

    return () => {
      mutation.disconnect();
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      clearTimeout(dwellTimeout);
      cancelAnimationFrame(frame);
      active?.removeAttribute("data-active");
    };
  }, [flagsCentredCard]);

  return (
    <>
      {/* Hides the system cursor through the gaps too, while the pill stands in for it. */}
      <div ref={rootRef} className={cx(visible && "cursor-none")}>
        {children}
      </div>
      <m.span
        aria-hidden
        className={pillStyles}
        style={{ x: springX, y: springY, rotate: springRotate, backgroundColor: fill }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? (pressed ? 0.85 : 1) : 0.8 }}
        transition={revealSpring}
      >
        {LABEL}
      </m.span>
    </>
  );
};
