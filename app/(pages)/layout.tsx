import type { Metadata } from "next";
import localFont from "next/font/local";
import { cx } from "@/app/features/style/utils";
import "@/app/features/style/tailwind.css";
import { env } from "@/env";

const exampleFontSans = localFont({
  src: [{ path: "../../public/fonts/example-font-sans.otf", style: "normal" }],
  variable: "--font-example-font-sans",
  weight: "400",
  display: "swap",
});

const exampleFontSerif = localFont({
  src: [{ path: "../../public/fonts/example-font-serif.otf", style: "normal" }],
  variable: "--font-example-font-serif",
  weight: "400",
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
    <html lang="en" className={cx(exampleFontSans.variable, exampleFontSerif.variable)}>
      <body>{children}</body>
    </html>
  );
}
