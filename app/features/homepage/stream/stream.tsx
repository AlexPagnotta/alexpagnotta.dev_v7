import { StreamGrid } from "@/app/features/homepage/stream/grid";
import { StreamHeader } from "@/app/features/homepage/stream/header";
import { Container } from "@/app/features/ui/container";

export const Stream = () => {
  return (
    <section id="stream" className=" bg-black px-24 py-96">
      <Container size="md">
        <StreamHeader />
      </Container>
      <Container size="lg" className="mt-96">
        <StreamGrid />
      </Container>
    </section>
  );
};
