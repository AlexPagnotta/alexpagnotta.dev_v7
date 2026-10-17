import type * as React from "react";
import { EntryTags } from "@/app/features/content/entry-tags";
import { type CustomFeedCardProps, FeedCardShell } from "@/app/features/home-page/feed/cards/feed-card-shell";
import { cx } from "@/app/features/style/cva";
import { Card } from "@/app/features/ui/card";
import { Image, type ImageProps } from "@/app/features/ui/image";

const logoStyles = cx(
  "transition-[rotate,scale] duration-300 ease-pop pointer-coarse:duration-500",
  "motion-safe:group-engaged:scale-108"
);

type Props = CustomFeedCardProps & {
  /** The line the logo completes, e.g. "A fun project for". */
  lead: React.ReactNode;
  /** `className` carries the logo's width and its hover tilt. */
  logo: ImageProps;
};

/** A client card: the lead line over the client's logo, with the tags pinned to the bottom corner. */
export const LogoFeedCard = ({ href, tags, accent, type, lead, logo: { className, ...logo } }: Props) => (
  <FeedCardShell href={href} accent={accent} className="group h-288 gap-16">
    {/* The only child in flow, so `mt-auto` drops it into the card's bottom corner. */}
    <Card.Tags align="end" className="mt-auto">
      <EntryTags type={type} tags={tags} />
    </Card.Tags>
    {/* Deeper bottom inset than the shell's own, so the logo centres above the tag row. */}
    <Card.CustomBody cardSpacing className="flex items-center justify-center pb-48">
      <h3 className="body-4 flex flex-col items-center gap-16 text-center">
        <span>{lead}</span>
        <Image {...logo} className={cx(logoStyles, className)} />
      </h3>
    </Card.CustomBody>
  </FeedCardShell>
);
