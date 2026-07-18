import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const listStyles = cva({
  base: "body-1 flex flex-col gap-8 pl-24",
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

export type MarkdownListProps = React.ComponentPropsWithoutRef<"ul"> & VariantProps<typeof listStyles>;

export const MarkdownList = ({ className, ordered, ...props }: MarkdownListProps) => {
  const cn = cx(listStyles({ ordered }), className);
  return ordered ? <ol className={cn} {...props} /> : <ul className={cn} {...props} />;
};

export type MarkdownListItemProps = React.ComponentPropsWithRef<"li">;

export const MarkdownListItem = (props: MarkdownListItemProps) => <li {...props} />;
