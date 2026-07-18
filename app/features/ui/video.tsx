import { cx } from "@/app/features/style/utils";

export type VideoProps = {
  autoplay?: boolean;
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "muted" | "loop" | "controls">;

export const Video = ({ autoplay, className, ...props }: VideoProps) => {
  const autoplayAttrs = autoplay ? { autoPlay: true, muted: true, loop: true } : { controls: true };

  return <video playsInline className={cx("block h-auto w-full", className)} {...autoplayAttrs} {...props} />;
};
