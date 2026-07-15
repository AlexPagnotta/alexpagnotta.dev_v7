import Logo from "@/app/assets/logo.svg";
import { Button } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";
import { Link } from "@/app/features/ui/link";

const NAV_ITEMS = [
  { label: "THE STREAM", href: "/" },
  { label: "ABOUT ME", href: "/about" },
];

export const Header = () => {
  return (
    <header className="px-24">
      <Container className="grid grid-cols-3 items-center border-b-4 border-black py-48">
        <Link href="/" aria-label="Alex Pagnotta, home" className="-rotate-5 justify-self-start">
          <Logo aria-hidden="true" className="h-auto w-160" />
        </Link>
        <nav className="justify-self-center">
          <ul className="flex items-center gap-32">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} variant="nav">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button variant="green" className="rotate-5 justify-self-end">
          Say Hi!
        </Button>
      </Container>
    </header>
  );
};
