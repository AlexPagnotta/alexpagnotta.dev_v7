"use client";

import { ReactLenis } from "lenis/react";
import { useMediaQuery } from "usehooks-ts";

export const SmoothScroll = () => {
  const motionOk = useMediaQuery("(prefers-reduced-motion: no-preference)", { initializeWithValue: false });

  if (!motionOk) return null;

  // `autoToggle` pauses Lenis while a scroll lock sets `overflow: hidden` on the root.
  return <ReactLenis root options={{ autoToggle: true }} />;
};
