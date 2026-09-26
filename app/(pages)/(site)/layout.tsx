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

// Pinned under the page, which slides off it. On a window shorter than the footer the offset goes negative,
// so it pins by its top instead and scrolls on for the rest, rather than hiding its top for good.
const footerRevealStyles = cx("sticky", "bottom-[min(0px,100dvh_-_var(--footer-max-height))]");

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={pageAccentStyles}>
      <div className="relative z-1 bg-white">
        <Marquee size="sm" text={HEADER_MARQUEE_TEXT} separator="•" trackClassName="animate-intro-rise" />
        <Navbar />
        <main className="flex flex-col">{children}</main>
        <Marquee size="lg" text={FOOTER_MARQUEE_TEXT} separator="-" className="uppercase" />
      </div>
      <div className={footerRevealStyles}>
        <Footer />
      </div>
    </div>
  );
}
