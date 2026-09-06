import { Feed } from "@/app/features/homepage/feed/feed";
import { Hero } from "@/app/features/homepage/hero";
import { pageMetadata } from "@/app/features/seo/metadata";

export const metadata = pageMetadata({ path: "/", type: "website" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <Feed />
    </>
  );
}
