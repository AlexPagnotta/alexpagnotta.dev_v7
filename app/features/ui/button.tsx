import type * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";
import { BaseLink } from "@/app/features/ui/link";

const buttonStyles = cva({
  base: [
    "inline-flex items-center justify-center gap-8 rounded-full whitespace-nowrap select-none",
    "cursor-pointer border-black text-black bg-(--btn-fill)",
    "duration-200 ease-pop",
    "focus-visible:outline-hidden",
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
    // Named by the desktop size, `md` and up stepping down on phones. Each fixes its Figma height, since one
    // derived from the label's line box landed on fractions of a pixel.
    size: {
      xs: "border gap-6 px-12 h-32 label-1 lift-2",
      sm: "border px-12 h-40 label-2 lift-2 lg:px-16 lg:h-44 lg:body-1",
      md: "border px-16 h-46 body-1 lift-4 lg:h-50 lg:body-3",
      lg: "border px-20 h-56 heading-4 lift-4 lg:px-24 lg:h-64",
      xl: "border-2 px-32 h-96 heading-2 lift-8 lg:px-48 lg:h-124",
      icon: "border size-52 p-0 body-1 lift-4",
      // Phone size, then desktop size: `sm` up to `md`, `icon` up to `lg`.
      "sm-md": "border px-12 h-40 label-2 lift-2 md:px-16 md:h-46 md:body-1 md:lift-4 lg:h-50 lg:body-3",
      "icon-md": "border size-52 p-0 body-1 lift-4 lg:w-auto lg:h-50 lg:px-16 lg:body-3",
    },
  },
  defaultVariants: {
    color: "white",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

export type ButtonProps = React.ComponentProps<"button"> & ButtonVariants;

export const Button = ({ className, color, size, type = "button", ...props }: ButtonProps) => (
  <button type={type} className={cx(buttonStyles({ color, size }), className)} {...props} />
);

export type ButtonLinkProps = React.ComponentProps<typeof BaseLink> & ButtonVariants;

/** The same button, as a link. Most of the buttons in the design navigate rather than submit. */
export const ButtonLink = ({ className, color, size, ...props }: ButtonLinkProps) => (
  <BaseLink className={cx(buttonStyles({ color, size }), className)} {...props} />
);
