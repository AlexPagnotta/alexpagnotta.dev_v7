"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cx } from "@/app/features/style/utils";

type CarouselImage = { src: string; alt: string };

export type CarouselProps = {
  images: CarouselImage[];
};

export const Carousel = ({ images }: CarouselProps) => {
  const trackRef = React.useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul ref={trackRef} className="flex snap-x snap-mandatory gap-16 overflow-x-auto rounded-lg scrollbar-hidden">
        {images.map((image) => (
          <li key={image.src} className="aspect-video w-full shrink-0 snap-center">
            <img src={image.src} alt={image.alt} className="size-full rounded-lg object-cover" />
          </li>
        ))}
      </ul>
      <CarouselButton className="left-16" label="Previous image" onClick={() => scrollBy(-1)}>
        <ChevronLeft className="size-20" aria-hidden="true" />
      </CarouselButton>
      <CarouselButton className="right-16" label="Next image" onClick={() => scrollBy(1)}>
        <ChevronRight className="size-20" aria-hidden="true" />
      </CarouselButton>
    </div>
  );
};

type CarouselButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

const CarouselButton = ({ label, className, onClick, children }: CarouselButtonProps) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={cx(
      "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-cream p-8 shadow-depth-sm",
      "border-2 border-black cursor-pointer",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
      className
    )}
  >
    {children}
  </button>
);
