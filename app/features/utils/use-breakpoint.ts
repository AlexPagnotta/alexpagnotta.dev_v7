import { useMediaQuery } from "usehooks-ts";
import { type Screen, screens } from "@/app/features/utils/screens";

type UseMediaQueryOptions = Parameters<typeof useMediaQuery>[1];

/**
 * Check if the current screen size is greater than or equal to the breakpoint.
 * @param screen - Screen breakpoint to check against.
 * @param options - The options to pass to the useMediaQuery hook.
 * @returns Boolean indicating whether the current viewport matches the conditions.
 */
export const useBreakpoint = (screen: Screen, options?: UseMediaQueryOptions) => {
  return useMediaQuery(`(min-width: ${screens[screen]})`, {
    initializeWithValue: false,
    ...options,
  });
};

/**
 * Check if the current device is a touch device.
 * @param options - The options to pass to the useMediaQuery hook.
 * @returns Whether the device is a touch device.
 */
export const useIsTouchDevice = (options?: UseMediaQueryOptions) => {
  return useMediaQuery("(pointer: coarse)", {
    initializeWithValue: false,
    ...options,
  });
};
