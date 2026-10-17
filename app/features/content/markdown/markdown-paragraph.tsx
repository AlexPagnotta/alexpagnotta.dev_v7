import type * as React from "react";
import { cx } from "@/app/features/style/cva";

export type MarkdownParagraphProps = React.ComponentPropsWithRef<"p">;

// Ragged right rather than the design's justified setting, which stretches word gaps on a 40-character phone line.
export const MarkdownParagraph = ({ className, ...props }: MarkdownParagraphProps) => (
  <p className={cx("body-1 text-pretty lg:body-3", className)} {...props} />
);
