import { Footer } from "@/app/features/nav/footer";
import { Navbar } from "@/app/features/nav/navbar";
import { Marquee } from "@/app/features/ui/marquee";

const HEADER_MARQUEE_TEXT = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor";
const FOOTER_MARQUEE_TEXT = "Thanks for visiting";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Marquee size="sm" text={HEADER_MARQUEE_TEXT} separator="•" />
      <Navbar />
      <main className="flex flex-col">{children}</main>
      <Marquee size="lg" text={FOOTER_MARQUEE_TEXT} separator="-" className="uppercase" />
      <Footer />
    </>
  );
}
