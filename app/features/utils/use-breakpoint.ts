import { useMediaQuery } from "usehooks-ts";
import { type Screen, screens } from "@/app/features/utils/screens";

type UseMediaQueryOptions = Parameters<typeof useMediaQuery>[1];

export const useBreakpoint = (screen: Screen, options?: UseMediaQueryOptions) => {
  return useMediaQuery(`(min-width: ${screens[screen]})`, {
    initializeWithValue: false,
    ...options,
  });
};
