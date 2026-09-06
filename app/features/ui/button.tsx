"use client";

import { type HTMLMotionProps, motion, type Transition, useReducedMotion } from "motion/react";
import NextLink from "next/link";
import * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";

/*
  Every button in the design is a black-bordered pill on a hard offset shadow, with a
  solid fill; only the fill color changes. Each size binds its own type style, because
  no height is fixed in the design, it falls out of the label's line box plus padding
  and border.
*/

const buttonStyles = cva({
  base: [
    "inline-flex items-center justify-center gap-8 rounded-full whitespace-nowrap select-none",
    "cursor-pointer border-black text-black bg-(--btn-fill)",
    // Offset lives in its own custom property so motion can spring it while the color stays declarative.
    "shadow-[var(--btn-shadow-offset)_var(--btn-shadow-offset)_0_0_var(--color-black)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  variants: {
    color: {
      white: "[--btn-fill:var(--color-white)]",
      "yellow-1": "[--btn-fill:var(--color-yellow-1)]",
      "green-1": "[--btn-fill:var(--color-green-1)]",
      "blue-1": "[--btn-fill:var(--color-blue-1)]",
      "pink-1": "[--btn-fill:var(--color-pink-1)]",
      "violet-1": "[--btn-fill:var(--color-violet-1)]",
    },
    size: {
      sm: "border px-16 py-4 body-3",
      md: "border px-24 py-4 body-4",
      lg: "border px-24 py-4 body-5",
      xl: "border-2 px-24 py-16 headline-2 lg:px-48 lg:py-24",
      "icon-sm": "border-2 size-40 p-0 body-1",
      "icon-md": "border-2 size-52 p-0 body-1",
    },
  },
  defaultVariants: {
    color: "white",
    size: "sm",
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
export type ButtonColor = NonNullable<ButtonVariants["color"]>;
export type ButtonSize = NonNullable<ButtonVariants["size"]>;

// Shadow offset in px for each interaction state; the button's travel is derived from these.
const shadowDepth: Record<ButtonSize, { rest: number; hover: number; press: number }> = {
  sm: { rest: 4, hover: 8, press: 2 },
  md: { rest: 4, hover: 8, press: 2 },
  lg: { rest: 4, hover: 8, press: 2 },
  xl: { rest: 8, hover: 14, press: 4 },
  "icon-sm": { rest: 2, hover: 4, press: 1 },
  "icon-md": { rest: 2, hover: 4, press: 1 },
};

const liftSpring: Transition = { type: "spring", stiffness: 400, damping: 22, mass: 0.6 };
const pressSpring: Transition = { type: "spring", stiffness: 700, damping: 34, mass: 0.5 };

const animationVariants = (size: ButtonSize, prefersReducedMotion: boolean) => {
  const { rest, hover, press } = shadowDepth[size];
  const transition = (spring: Transition) => (prefersReducedMotion ? { duration: 0 } : spring);

  // Travel mirrors the shadow's growth exactly, which is what pins the shadow's outer corner in place.
  return {
    rest: { x: 0, y: 0, "--btn-shadow-offset": `${rest}px` },
    hover: {
      x: rest - hover,
      y: rest - hover,
      "--btn-shadow-offset": `${hover}px`,
      transition: transition(liftSpring),
    },
    press: {
      x: rest - press,
      y: rest - press,
      "--btn-shadow-offset": `${press}px`,
      transition: transition(pressSpring),
    },
  };
};

const useButtonMotion = (size: ButtonSize, interactive: boolean) => {
  const prefersReducedMotion = useReducedMotion();

  const variants = React.useMemo(
    () => animationVariants(size, prefersReducedMotion ?? false),
    [size, prefersReducedMotion]
  );

  return {
    variants,
    initial: "rest",
    whileHover: interactive ? "hover" : undefined,
    whileTap: interactive ? "press" : undefined,
  } as const;
};

export type ButtonProps = HTMLMotionProps<"button"> & ButtonVariants;

export const Button = ({ className, color, size = "sm", type = "button", disabled, ...props }: ButtonProps) => {
  const animation = useButtonMotion(size, !disabled);

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cx(buttonStyles({ color, size }), className)}
      {...animation}
      {...props}
    />
  );
};

const MotionLink = motion.create(NextLink);

export type ButtonLinkProps = React.ComponentProps<typeof MotionLink> & ButtonVariants;

/** The same button, as a link. Most of the buttons in the design navigate rather than submit. */
export const ButtonLink = ({ className, color, size = "sm", ...props }: ButtonLinkProps) => {
  const animation = useButtonMotion(size, true);

  return <MotionLink className={cx(buttonStyles({ color, size }), className)} {...animation} {...props} />;
};
