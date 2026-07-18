import { cva, cx, type VariantProps } from "@/app/features/style/utils";
import { Pill } from "@/app/features/ui/pill";

const cardContentTypeLabelStyles = cva({
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
  return <Pill rotate className={cx(cardContentTypeLabelStyles({ color }), className)} {...props} />;
};
