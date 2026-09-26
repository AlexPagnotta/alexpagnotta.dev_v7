import { Footer } from "@/app/features/nav/footer";
import { Navbar } from "@/app/features/nav/navbar";
import { cx } from "@/app/features/style/utils";
import { Marquee } from "@/app/features/ui/marquee";

const HEADER_MARQUEE_TEXT = "Checkout my latest blog post, I built a secondary screen for my mac";
const FOOTER_MARQUEE_TEXT = "Thanks for visiting";

// A detail page names its accent with `data-page-accent`; the footer paints itself with it.
const pageAccentStyles = cx(
  "[--page-accent:var(--color-yellow-dark)] [--page-gradient:var(--gradient-yellow)]",
  "has-[[data-page-accent=green]]:[--page-accent:var(--color-green-dark)] has-[[data-page-accent=green]]:[--page-gradient:var(--gradient-green)]",
  "has-[[data-page-accent=pink]]:[--page-accent:var(--color-pink-dark)] has-[[data-page-accent=pink]]:[--page-gradient:var(--gradient-pink)]"
);

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={pageAccentStyles}>
      <Marquee size="sm" text={HEADER_MARQUEE_TEXT} separator="•" trackClassName="animate-intro-rise" />
      <Navbar />
      <main className="flex flex-col">{children}</main>
      <Marquee size="lg" text={FOOTER_MARQUEE_TEXT} separator="-" className="uppercase" />
      <Footer />
    </div>
  );
}
