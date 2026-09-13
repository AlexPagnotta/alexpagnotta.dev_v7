import { cx } from "@/app/features/style/utils";

export type MarkdownParagraphProps = React.ComponentPropsWithRef<"p">;

/*
  Ragged right rather than the design's justified setting: under 40 characters a line on a
  phone there is too little slack to distribute, so justifying only buys stretched word gaps
  and hyphen breaks. `text-pretty` keeps a paragraph from ending on a lone word.
*/
export const MarkdownParagraph = ({ className, ...props }: MarkdownParagraphProps) => (
  <p className={cx("body-3 text-pretty", className)} {...props} />
);
