"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

// Next keeps the offset when the new page is already in view, and the browser restores it on back/forward and reload.
// Rendered after `main`, so this layout effect runs after Next's own scroll handling.
export const ScrollReset = () => {
  const pathname = usePathname();

  React.useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: the reset is keyed to the route, not read from it.
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};
