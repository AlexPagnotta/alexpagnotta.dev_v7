import NextLink from "next/link";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/**
 * Next's Link, unstyled — for links that wrap a block and bring their own styles.
 * Link below builds its text-link styling on top of it.
 */
export const BaseLink = NextLink;

const linkStyles = cva({
  base: ["cursor-pointer", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"],
  variants: {
    variant: {
      plain: "",
      underline: "underline underline-offset-2",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export type LinkProps = React.ComponentPropsWithRef<typeof BaseLink> & VariantProps<typeof linkStyles>;

export const Link = ({ className, variant, ...props }: LinkProps) => {
  return <BaseLink className={cx(linkStyles({ variant }), className)} {...props} />;
};
