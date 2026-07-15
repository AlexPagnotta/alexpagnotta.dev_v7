import { AboutMe } from "@/app/features/homepage/about-me";
import { Hero } from "@/app/features/homepage/hero";
import { PersonalMarquee } from "@/app/features/homepage/personal-marquee";
import { Stream } from "@/app/features/homepage/stream/stream";
import { TopicsMarquee } from "@/app/features/homepage/topics-marquee";
import { Footer } from "@/app/features/nav/footer";
import { Header } from "@/app/features/nav/header";

export default function Home() {
  return (
    <main className="flex flex-col h-full overflow-y-auto scrollbar-thumb-black">
      <Header />
      <Hero />
      <TopicsMarquee />
      <Stream />
      <PersonalMarquee />
      <AboutMe />
      <Footer />
    </main>
  );
}
