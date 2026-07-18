import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const cardContentTypeLabelStyles = cva({
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

export type CardContentTypeLabelProps = React.ComponentPropsWithRef<"span"> &
  VariantProps<typeof cardContentTypeLabelStyles>;

export const CardContentTypeLabel = ({ className, color, ...props }: CardContentTypeLabelProps) => {
  return <span className={cx(cardContentTypeLabelStyles({ color }), className)} {...props} />;
};
