import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const listStyles = cva({
  base: "body-3 flex flex-col gap-8 pl-24 lg:gap-12 lg:pl-32",
  variants: {
    ordered: {
      true: "list-decimal",
      false: "list-disc",
    },
  },
  defaultVariants: {
    ordered: false,
  },
});

export type MarkdownListProps = React.ComponentPropsWithRef<"ol"> & VariantProps<typeof listStyles>;

export const MarkdownList = ({ className, ordered, ...props }: MarkdownListProps) => {
  const styles = cx(listStyles({ ordered }), className);
  return ordered ? <ol className={styles} {...props} /> : <ul className={styles} {...props} />;
};

export type MarkdownListItemProps = React.ComponentPropsWithRef<"li">;

// Nested lists indent from the item rather than adding to the parent's own gap.
export const MarkdownListItem = ({ className, ...props }: MarkdownListItemProps) => (
  <li className={cx("[&>:is(ul,ol)]:mt-8", className)} {...props} />
);
