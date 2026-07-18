import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const cardCategoryLabelStyles = cva({
  base: "body-3 inline-block -rotate-3 rounded-sm px-12 py-4 font-black uppercase",
  variants: {
    color: {
      magenta: "bg-magenta text-white",
      green: "bg-green text-white",
      yellow: "bg-yellow text-black",
      cyan: "bg-cyan text-black",
    },
  },
});

export type CardCategoryLabelProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof cardCategoryLabelStyles>;

export const CardCategoryLabel = ({ className, color, ...props }: CardCategoryLabelProps) => {
  return <span className={cx(cardCategoryLabelStyles({ color }), className)} {...props} />;
};
