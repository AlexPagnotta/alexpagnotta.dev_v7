import { cx } from "@/app/features/style/utils";

export type VideoProps = {
  src: string;
  className?: string;
} & React.VideoHTMLAttributes<HTMLVideoElement>;

export const Video = ({ src, className, ...props }: VideoProps) => {
  return <video src={src} controls playsInline className={cx("h-auto w-full rounded-md", className)} {...props} />;
};
