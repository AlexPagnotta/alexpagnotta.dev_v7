import type { CustomFeedCardProps } from "@/app/features/home-page/feed/cards/feed-card-shell";
import { LogoFeedCard } from "@/app/features/home-page/feed/cards/logo-feed-card";
import logo from "./logo.webp";

const BrawlStarsCard = (props: CustomFeedCardProps) => (
  <LogoFeedCard
    {...props}
    lead="A secret project for"
    logo={{
      src: logo,
      alt: "Brawl Stars",
      sizes: "144px",
      placeholder: "empty",
      className: "w-144 motion-safe:group-engaged:rotate-3",
    }}
  />
);

export default BrawlStarsCard;
