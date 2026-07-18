import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/app/features/seo/config";
import { JsonLd } from "@/app/features/seo/json-ld";
import { cx } from "@/app/features/style/utils";
import { Cursor } from "@/app/features/ui/cursor";
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
  keywords: [...siteConfig.keywords],
  // No `alternates.canonical`, `openGraph.url`, or `openGraph.title` here: those vary per
  // page and are set via `pageMetadata` on each route. A static value would be inherited
  // by every child segment, self-canonicalizing all pages to the homepage.
  //
  // Only the production channel is indexable; preview/staging are hard-blocked here in
  // addition to robots.txt so no non-canonical host can ever be indexed.
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
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.lang} className={cx(ppframa.variable, "scroll-smooth")}>
      <body>
        {children}
        <Cursor />
        <Analytics />
        <JsonLd />
      </body>
    </html>
  );
}
