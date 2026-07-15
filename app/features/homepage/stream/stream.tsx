import { StreamHeader } from "@/app/features/homepage/stream/header";
import { Container } from "@/app/features/ui/container";

export const Stream = () => {
  return (
    <section className="bg-black px-24">
      <Container size="md" className="flex flex-col py-96">
        <StreamHeader />
      </Container>
    </section>
  );
};
