import NextImage, { type ImageProps } from "next/image";
import { cx } from "@/app/features/style/utils";

export const Image = ({ className, sizes, ...props }: ImageProps) => {
  // Statically imported (colocated) images carry a blurDataURL, so opt into the
  // blur-up placeholder only for those — string srcs have no blur data.
  const isStatic = typeof props.src === "object";

  return (
    <figure className="overflow-hidden rounded-lg">
      <NextImage
        sizes={sizes ?? "100vw"}
        placeholder={isStatic ? "blur" : undefined}
        className={cx("block h-auto w-full", className)}
        {...props}
      />
    </figure>
  );
};
