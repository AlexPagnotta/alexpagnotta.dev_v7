import NextLink from "next/link";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

const linkStyles = cva({
  base: [
    "inline-flex items-center gap-4 cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
  ],
  variants: {
    variant: {
      nav: "body-2 font-normal hover:font-black",
    },
  },
  defaultVariants: {
    variant: "nav",
  },
});

export type LinkProps = React.ComponentPropsWithRef<typeof NextLink> & VariantProps<typeof linkStyles>;

export const Link = ({ className, variant, ...props }: LinkProps) => {
  return <NextLink className={cx(linkStyles({ variant }), className)} {...props} />;
};
