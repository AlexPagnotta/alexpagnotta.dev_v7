import Logo from "@/app/assets/logo.svg";
import { Button } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";

export const Footer = () => {
  return (
    <footer id="footer" className="relative shrink-0 overflow-hidden bg-black px-24 text-white">
      <Logo
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-auto w-full -rotate-8 opacity-4 lg:w-3/5"
      />
      <Container className="relative flex flex-col gap-60 py-80 lg:gap-96 lg:py-120">
        <p className="title-3 max-w-650">
          NEED A DEVELOPER? NEED TO BUILD A WEBSITE? NEED A COMPLEX AI SYSTEM? HAVE AN IDEA THAT WILL FOR SURE MAKE
          MILLIONS BUT YOU NEED SOMEONE TO BUILD IT?
        </p>
        <Button size="huge" variant="green" className="-rotate-2 self-stretch focus-visible:outline-white lg:self-end">
          Let&apos;s Connect
        </Button>
      </Container>
    </footer>
  );
};
