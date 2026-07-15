import { cx } from "@/app/features/style/utils";
import { BaseLink } from "@/app/features/ui/link";
import { StackedCarousel } from "@/app/features/ui/stacked-carousel";

/*
  Placeholder cards — real stream content comes later, so each card is just a
  solid block. More cards than the stack shows at once, to exercise the cycle.
*/
const CARDS = [
  { id: "duolingo", href: "/", color: "bg-green" },
  { id: "thoughts", href: "/", color: "bg-yellow" },
  { id: "posts", href: "/", color: "bg-cyan" },
  { id: "photos", href: "/", color: "bg-magenta" },
  { id: "work", href: "/", color: "bg-white" },
];

export const StreamCarousel = () => {
  return (
    <StackedCarousel
      label="The stream"
      prevLabel="Previous card"
      nextLabel="Next card"
      className="py-40"
      cardClassName="h-457 w-349"
      items={CARDS.map(({ id, href, color }) => ({
        id,
        content: (
          <BaseLink
            href={href}
            aria-label={`Open ${id}`}
            className={cx(
              "block size-full cursor-pointer rounded-md border-2 border-black shadow-depth-md",
              // White rather than the usual black: the section behind is black.
              "focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2",
              color
            )}
          />
        ),
      }))}
    />
  );
};
