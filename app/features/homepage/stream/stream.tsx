import { StreamGrid } from "@/app/features/homepage/stream/grid";
import { StreamHeader } from "@/app/features/homepage/stream/header";
import { Container } from "@/app/features/ui/container";

export const Stream = () => {
  return (
    <section id="stream" className=" bg-black py-80 lg:py-96 flex flex-col gap-40 lg:gap-140">
      <Container size="md" enableMdMaxWidth className="px-24">
        <StreamHeader />
      </Container>
      <div>
        <StreamGrid />
      </div>
    </section>
  );
};
