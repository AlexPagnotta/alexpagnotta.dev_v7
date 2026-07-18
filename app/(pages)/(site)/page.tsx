import { AboutMe } from "@/app/features/homepage/about-me";
import { Hero } from "@/app/features/homepage/hero";
import { PersonalMarquee } from "@/app/features/homepage/personal-marquee";
import { Stream } from "@/app/features/homepage/stream/stream";
import { TopicsMarquee } from "@/app/features/homepage/topics-marquee";
import { pageMetadata } from "@/app/features/seo/metadata";

// No `title` so the homepage keeps the root `title.default` (untemplated).
export const metadata = pageMetadata({ path: "/", type: "website" });

export default function Home() {
  return (
    <>
      <Hero />
      <TopicsMarquee />
      <Stream />
      <PersonalMarquee />
      <AboutMe />
    </>
  );
}
