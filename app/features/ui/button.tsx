import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  Button is the source of the shared control sizing and color variants. Toggle
  and Select import these so every interactive control stays consistent — same
  sizes, same variant colors (a solid fill here, an active/highlighted fill there).
*/

export type ButtonSize = "huge" | "md" | "sm";
export type ButtonVariant = "green" | "yellow" | "magenta" | "cyan";

export const buttonSizeClass: Record<ButtonSize, string> = {
  huge: "display font-normal rounded-lg px-24 py-12 border-2 lg:border-4 lg:px-96 lg:py-24",
  md: "body-2 px-24 py-12 border-2",
  sm: "caption px-16 py-8 border",
};

const buttonStyles = cva({
  base: [
    "inline-flex items-center justify-center gap-8 rounded-md whitespace-nowrap select-none text-black",
    "cursor-pointer border-black shadow-depth-md bg-(--btn-fill)",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  variants: {
    /*
      A variant only names its fill; the background and the huge size's depth
      shadow both read --btn-fill, so a variant stays one line and one color.
    */
    variant: {
      green: "[--btn-fill:var(--color-green)]",
      yellow: "[--btn-fill:var(--color-yellow)]",
      magenta: "[--btn-fill:var(--color-magenta)]",
      cyan: "[--btn-fill:var(--color-cyan)]",
    },
    size: buttonSizeClass,
  },
  compoundVariants: [
    /*
      Only huge shades its border and shadow from the fill instead of using black —
      at this size black edges read as a second element rather than as depth.
    */
    {
      size: "huge",
      class: [
        "[--btn-shade:color-mix(in_oklab,var(--btn-fill)_78%,black)]",
        "border-(--btn-shade) shadow-depth-lg shadow-(color:--btn-shade)",
      ],
    },
  ],
  defaultVariants: {
    variant: "green",
    size: "md",
  },
});

export type ButtonProps = React.ComponentPropsWithRef<"button"> & VariantProps<typeof buttonStyles>;

export const Button = ({ className, variant, size, type = "button", ...props }: ButtonProps) => {
  return <button type={type} className={cx(buttonStyles({ variant, size }), className)} {...props} />;
};
