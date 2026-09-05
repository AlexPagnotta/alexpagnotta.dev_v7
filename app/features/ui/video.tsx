import { cx } from "@/app/features/style/utils";

export type VideoSource = { src: string; type: string };

export type VideoProps = {
  autoplay?: boolean;
  // A single URL, or multiple typed sources (e.g. transparent webm + mp4 fallback);
  // the browser picks the first source it can play, so list webm before mp4.
  src?: string | VideoSource[];
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "muted" | "loop" | "controls" | "src">;

export const Video = ({ autoplay, className, src, ...props }: VideoProps) => {
  const autoplayAttrs = autoplay ? { autoPlay: true, muted: true, loop: true } : { controls: true };
  const sources = Array.isArray(src) ? src : undefined;
  const singleSrc = typeof src === "string" ? src : undefined;

  return (
    <video playsInline src={singleSrc} className={cx("block h-auto w-full", className)} {...autoplayAttrs} {...props}>
      {sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
};
