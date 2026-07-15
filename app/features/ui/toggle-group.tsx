"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import * as React from "react";
import { cva, cx } from "@/app/features/style/utils";
import { type ButtonSize, type ButtonVariant, buttonSizeClass } from "@/app/features/ui/button";

const toggleGroupItemStyles = cva({
  base: [
    "cursor-pointer rounded-md border-black/15 bg-white text-black transition-colors",
    "hover:border-black/40 data-pressed:border-black",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
  ],
  variants: {
    variant: {
      green: "data-pressed:bg-green",
      yellow: "data-pressed:bg-yellow",
      magenta: "data-pressed:bg-magenta",
      cyan: "data-pressed:bg-cyan",
    },
    size: buttonSizeClass,
  },
  defaultVariants: {
    variant: "green",
    size: "md",
  },
});

type ToggleGroupContextValue = {
  size: ButtonSize;
  variant: ButtonVariant;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "md",
  variant: "green",
});

export type ToggleGroupProps = Omit<React.ComponentPropsWithRef<typeof BaseToggleGroup>, "className"> & {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const ToggleGroup = ({ className, size = "md", variant = "green", ...props }: ToggleGroupProps) => {
  return (
    <ToggleGroupContext.Provider value={{ size, variant }}>
      <BaseToggleGroup className={cx("inline-flex flex-wrap items-center gap-8", className)} {...props} />
    </ToggleGroupContext.Provider>
  );
};

export type ToggleGroupItemProps = Omit<React.ComponentPropsWithRef<typeof Toggle>, "className"> & {
  className?: string;
};

export const ToggleGroupItem = ({ className, ...props }: ToggleGroupItemProps) => {
  const { size, variant } = React.useContext(ToggleGroupContext);
  return <Toggle className={cx(toggleGroupItemStyles({ size, variant }), className)} {...props} />;
};
