import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import { BaseLink } from "@/app/features/ui/link";

/*
  Every button in the design is a black-bordered pill on a hard offset shadow, with a
  solid fill; only the fill color changes. Each size binds its own type style and its own
  height, taken from Figma: deriving the height from the label's line box left it on a
  fraction of a pixel and moved every pill whenever a type step was retuned.
*/

const buttonStyles = cva({
  base: [
    "inline-flex items-center justify-center gap-8 rounded-full whitespace-nowrap select-none",
    "cursor-pointer border-black text-black bg-(--btn-fill)",
    "duration-200 ease-pop",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  variants: {
    color: {
      white: "[--btn-fill:var(--color-white)]",
      "yellow-dark": "[--btn-fill:var(--color-yellow-dark)]",
      "yellow-light": "[--btn-fill:var(--color-yellow-light)]",
      "green-dark": "[--btn-fill:var(--color-green-dark)]",
      "green-light": "[--btn-fill:var(--color-green-light)]",
      "pink-dark": "[--btn-fill:var(--color-pink-dark)]",
      "pink-light": "[--btn-fill:var(--color-pink-light)]",
    },
    // Named by the desktop size; `md` and `lg` step down on phones.
    size: {
      md: "border px-16 h-52 body-1 lift-4 lg:h-56 lg:body-3",
      lg: "border-2 px-32 h-96 heading-2 lift-8 lg:px-48 lg:h-124",
      icon: "border size-52 p-0 body-1 lift-4",
    },
  },
  defaultVariants: {
    color: "white",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
export type ButtonColor = NonNullable<ButtonVariants["color"]>;
export type ButtonSize = NonNullable<ButtonVariants["size"]>;

export type ButtonProps = React.ComponentProps<"button"> & ButtonVariants;

export const Button = ({ className, color, size, type = "button", ...props }: ButtonProps) => (
  <button type={type} className={cx(buttonStyles({ color, size }), className)} {...props} />
);

export type ButtonLinkProps = React.ComponentProps<typeof BaseLink> & ButtonVariants;

/** The same button, as a link. Most of the buttons in the design navigate rather than submit. */
export const ButtonLink = ({ className, color, size, ...props }: ButtonLinkProps) => (
  <BaseLink className={cx(buttonStyles({ color, size }), className)} {...props} />
);
