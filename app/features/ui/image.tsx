import NextImage, { type ImageProps } from "next/image";
import { cx } from "@/app/features/style/utils";

export type { ImageProps };

// A `./x.svg?url` import resolves to a served URL — a bare string, or a static-image object
// whose `.src` holds the URL. Pull it out and flag it when it points at an SVG.
const asSvgUrl = (src: ImageProps["src"]): string | undefined => {
  const url = typeof src === "string" ? src : typeof src === "object" && "src" in src ? src.src : undefined;
  return url?.endsWith(".svg") ? url : undefined;
};

export const Image = ({ className, sizes, ...props }: ImageProps) => {
  const svgUrl = asSvgUrl(props.src);

  // SVGs have no blur data and gain nothing from next/image's raster optimization —
  // render them as a plain <img>.
  if (svgUrl) {
    // biome-ignore lint/performance/noImgElement: vector SVG, next/image adds no value
    return <img src={svgUrl} alt={props.alt} className={cx("block h-auto w-full", className)} />;
  }

  // Statically imported (colocated) images carry a blurDataURL, so opt into the
  // blur-up placeholder only for those — string srcs have no blur data.
  const isStatic = typeof props.src === "object";

  return (
    <NextImage
      sizes={sizes ?? "100vw"}
      placeholder={isStatic ? "blur" : undefined}
      className={cx("block h-auto w-full", className)}
      {...props}
    />
  );
};
