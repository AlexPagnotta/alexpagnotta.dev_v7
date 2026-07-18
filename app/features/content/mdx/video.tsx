import { cx } from "@/app/features/style/utils";

export type VideoProps = {
  src: string;
  className?: string;
} & React.VideoHTMLAttributes<HTMLVideoElement>;

export const Video = ({ src, className, ...props }: VideoProps) => {
  return (
    <figure className="overflow-hidden rounded-lg">
      <video src={src} controls playsInline className={cx("block h-auto w-full", className)} {...props} />
    </figure>
  );
};
