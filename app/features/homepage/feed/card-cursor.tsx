"use client";

import { motion, type Transition, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as React from "react";
import { cx } from "@/app/features/style/utils";

const LABEL = "OPEN";

// Tilt at either edge of the card; the pill runs level through the middle.
const MAX_ROTATION = 14;

// Long enough to cross the gap to the next card, so the pill carries over instead of popping out and back in.
const HIDE_DELAY = 150;

const followSpring = { stiffness: 500, damping: 40, mass: 0.4 };

const revealSpring: Transition = { type: "spring", stiffness: 600, damping: 32, mass: 0.5 };

// Tailwind's translate is its own CSS property, so it composes with the transform motion drives.
const pillStyles = cx(
  // Hangs straight off the pointer and pivots there, so the tilt keeps it attached.
  "pointer-events-none fixed top-0 left-0 z-1 origin-top -translate-x-1/2",
  "inline-flex items-center rounded-full border border-black px-24 py-8",
  "label-2 whitespace-nowrap bg-white text-black shadow-depth-4 shadow-black/10",
  // CSS rather than motion, since the fill arrives as a `var()` it would have to resolve first.
  "transition-colors duration-300 ease-out motion-reduce:transition-none"
);

type PointerEvent = React.PointerEvent<HTMLDivElement>;

type CardCursorContextValue = {
  enter: (event: PointerEvent, fill?: string) => void;
  tilt: (event: PointerEvent) => void;
  leave: () => void;
  press: (pressed: boolean) => void;
};

type CardCursorControls = CardCursorContextValue & {
  reveal: (clientX: number, clientY: number, layer: Element, fill?: string) => void;
};

const CardCursorContext = React.createContext<CardCursorContextValue | null>(null);

const CARD_LAYER_SELECTOR = "[data-card-cursor]";

const tiltAt = (clientX: number, layer: Element) => {
  const bounds = layer.getBoundingClientRect();
  return ((clientX - bounds.left) / bounds.width - 0.5) * 2 * MAX_ROTATION;
};

export type CardCursorProviderProps = {
  children: React.ReactNode;
};

/** One pill shared by every card inside, so it carries across the gaps between them. */
export const CardCursorProvider = ({ children }: CardCursorProviderProps) => {
  const [visible, setVisible] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [fill, setFill] = React.useState<string>();
  const visibleRef = React.useRef(false);
  const hideTimeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const options = prefersReducedMotion ? { duration: 0 } : followSpring;
  const springX = useSpring(x, options);
  const springY = useSpring(y, options);
  const springRotate = useSpring(rotate, options);

  const context = React.useMemo<CardCursorControls>(() => {
    const show = (next: boolean) => {
      visibleRef.current = next;
      setVisible(next);
    };

    const reveal: CardCursorControls["reveal"] = (clientX, clientY, layer, nextFill) => {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = undefined;
      setFill(nextFill);
      rotate.set(tiltAt(clientX, layer));
      // A fresh reveal starts at the pointer; one carried over from the last card springs across.
      if (!visibleRef.current) {
        x.jump(clientX);
        y.jump(clientY);
        springX.jump(clientX);
        springY.jump(clientY);
        springRotate.jump(rotate.get());
      }
      show(true);
    };

    return {
      reveal,
      enter: (event, nextFill) => reveal(event.clientX, event.clientY, event.currentTarget, nextFill),
      tilt: (event) => rotate.set(tiltAt(event.clientX, event.currentTarget)),
      leave: () => {
        setPressed(false);
        if (hideTimeout.current) return;
        hideTimeout.current = setTimeout(() => {
          hideTimeout.current = undefined;
          show(false);
        }, HIDE_DELAY);
      },
      press: setPressed,
    };
  }, [x, y, rotate, springX, springY, springRotate]);

  React.useEffect(() => () => clearTimeout(hideTimeout.current), []);

  // Scrolling slides the cards under a still pointer without firing any pointer event, so look again.
  React.useEffect(() => {
    let pointer: { x: number; y: number } | undefined;
    let frame = 0;

    const trackPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "mouse") pointer = { x: event.clientX, y: event.clientY };
    };

    const check = () => {
      frame = 0;
      if (!pointer) return;
      const layer = document.elementFromPoint(pointer.x, pointer.y)?.closest<HTMLElement>(CARD_LAYER_SELECTOR);
      if (layer) context.reveal(pointer.x, pointer.y, layer, layer.dataset.fill);
      else if (visibleRef.current) context.leave();
    };

    const schedule = () => {
      frame ||= requestAnimationFrame(check);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, [context]);

  return (
    <CardCursorContext.Provider value={context}>
      {/* Follows the pointer through the gaps too, and hides the system cursor while the pill stands in for it. */}
      <div
        className={cx(visible && "cursor-none")}
        onPointerMove={(event) => {
          x.set(event.clientX);
          y.set(event.clientY);
        }}
      >
        {children}
      </div>
      <motion.span
        aria-hidden
        className={pillStyles}
        style={{ x: springX, y: springY, rotate: springRotate, backgroundColor: fill }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? (pressed ? 0.85 : 1) : 0.8 }}
        transition={prefersReducedMotion ? { duration: 0 } : revealSpring}
      >
        {LABEL}
      </motion.span>
    </CardCursorContext.Provider>
  );
};

export type CardCursorProps = {
  fill?: string;
};

/** The card's hover layer: it has to fill the card, and drives the shared pill in `CardCursorProvider`. */
export const CardCursor = ({ fill }: CardCursorProps) => {
  const cursor = React.useContext(CardCursorContext);
  const hovered = React.useRef(false);

  // A filter can unmount the card under the pointer, which never fires `pointerleave`.
  React.useEffect(
    () => () => {
      if (hovered.current) cursor?.leave();
    },
    [cursor]
  );

  if (!cursor) return null;

  return (
    <div
      aria-hidden
      data-card-cursor
      data-fill={fill}
      className="absolute inset-0 z-20 cursor-none rounded-xl pointer-coarse:hidden"
      onPointerEnter={(event) => {
        hovered.current = true;
        cursor.enter(event, fill);
      }}
      onPointerMove={cursor.tilt}
      onPointerLeave={() => {
        hovered.current = false;
        cursor.leave();
      }}
      onPointerDown={() => cursor.press(true)}
      onPointerUp={() => cursor.press(false)}
      onPointerCancel={() => cursor.press(false)}
    />
  );
};
