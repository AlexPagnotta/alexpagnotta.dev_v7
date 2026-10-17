import NextImage, { getImageProps, type ImageProps as NextImageProps, type StaticImageData } from "next/image";
import { cx } from "@/app/features/style/cva";

export type ImageProps = NextImageProps;

/** A video poster has no `srcset`, so it goes through the optimizer once, at the widest it shows (2x is added). */
export const posterSrc = (src: StaticImageData, width: number) => getImageProps({ src, alt: "", width }).props.src;

/** A poster plus Next's blur placeholder as a background, for opaque clips only: it would show around a transparent one. */
export const posterWithBlur = (src: StaticImageData, width: number) => {
  const { src: poster, style } = getImageProps({ src, alt: "", width, placeholder: "blur" }).props;
  const { backgroundImage, backgroundSize, backgroundPosition, backgroundRepeat } = style ?? {};
  return { poster, style: { backgroundImage, backgroundSize, backgroundPosition, backgroundRepeat } };
};

// A `./x.svg?url` import resolves to a served URL: a bare string, or a static-image object
// whose `.src` holds the URL. Pull it out and flag it when it points at an SVG.
const asSvgUrl = (src: ImageProps["src"]): string | undefined => {
  const url = typeof src === "string" ? src : typeof src === "object" && "src" in src ? src.src : undefined;
  return url?.endsWith(".svg") ? url : undefined;
};

type SvgImageProps = ImageProps & { url: string };

// next/image's own options, which a plain <img> has no attribute for.
const SvgImage = ({
  url,
  src,
  alt,
  width,
  height,
  loading,
  preload,
  fill: _fill,
  quality: _quality,
  priority: _priority,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  loader: _loader,
  overrideSrc: _overrideSrc,
  onLoadingComplete: _onLoadingComplete,
  lazyBoundary: _lazyBoundary,
  lazyRoot: _lazyRoot,
  className,
  ...props
}: SvgImageProps) => {
  // Without an intrinsic size the lazy <img> sits at 0px until it loads, then shoves the page down.
  const intrinsic = typeof src === "object" && "width" in src ? src : undefined;

  return (
    // biome-ignore lint/performance/noImgElement: vector SVG, next/image adds no value
    <img
      {...props}
      src={url}
      alt={alt}
      width={width ?? intrinsic?.width}
      height={height ?? intrinsic?.height}
      // next/image's own loading rule, applied by hand since this bypasses it.
      loading={loading ?? (preload ? "eager" : "lazy")}
      decoding="async"
      className={cx("block h-auto w-full", className)}
    />
  );
};

export const Image = ({ className, sizes, ...props }: ImageProps) => {
  const svgUrl = asSvgUrl(props.src);

  // SVGs have no blur data and gain nothing from next/image's raster optimization.
  if (svgUrl) return <SvgImage url={svgUrl} className={className} {...props} />;

  // Statically imported (colocated) images carry a blurDataURL, so opt into the
  // blur-up placeholder only for those; string srcs have no blur data.
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
