import type * as React from "react";
import { Footer } from "@/app/features/nav/footer";
import { Navbar } from "@/app/features/nav/navbar";
import { siteConfig } from "@/app/features/site/config";
import { ACCENTS, PAGE_ACCENT_STYLES } from "@/app/features/style/accents";
import { cx } from "@/app/features/style/cva";
import { Marquee } from "@/app/features/ui/marquee";

const HEADER_MARQUEE_TEXT = "Checkout my latest blog post, I built a secondary screen for my mac";
const FOOTER_MARQUEE_TEXT = "Thanks for visiting";

// A detail page names its accent with `data-page-accent`; the footer paints itself with it.
const pageAccentStyles = cx(
  "[--page-accent:var(--color-yellow-dark)] [--page-gradient:var(--gradient-yellow)]",
  ACCENTS.map((accent) => PAGE_ACCENT_STYLES[accent].page)
);

const footerWrapperStyles = cx("sticky", "bottom-[min(0px,100dvh-var(--footer-max-height))]");

type Props = { children: React.ReactNode };

const SiteLayout = ({ children }: Props) => {
  return (
    <div className={pageAccentStyles}>
      <div className="relative z-1 bg-white">
        <Marquee size="sm" text={HEADER_MARQUEE_TEXT} separator="•" trackClassName="animate-intro-rise" />
        <Navbar contactEmail={siteConfig.author.email} />
        <main className="flex flex-col">{children}</main>
        <Marquee size="lg" text={FOOTER_MARQUEE_TEXT} separator="-" className="uppercase" />
      </div>
      <div className={footerWrapperStyles}>
        <Footer />
      </div>
    </div>
  );
};

export default SiteLayout;
