// biome-ignore-all lint/style/noRestrictedImports: we need to import from source here.
import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

function isValidTextSize(cn: string) {
  // Any class that starts with one of these prefixes is valid.
  // eg. `display-1`, `headline-5-mobile`, `body-2`.
  return ["display", "headline", "body"].some((val) => cn.startsWith(val));
}

// @see https://github.com/dcastil/tailwind-merge/blob/v3.3.0/docs/configuration.md#theme
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [isValidTextSize],
      shadow: ["depth-sm", "depth-md", "depth-lg"],
      "drop-shadow": ["depth-sm", "depth-md", "depth-lg"],
    },
  },
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: twMerge,
  },
});

export type { VariantProps } from "cva";
export type ClassValues = Parameters<typeof cx>;
