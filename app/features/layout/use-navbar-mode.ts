import * as React from "react";
import { createScrollDirection, onScrollFrame } from "@/app/features/utils/scroll";

/** A section the revealed bar must clear before it may pin. Opt in with `data-navbar-boundary`. */
const BOUNDARY_SELECTOR = "[data-navbar-boundary]";

/** `flow` sits under the marquee and scrolls away; `hidden` and `pinned` are fixed, parked or revealed. */
type NavbarMode = "flow" | "hidden" | "pinned";

type ModeInput = { flowTop: number; parked: number; scrollingUp: boolean; pastBoundary: boolean; floating: boolean };

// The bar hands over between document and viewport at `parked` up, where both paint identically.
const nextMode = (mode: NavbarMode, input: ModeInput): NavbarMode => {
  const { flowTop, parked, scrollingUp, pastBoundary, floating } = input;
  const revealed = scrollingUp && pastBoundary ? "pinned" : "hidden";

  if (floating) return revealed;
  if (mode === "flow") return flowTop <= -parked ? "hidden" : "flow";
  if (flowTop >= (mode === "pinned" ? 0 : -parked)) return "flow";
  return revealed;
};

export const useNavbarMode = (floating: boolean) => {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const overhangRef = React.useRef<HTMLDivElement>(null);
  const [{ mode, animated }, setState] = React.useState<{ mode: NavbarMode; animated: boolean }>({
    mode: floating ? "hidden" : "flow",
    animated: false,
  });

  React.useEffect(() => {
    const readDirection = createScrollDirection();
    let scrollingUp = false;

    const measure = () => {
      const anchor = anchorRef.current;
      const header = headerRef.current;
      if (!anchor || !header) return;

      const direction = readDirection();
      if (direction) scrollingUp = direction === "up";

      const boundary = document.querySelector(BOUNDARY_SELECTOR);
      const input = {
        flowTop: anchor.getBoundingClientRect().top,
        // The button hangs below the bar, so it parks only once the button is out of view too.
        parked: Math.max(
          header.offsetHeight,
          (overhangRef.current?.getBoundingClientRect().bottom ?? 0) - header.getBoundingClientRect().top
        ),
        scrollingUp,
        pastBoundary: !boundary || boundary.getBoundingClientRect().bottom <= 0,
        floating,
      };

      setState((prev) => {
        const mode = nextMode(prev.mode, input);
        // Entering or leaving `flow` moves the paint origin too, so only fixed-to-fixed moves animate.
        return mode === prev.mode ? prev : { mode, animated: prev.mode !== "flow" && mode !== "flow" };
      });
    };

    measure();
    return onScrollFrame(measure, { resize: true }).stop;
  }, [floating]);

  return { mode, animated, anchorRef, headerRef, overhangRef };
};
