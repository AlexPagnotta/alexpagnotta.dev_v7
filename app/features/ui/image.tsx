import NextImage, { type ImageProps } from "next/image";
import { cx } from "@/app/features/style/cva";

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
    // Without an intrinsic size the lazy <img> sits at 0px until it loads, then shoves the page down.
    const intrinsic = typeof props.src === "object" && "width" in props.src ? props.src : undefined;
    return (
      // biome-ignore lint/performance/noImgElement: vector SVG, next/image adds no value
      <img
        src={svgUrl}
        alt={props.alt}
        width={props.width ?? intrinsic?.width}
        height={props.height ?? intrinsic?.height}
        // next/image's own loading rule, applied by hand since this bypasses it.
        loading={props.loading ?? (props.preload ? "eager" : "lazy")}
        decoding="async"
        className={cx("block h-auto w-full", className)}
      />
    );
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
