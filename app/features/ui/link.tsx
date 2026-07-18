import NextLink from "next/link";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/**
 * Next's Link, unstyled — for links that wrap a block and bring their own styles.
 * Link below builds its text-link styling on top of it.
 */
export const BaseLink = NextLink;

const linkStyles = cva({
  base: [
    "inline-flex items-center gap-4 cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
  ],
  variants: {
    variant: {
      nav: "body-3 font-normal hover:font-black",
    },
  },
  defaultVariants: {
    variant: "nav",
  },
});

export type LinkProps = React.ComponentPropsWithRef<typeof BaseLink> & VariantProps<typeof linkStyles>;

export const Link = ({ className, variant, ...props }: LinkProps) => {
  return <BaseLink className={cx(linkStyles({ variant }), className)} {...props} />;
};
