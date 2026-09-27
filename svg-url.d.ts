// `?url` skips SVGR (see next.config.ts), so the import is the served file rather than a component.
declare module "*.svg?url" {
  const src: import("next/image").StaticImageData | string;
  export default src;
}
