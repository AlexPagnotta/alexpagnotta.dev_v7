"use client";

import * as React from "react";
import CursorArrow from "@/app/assets/cursor.svg";
import { cx } from "@/app/features/style/utils";
import { useIsTouchDevice } from "@/app/features/utils/use-breakpoint";

// Set as `data-cursor` on any element that should swap the arrow for the round "OPEN" badge.
export type CursorVariant = "open-magenta" | "open-yellow";

export const Cursor = () => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [variant, setVariant] = React.useState<CursorVariant | null>(null);
  const [active, setActive] = React.useState(false);
  const isTouch = useIsTouchDevice();

  React.useEffect(() => {
    // Pointer-follower cursors only make sense with a real pointing device; on touch
    // there is nothing to follow and hiding the native cursor would do more harm than good.
    if (isTouch) return;

    const root = rootRef.current;
    if (!root) return;

    document.documentElement.setAttribute("data-custom-cursor", "true");

    const onMove = (e: PointerEvent) => {
      root.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setActive(true);
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setVariant((el?.getAttribute("data-cursor") as CursorVariant | null) ?? null);
    };

    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeAttribute("data-custom-cursor");
    };
  }, [isTouch]);

  const open = variant !== null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cx(
        "pointer-events-none fixed left-0 top-0 z-cursor hidden transition-opacity duration-200 pointer-fine:block",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      <CursorArrow
        className={cx(
          "absolute left-0 top-0 size-56 origin-top-left transition-[opacity,transform] duration-150 ease-out",
          open ? "scale-50 opacity-0" : "scale-100 opacity-100"
        )}
      />
      <div
        className={cx(
          "body-2 absolute left-0 top-0 flex size-128 -translate-x-1/2 -translate-y-1/2 origin-center items-center justify-center rounded-full uppercase text-black transition-[opacity,transform] duration-150 ease-out",
          variant === "open-yellow" ? "bg-yellow" : "bg-magenta",
          open ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
      >
        Open
      </div>
    </div>
  );
};
