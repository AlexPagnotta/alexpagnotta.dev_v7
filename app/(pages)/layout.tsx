import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/app/features/seo/config";
import { SiteJsonLd } from "@/app/features/seo/json-ld";
import { feedAlternates } from "@/app/features/seo/metadata";
import { cx } from "@/app/features/style/utils";
import "@/app/features/style/tailwind.css";
import { isProduction } from "@/app/features/utils/release-channel";

const ppframa = localFont({
  src: [
    { path: "../../public/fonts/ppframa-extralight.otf", weight: "200", style: "normal" },
    { path: "../../public/fonts/ppframa-extralight-italic.otf", weight: "200", style: "italic" },
    { path: "../../public/fonts/ppframa-regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/ppframa-regular-italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/ppframa-black.otf", weight: "900", style: "normal" },
    { path: "../../public/fonts/ppframa-black-italic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-ppframa",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  // Icons and the manifest come from the `app/` file conventions (favicon.ico, icon.svg,
  // apple-icon.png, manifest.ts), which inject their own link tags.
  alternates: { types: feedAlternates },
  // canonical/openGraph.url/title vary per page — set via pageMetadata, not here.
  // Only production is indexable; preview/staging are blocked here too, not just in robots.txt.
  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
      }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage.url],
  },
  // Only the home-screen name: `capable` is the iOS twin of the manifest's `display`, and
  // this site installs as a site rather than a chromeless app.
  appleWebApp: { title: siteConfig.shortName },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  // Paints the browser chrome to match the mark's pink ground on mobile.
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.lang} data-scroll-behavior="smooth" className={cx(ppframa.variable, "scroll-smooth")}>
      <body>
        {children}
        <Analytics />
        <SiteJsonLd />
      </body>
    </html>
  );
}
