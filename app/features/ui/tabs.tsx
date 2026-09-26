"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/cva";

const tabStyles = cva({
  base: [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none cursor-pointer",
    "h-46 border border-black bg-white px-16 text-black body-2 lg:h-54",
    "not-data-pressed:hover:bg-gray-100 not-data-pressed:focus-visible:bg-gray-100",
    // The button's lift at half its depth.
    "relative lift-2 duration-150 ease-out hover:z-10 focus-visible:z-10",
    "focus-visible:outline-hidden",
  ],
  variants: {
    shape: {
      rounded: "rounded-sm",
      pill: "rounded-full",
    },
    pressedColor: {
      "yellow-light": "data-pressed:bg-yellow-light",
      "green-light": "data-pressed:bg-green-light",
      "pink-light": "data-pressed:bg-pink-light",
    },
  },
  defaultVariants: {
    shape: "rounded",
    pressedColor: "yellow-light",
  },
});

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

/*
  Base UI's ToggleGroup would be the obvious fit, but it is a composite: the whole group
  is one tab stop and the pills are reached with the arrow keys. These are filters worth
  tabbing through, so the row is a plain group of toggle buttons and holds the selection.
*/
const TabsContext = React.createContext<TabsContextValue | null>(null);

export type TabsProps = React.ComponentProps<"div"> & {
  value: string;
  onValueChange: (value: string) => void;
};

export const Tabs = ({ value, onValueChange, className, ...props }: TabsProps) => {
  const context = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange]);

  return (
    <TabsContext.Provider value={context}>
      {/* biome-ignore lint/a11y/useSemanticElements: these are buttons, not form fields, and a fieldset's min-content sizing breaks the scroll row */}
      <div
        role="group"
        className={cx(
          "flex overflow-x-auto scrollbar-hidden",
          // A scroll container clips both axes, and the shadow and focus ring fall outside the
          // pills — pad the scroll box, then pull the space back with margins.
          "px-8 -mx-8 py-8 -my-8",
          className
        )}
        {...props}
      />
    </TabsContext.Provider>
  );
};

export type TabVariants = VariantProps<typeof tabStyles>;
export type TabShape = NonNullable<TabVariants["shape"]>;
export type TabPressedColor = NonNullable<TabVariants["pressedColor"]>;

export type TabProps = Omit<React.ComponentProps<typeof Toggle>, "render" | "pressed" | "onPressedChange"> &
  TabVariants & { value: string };

export const Tab = ({ className, shape, pressedColor, value, ...props }: TabProps) => {
  const context = React.useContext(TabsContext);

  if (!context) throw new Error("Tab must be rendered inside Tabs.");

  return (
    <Toggle
      pressed={context.value === value}
      // Unpressing the active pill would leave nothing selected; re-select it instead.
      onPressedChange={() => context.onValueChange(value)}
      className={cx(tabStyles({ shape, pressedColor }), className)}
      {...props}
    />
  );
};
