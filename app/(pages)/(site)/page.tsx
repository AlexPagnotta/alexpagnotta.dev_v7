import { pageMetadata } from "@/app/features/seo/metadata";
import { Container } from "@/app/features/ui/container";

export const metadata = pageMetadata({ path: "/", type: "website" });

export default function HomePage() {
  return (
    <Container size="md" className="px-(--page-spacing) py-96">
      <h1 className="title-1">Home</h1>
    </Container>
  );
}
