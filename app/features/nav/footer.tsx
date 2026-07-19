import Logo from "@/app/assets/logo.svg";
import { Button } from "@/app/features/ui/button";
import { Container } from "@/app/features/ui/container";

export const Footer = () => {
  return (
    <footer id="footer" className="relative shrink-0 overflow-hidden bg-black px-24 text-white">
      <Logo
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-30 -left-80 lg:-bottom-120 lg:-left-200 h-auto -rotate-8 opacity-5 w-400 lg:w-900"
      />
      <Container className="relative flex flex-col gap-64 pt-80 pb-180 lg:gap-120 lg:py-120" enableMdMaxWidth>
        <p className="title-3 max-w-560">
          NEED A DEVELOPER? NEED TO BUILD A WEBSITE? NEED A COMPLEX AI SYSTEM? HAVE AN IDEA THAT WILL FOR SURE MAKE
          MILLIONS BUT YOU NEED SOMEONE TO BUILD IT?
        </p>
        <Button size="huge" variant="green" className="-rotate-2 focus-visible:outline-white self-end">
          Let&apos;s Connect
        </Button>
      </Container>
    </footer>
  );
};
