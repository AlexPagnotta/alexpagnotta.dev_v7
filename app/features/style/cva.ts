// biome-ignore-all lint/style/noRestrictedImports: we need to import from source here.
import { type VariantProps as CvaVariantProps, defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

// The `text-*` tokens behind the typography utilities, e.g. `text-display-1`, `text-heading-4-mobile`.
const isValidTextSize = (cn: string) =>
  ["display", "logo", "heading", "body", "label", "code"].some((val) => cn.startsWith(val));

// The utilities in `typography.css`; one replaces another, so `cx("body-1", "body-3")` keeps only `body-3`.
const TYPOGRAPHY_UTILITIES = [
  "display-1",
  "logo",
  "logo-sm",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "body-1",
  "body-2",
  "body-3",
  "body-4",
  "label-1",
  "label-2",
  "code-1",
];

// @see https://github.com/dcastil/tailwind-merge/blob/v3.3.0/docs/configuration.md#theme
const twMerge = extendTailwindMerge<"typography">({
  extend: {
    theme: {
      text: [isValidTextSize],
      shadow: ["depth-2", "depth-4", "depth-6", "depth-8"],
      "drop-shadow": ["depth-2", "depth-6", "depth-12", "soft"],
    },
    classGroups: {
      typography: TYPOGRAPHY_UTILITIES,
    },
  },
});

export const { cva, cx } = defineConfig({
  hooks: {
    onComplete: twMerge,
  },
});

export type VariantProps<T extends (...args: never[]) => unknown> = CvaVariantProps<T>;
