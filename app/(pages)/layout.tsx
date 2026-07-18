import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cx } from "@/app/features/style/utils";
import "@/app/features/style/tailwind.css";
import { env } from "@/env";

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
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Example",
    template: "%s | Example",
  },
  description: "Example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cx(ppframa.variable)}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
