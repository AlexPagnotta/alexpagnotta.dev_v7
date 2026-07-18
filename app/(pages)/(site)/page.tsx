import { AboutMe } from "@/app/features/homepage/about-me";
import { Hero } from "@/app/features/homepage/hero";
import { PersonalMarquee } from "@/app/features/homepage/personal-marquee";
import { Stream } from "@/app/features/homepage/stream/stream";
import { TopicsMarquee } from "@/app/features/homepage/topics-marquee";

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
