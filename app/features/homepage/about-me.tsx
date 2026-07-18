import { Container } from "@/app/features/ui/container";

export const AboutMe = () => {
  return (
    <section id="about-me" className="px-24">
      <Container size="md" className="py-60 lg:py-80">
        <h2 className="display flex flex-wrap items-center justify-center gap-12 text-center lg:gap-24">
          ABOUT ME
          <span
            aria-hidden="true"
            className="size-48 shrink-0 rounded-full border-2 bg-[#d9d9d9] shadow-depth-sm lg:size-96 lg:border-4"
          />
        </h2>
        <div className="mt-40 flex flex-col justify-between gap-40 lg:mt-60 lg:flex-row lg:gap-110">
          <p className="body-2 max-w-500">
            Part blog, part portfolio, part social media
            <br />
            With advent of AI I am not just a dev I am a maker.
            <br />
            <br />
            art portfolio, part social media test lorem ipsum advent of AI I am not just a devmaker
            <br />
            Part blog, part portfolio, part social media
            <br />
            With advent of AI I am not just a dev I am a maker.
            <br />
            <br />
            art portfolio, part social media test lorem ipsum advent of AI I am not just a devmaker
          </p>
          <div className="flex justify-center gap-24 lg:shrink-0 lg:flex-col lg:gap-110">
            <div className="h-180 w-full max-w-205 rotate-[-8deg] rounded-sm bg-[#efefef] lg:w-205" />
            <div className="h-180 w-full max-w-210 rotate-3 rounded-sm bg-[#d9d9d9] lg:w-210" />
          </div>
        </div>
      </Container>
    </section>
  );
};
