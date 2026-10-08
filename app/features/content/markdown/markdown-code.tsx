import type * as React from "react";
import { cx } from "@/app/features/style/cva";

export type MarkdownCodeProps = React.ComponentPropsWithRef<"code">;

const codeStyles = cx("bg-gray-100 px-4 [overflow-wrap:anywhere]", "in-[pre]:bg-transparent in-[pre]:p-0");

export const MarkdownCode = ({ className, ...props }: MarkdownCodeProps) => (
  <code className={cx(codeStyles, className)} {...props} />
);

export type MarkdownCodeBlockProps = React.ComponentPropsWithRef<"pre">;

// `label-2` sets size and leading; the `code` inside keeps preflight's monospace family.
const codeBlockStyles = cx("label-2 border-2 border-black bg-gray-100", "overflow-x-auto p-16 lg:p-24");

export const MarkdownCodeBlock = ({ className, ...props }: MarkdownCodeBlockProps) => (
  <pre className={cx(codeBlockStyles, className)} {...props} />
);
