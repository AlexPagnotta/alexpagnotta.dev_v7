import { Container } from "@/app/features/ui/container";
import { Highlight } from "@/app/features/ui/highlight";

export const Hero = () => {
  return (
    <section className="px-24">
      <Container size="md" className="py-96">
        <h1 className="title-2">
          I AM <Highlight color="yellow">ALEX PAGNOTTA,</Highlight> FULL STACK DEV AT{" "}
          <span className="font-black">WILD</span> I MAKE STUFF FOR CLIENTS, WITH HELP FROM AI CHECK MY{" "}
          <em className="text-magenta">STREAM</em>, EVERYTHING I DO, THINK, AND MAKE IN A{" "}
          <Highlight color="cyan">SINGLE PLACE</Highlight>
        </h1>
      </Container>
    </section>
  );
};
