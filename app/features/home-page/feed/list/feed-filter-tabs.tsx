import type * as React from "react";
import { FEED_FILTERS, type FeedFilterValue, pushFilter } from "@/app/features/home-page/feed/filters";
import { cssVars } from "@/app/features/style/css-vars";
import { Tab, Tabs } from "@/app/features/ui/tabs";

const tabsStyles =
  "scroll-mt-48 max-lg:-mx-(--page-side-spacing) max-lg:px-(--page-side-spacing) md:justify-center-safe";

type Props = {
  filter: FeedFilterValue;
  tabsRef?: React.Ref<HTMLDivElement>;
};

export const FeedFilterTabs = ({ filter, tabsRef }: Props) => (
  <Tabs ref={tabsRef} aria-label="Filter by" value={filter} onValueChange={pushFilter} className={tabsStyles}>
    {FEED_FILTERS.map(({ value, label, shape }, index) => (
      <Tab
        key={value}
        value={value}
        shape={shape}
        className="animate-intro-fade intro-delay-filters"
        style={cssVars({ "--intro-index": index })}
      >
        {label}
      </Tab>
    ))}
  </Tabs>
);
