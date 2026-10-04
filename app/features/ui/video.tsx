"use client";

import { useReducedMotion } from "motion/react";
import * as React from "react";
import { cx } from "@/app/features/style/cva";
import { useIsClient } from "@/app/features/utils/use-is-client";

// Starts buffering just before the clip scrolls in, so its first frame is usually ready when it arrives.
const IN_VIEW_MARGIN = "200px 0px";

export type VideoSource = { src: string; type: string };

export type VideoProps = {
  autoplay?: boolean;
  // A single URL, or multiple typed sources (e.g. transparent webm + mp4 fallback);
  // the browser picks the first source it can play. For transparency list the HEVC mp4 first, typed
  // `codecs="hvc1"`: Safari drops a webm's alpha, and Chrome skips the hvc1 source for the webm.
  src?: string | VideoSource[];
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "muted" | "loop" | "controls" | "src">;

export const Video = ({ autoplay, className, src, ...props }: VideoProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isClient = useIsClient();
  // Held until mounted, so the first client render matches the server's.
  const stilled = autoplay && isClient && prefersReducedMotion;
  const looping = autoplay && !prefersReducedMotion;

  // Plays only while on screen, so a loop far down the page downloads nothing until it is reached.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!looping || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Rejects when the browser blocks autoplay, which leaves the poster up.
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: IN_VIEW_MARGIN }
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [looping]);

  // Nothing loads up front for a loop, and only the metadata for a clip with controls.
  const playbackAttrs = autoplay
    ? ({ muted: true, loop: true, preload: "none", controls: !!stilled } as const)
    : ({ controls: true, preload: "metadata" } as const);
  const sources = Array.isArray(src) ? src : undefined;
  const singleSrc = typeof src === "string" ? src : undefined;

  return (
    <video
      ref={videoRef}
      playsInline
      src={singleSrc}
      className={cx("block h-auto w-full", className)}
      {...playbackAttrs}
      {...props}
    >
      {sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
};
