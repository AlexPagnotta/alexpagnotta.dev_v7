"use client";

import { useReducedMotion } from "motion/react";
import * as React from "react";
import { cx } from "@/app/features/style/cva";
import { useIsClient } from "@/app/features/utils/use-is-client";

export type VideoSource = { src: string; type: string };

export type VideoProps = {
  autoplay?: boolean;
  // A single URL, or multiple typed sources (e.g. transparent webm + mp4 fallback);
  // the browser picks the first source it can play, so list webm before mp4.
  src?: string | VideoSource[];
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "muted" | "loop" | "controls" | "src">;

export const Video = ({ autoplay, className, src, ...props }: VideoProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isClient = useIsClient();
  // Held until mounted, so the first client render matches the server's.
  const stilled = autoplay && isClient && prefersReducedMotion;

  // The server-rendered `autoplay` starts the loop before hydration, so reduced motion has to stop it by hand.
  React.useEffect(() => {
    if (stilled) videoRef.current?.pause();
  }, [stilled]);

  // With controls, only the metadata loads until someone presses play.
  const autoplayAttrs = autoplay
    ? { autoPlay: !stilled, muted: true, loop: true, controls: !!stilled }
    : ({ controls: true, preload: "metadata" } as const);
  const sources = Array.isArray(src) ? src : undefined;
  const singleSrc = typeof src === "string" ? src : undefined;

  return (
    <video
      ref={videoRef}
      playsInline
      src={singleSrc}
      className={cx("block h-auto w-full", className)}
      {...autoplayAttrs}
      {...props}
    >
      {sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
};
