import { cx } from "@/app/features/style/utils";

export type MarkdownTitleProps = React.ComponentPropsWithRef<"h2">;

export const MarkdownTitle = ({ className, ...props }: MarkdownTitleProps) => (
  <h2 className={cx("body-5 text-balance", className)} {...props} />
);
