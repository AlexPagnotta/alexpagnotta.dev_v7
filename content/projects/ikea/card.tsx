import type { CustomFeedCardProps } from "@/app/features/home-page/feed/cards/feed-card-shell";
import { LogoFeedCard } from "@/app/features/home-page/feed/cards/logo-feed-card";
import logo from "./logo.svg?url";

const IkeaCard = (props: CustomFeedCardProps) => (
  <LogoFeedCard
    {...props}
    lead={
      <>
        A{" "}
        <span role="img" aria-label="Swedish">
          🇸🇪
        </span>{" "}
        project for
      </>
    }
    logo={{ src: logo, alt: "IKEA", className: "w-141 motion-safe:group-engaged:rotate-3" }}
  />
);

export default IkeaCard;
