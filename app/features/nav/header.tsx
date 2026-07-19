"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import Logo from "@/app/assets/logo.svg";
import { cx } from "@/app/features/style/utils";
import { Button } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";
import { Link } from "@/app/features/ui/link";

const NAV_ITEMS = [
  { label: "THE STREAM", href: "#stream" },
  { label: "ABOUT ME", href: "#about-me" },
];

export const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isProject = pathname.startsWith("/projects");

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const scrollToFooter = () => {
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={cx("lg:mx-24 px-24", !isProject && "border-b-2 border-black")}>
      <Container className="grid grid-cols-3 items-center py-40 lg:py-48">
        <Link href="/" aria-label="Alex Pagnotta, home" className="-rotate-5 justify-self-start">
          <Logo aria-hidden="true" className="h-auto w-140 lg:w-160" />
        </Link>
        <nav className="justify-self-center">
          {isHome && (
            <ul className="hidden items-center gap-32 lg:flex">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} variant="nav">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <Button variant="green" className="rotate-5 justify-self-end" onClick={scrollToFooter}>
          Say Hi!
        </Button>
      </Container>
    </header>
  );
};
