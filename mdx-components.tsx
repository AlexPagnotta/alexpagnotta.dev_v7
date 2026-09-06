import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/app/features/content/mdx-components";

// Required by @next/mdx: a single `useMDXComponents` function, no arguments.
export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
