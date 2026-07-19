import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const pillStyles = cva({
  base: "body-2 inline-block rounded-sm px-12 py-4",
  variants: {
    rotate: {
      true: "-rotate-3",
      false: "",
    },
    uppercase: {
      true: "uppercase font-black",
      false: "",
    },
  },
  defaultVariants: {
    rotate: false,
    uppercase: true,
  },
});

export type PillProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof pillStyles>;

export const Pill = ({ className, rotate, uppercase, ...props }: PillProps) => {
  return <span className={cx(pillStyles({ rotate, uppercase }), className)} {...props} />;
};
