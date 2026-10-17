import type { CustomFeedCardProps } from "@/app/features/home-page/feed/cards/feed-card-shell";
import { LogoFeedCard } from "@/app/features/home-page/feed/cards/logo-feed-card";
import logo from "./logo.svg?url";

const DuolingoCard = (props: CustomFeedCardProps) => (
  <LogoFeedCard
    {...props}
    lead="A fun project for"
    logo={{ src: logo, alt: "Duolingo", className: "w-191 motion-safe:group-engaged:-rotate-3" }}
  />
);

export default DuolingoCard;
