import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/app/features/content/markdown/mdx-components";

// Required by @next/mdx: a single `useMDXComponents` function, no arguments.
export const useMDXComponents = (): MDXComponents => mdxComponents;
