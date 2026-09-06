"use client";

import { Toggle } from "@base-ui-components/react/toggle";
import * as React from "react";
import { cva, cx, type VariantProps } from "@/app/features/style/utils";
import { Button, type ButtonColor } from "@/app/features/ui/button";

// Keyed by Button's own color type, so a color added there can't silently skip the pills.
const tabPressedColorStyles = {
  white: "data-pressed:[--btn-fill:var(--color-white)]",
  "yellow-1": "data-pressed:[--btn-fill:var(--color-yellow-1)]",
  "green-1": "data-pressed:[--btn-fill:var(--color-green-1)]",
  "blue-1": "data-pressed:[--btn-fill:var(--color-blue-1)]",
  "pink-1": "data-pressed:[--btn-fill:var(--color-pink-1)]",
  "violet-1": "data-pressed:[--btn-fill:var(--color-violet-1)]",
} satisfies Record<ButtonColor, string>;

const tabStyles = cva({
  variants: {
    pressedColor: tabPressedColorStyles,
  },
  defaultVariants: {
    pressedColor: "yellow-1",
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
          "flex gap-12 overflow-x-auto scrollbar-hidden",
          // A scroll container clips both axes, and the pills' shadow and hover travel fall
          // outside their box — pad the scroll box, then pull the space back with margins.
          "px-8 -mx-8 py-8 -my-8",
          className
        )}
        {...props}
      />
    </TabsContext.Provider>
  );
};

export type TabVariants = VariantProps<typeof tabStyles>;
export type TabPressedColor = NonNullable<TabVariants["pressedColor"]>;

export type TabProps = Omit<React.ComponentProps<typeof Toggle>, "render" | "pressed" | "onPressedChange"> &
  TabVariants & { value: string };

export const Tab = ({ className, pressedColor, value, ...props }: TabProps) => {
  const context = React.useContext(TabsContext);

  if (!context) throw new Error("Tab must be rendered inside Tabs.");

  return (
    <Toggle
      pressed={context.value === value}
      // Unpressing the active pill would leave nothing selected; re-select it instead.
      onPressedChange={() => context.onValueChange(value)}
      render={<Button size="sm" />}
      className={cx(tabStyles({ pressedColor }), className)}
      {...props}
    />
  );
};
