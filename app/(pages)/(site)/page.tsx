import type { Metadata } from "next";
import { Feed } from "@/app/features/home-page/feed/feed";
import { Hero } from "@/app/features/home-page/hero";
import { pageMetadata } from "@/app/features/seo/metadata";

export const metadata: Metadata = pageMetadata({ path: "/", type: "website" });

const HomePage = () => {
  return (
    <>
      <Hero />
      <Feed />
    </>
  );
};

export default HomePage;
