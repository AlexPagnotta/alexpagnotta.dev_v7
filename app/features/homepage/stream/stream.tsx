import { StreamCarousel } from "@/app/features/homepage/stream/carousel";
import { StreamHeader } from "@/app/features/homepage/stream/header";
import { Container } from "@/app/features/ui/container";

export const Stream = () => {
  return (
    // overflow-x-clip: cards slide out sideways. `clip` rather than `hidden` so
    // the vertical axis stays visible and the fanned cards aren't cut off.
    <section className="overflow-x-clip bg-black px-24">
      <Container size="md" className="flex flex-col py-96">
        <StreamHeader />
        <StreamCarousel />
      </Container>
    </section>
  );
};
