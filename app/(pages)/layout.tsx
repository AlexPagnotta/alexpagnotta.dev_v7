import type { Metadata } from "next";
import localFont from "next/font/local";
import { cx } from "@/app/features/style/utils";
import "@/app/features/style/tailwind.css";
import { env } from "@/env";

const ppframa = localFont({
  src: [{ path: "../../public/fonts/ppframa-regular.otf", style: "normal" }],
  variable: "--font-ppframa",
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
    <html lang="en" className={cx(ppframa.variable)}>
      <body>{children}</body>
    </html>
  );
}
