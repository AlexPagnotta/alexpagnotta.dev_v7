"use client";

import { Select as BaseSelect } from "@base-ui-components/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cva, cx } from "@/app/features/style/utils";
import { type ButtonSize, type ButtonVariant, buttonSizeClass } from "@/app/features/ui/button";

const selectStyles = cva({
  base: [
    "group inline-flex min-w-160 items-center justify-between gap-8 rounded-md border-black/15 bg-white text-black transition-colors",
    "hover:border-black/40 data-popup-open:border-black",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
  ],
  variants: {
    size: buttonSizeClass,
  },
  defaultVariants: {
    size: "md",
  },
});

const highlightColor: Record<ButtonVariant, string> = {
  green: "data-[highlighted]:bg-green",
  yellow: "data-[highlighted]:bg-yellow",
  magenta: "data-[highlighted]:bg-magenta",
  cyan: "data-[highlighted]:bg-cyan",
};

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  items: SelectOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  "aria-label"?: string;
};

export const Select = ({
  items,
  defaultValue,
  value,
  onValueChange,
  placeholder = "Select…",
  disabled,
  size = "md",
  variant = "green",
  className,
  "aria-label": ariaLabel,
}: SelectProps) => {
  return (
    <BaseSelect.Root
      items={items}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange ? (next) => onValueChange(next as string) : undefined}
      disabled={disabled}
    >
      <BaseSelect.Trigger aria-label={ariaLabel} className={cx(selectStyles({ size }), className)}>
        <BaseSelect.Value>
          {(current: string | null) =>
            current == null ? placeholder : (items.find((item) => item.value === current)?.label ?? placeholder)
          }
        </BaseSelect.Value>
        <BaseSelect.Icon className="flex shrink-0">
          <ChevronDown
            className="size-16-px transition-transform group-data-[popup-open]:-rotate-180"
            aria-hidden="true"
          />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={8} align="start">
          <BaseSelect.Popup
            className={cx(
              "min-w-[var(--anchor-width)] rounded-md border border-black/10 bg-white p-4 outline-none",
              "origin-[var(--transform-origin)] transition-[transform,opacity]",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0"
            )}
          >
            {items.map((item) => (
              <BaseSelect.Item
                key={item.value}
                value={item.value}
                className={cx(
                  "flex cursor-pointer items-center justify-between gap-16 rounded-md px-12 py-8 text-black caption outline-none transition-colors",
                  "data-[highlighted]:text-black",
                  highlightColor[variant]
                )}
              >
                <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="flex shrink-0">
                  <Check className="size-14-px" aria-hidden="true" />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
};
