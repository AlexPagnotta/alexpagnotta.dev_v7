import { useReducedMotion } from "motion/react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import {
  DEFAULT_FEED_FILTER,
  FEED_FILTER_PARAM,
  type FeedFilterValue,
  feedFilterFromParam,
  feedFilterHref,
} from "@/app/features/home-page/feed/filters";

/** The filter in the URL, plus the ref of the tabs that every change of filter scrolls back into view. */
export const useFeedFilter = () => {
  const param = useSearchParams().get(FEED_FILTER_PARAM);
  const filter = feedFilterFromParam(param);
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const lastFilter = React.useRef<FeedFilterValue>(DEFAULT_FEED_FILTER);
  const reduceMotion = useReducedMotion();

  const scrollToTabs = React.useCallback(() => {
    tabsRef.current?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
  }, [reduceMotion]);

  // Any change of filter, from a tab, a link or a page landing on one, brings the tabs to the top.
  React.useEffect(() => {
    if (filter === lastFilter.current) return;
    lastFilter.current = filter;
    scrollToTabs();
  }, [filter, scrollToTabs]);

  // A link to the filter already showing changes nothing, so it would never reach the effect above.
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest("a");
      if (!link) return;
      const url = new URL(link.href);
      const isCurrentFilter = url.pathname === window.location.pathname && url.search === window.location.search;
      if (isCurrentFilter && url.searchParams.has(FEED_FILTER_PARAM)) scrollToTabs();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollToTabs]);

  React.useEffect(() => {
    if (param !== null && filter === DEFAULT_FEED_FILTER) {
      window.history.replaceState(null, "", feedFilterHref(DEFAULT_FEED_FILTER));
    }
  }, [param, filter]);

  return { filter, tabsRef };
};
