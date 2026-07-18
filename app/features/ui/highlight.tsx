import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const highlightStyles = cva({
  base: "box-decoration-clone rounded-sm px-6",
  variants: {
    color: {
      yellow: "bg-yellow",
      cyan: "bg-cyan",
    },
  },
});

export type HighlightProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof highlightStyles>;

export const Highlight = ({ className, color, ...props }: HighlightProps) => {
  return <span className={cx(highlightStyles({ color }), className)} {...props} />;
};
