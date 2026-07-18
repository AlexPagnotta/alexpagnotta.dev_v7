import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const paragraphStyles = cva({
  base: "",
  variants: {
    size: {
      md: "body-1",
      lg: "body-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MarkdownParagraphProps = React.ComponentPropsWithRef<"p"> & VariantProps<typeof paragraphStyles>;

export const MarkdownParagraph = ({ className, size, ...props }: MarkdownParagraphProps) => (
  <p className={cx(paragraphStyles({ size }), className)} {...props} />
);
