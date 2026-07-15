import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  Marker-pen emphasis for a run of text. The fill is an inline background so it
  reflows with the line rather than being pinned to it — `box-decoration-clone`
  keeps the rounding on every fragment when the phrase wraps across lines.
*/

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
