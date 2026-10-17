import type * as React from "react";

/** Custom properties for a `style` prop, for values that come from content or code rather than the theme. */
export const cssVars = (vars: Record<`--${string}`, string | number | undefined>) => vars as React.CSSProperties;
