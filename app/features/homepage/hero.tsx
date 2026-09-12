import { Container } from "@/app/features/ui/container";

export const Hero = () => {
  return (
    // Padding is symmetric while the ALEX PAGNOTTA title is missing; the design pads only the bottom.
    // `data-navbar-boundary` keeps the revealed navbar off the hero, see `nav/navbar.tsx`.
    <section data-navbar-boundary className="border-b-2 border-black bg-green-1 py-120">
      <Container className="px-(--page-side-spacing)">
        <p className="headline-4 text-balance text-center">
          I'M ALEX, WELCOME TO MY LITTLE DIGITAL PLACE. HERE I SHARE MY DEV WORK, THOUGHTS, PHOTOS, THINGS I MAKE, AND
          WHATEVER I HAPPEN TO BE <em className="font-black">CURIOUS</em> ABOUT.
        </p>
      </Container>
    </section>
  );
};
