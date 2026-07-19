import { Container } from "@/app/features/ui/container";

export const AboutMe = () => {
  return (
    <section id="about-me" className="px-24">
      <Container size="md" className="py-80 lg:py-96 flex flex-col gap-40 lg:gap-64" enableMdMaxWidth>
        <h2 className="display flex items-center gap-16 justify-start lg:justify-center lg:gap-32">
          ABOUT ME
          <span
            aria-hidden="true"
            className="size-48 shrink-0 rounded-full border-2 bg-[#d9d9d9] shadow-depth-sm lg:size-96 lg:border-4"
          />
        </h2>
        <div className="flex flex-col lg:flex-row gap-64 lg:gap-80">
          <p className="body-2 flex-1">
            Part blog, part portfolio, part social media With advent of AI I am not just a dev I am a maker.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
          </p>
          <div className="flex justify-center gap-24 md:gap-64 shrink-0 lg:flex-col lg:gap-80 lg:pr-80">
            <div className="w-160 aspect-square lg:aspect-4/3 -rotate-2 rounded-sm bg-[#efefef] lg:w-220" />
            <div className="w-160 aspect-square lg:aspect-4/3 rotate-6 rounded-sm bg-[#d9d9d9] lg:w-220" />
          </div>
        </div>
      </Container>
    </section>
  );
};
