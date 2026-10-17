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

// Not Base UI's ToggleGroup, which makes the row one tab stop; these filters are worth tabbing through one by one.
const TabsContext = React.createContext<TabsContextValue | null>(null);

export type TabsProps<V extends string> = React.ComponentProps<"div"> & {
  value: V;
  onValueChange: (value: V) => void;
};

export const Tabs = <V extends string>({ value, onValueChange, className, ...props }: TabsProps<V>) => {
  // Each `Tab` only hands back the value it was given, so the context can hold the values as plain strings.
  const context = React.useMemo(
    () => ({ value, onValueChange: onValueChange as (value: string) => void }),
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider value={context}>
      {/* biome-ignore lint/a11y/useSemanticElements: these are buttons, not form fields, and a fieldset's min-content sizing breaks the scroll row */}
      <div
        role="group"
        className={cx(
          "flex overflow-x-auto scrollbar-hidden",
          // A scroll container clips both axes, and the shadow and focus ring fall outside the
          // pills, so pad the scroll box, then pull the space back with margins.
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

export type TabProps<V extends string> = Omit<
  React.ComponentProps<typeof Toggle>,
  "render" | "pressed" | "onPressedChange"
> &
  TabVariants & { value: V };

export const Tab = <V extends string>({ className, shape, pressedColor, value, ...props }: TabProps<V>) => {
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
