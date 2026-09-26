import type * as React from "react";
import { cx } from "@/app/features/style/cva";

export type MarkdownTitleProps = React.ComponentPropsWithRef<"h2">;

export const MarkdownTitle = ({ className, ...props }: MarkdownTitleProps) => (
  <h2 className={cx("heading-4 text-balance", className)} {...props} />
);
