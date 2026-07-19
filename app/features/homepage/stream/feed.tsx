"use client";

import * as React from "react";
import type { Category } from "@/app/features/content/config";
import { type StreamFilter, StreamFilterBar } from "@/app/features/homepage/stream/filter-bar";
import { Container } from "@/app/features/ui/container";

export type StreamCard = {
  key: string;
  category: Category;
  node: React.ReactNode;
};

export type StreamFeedProps = {
  cards: StreamCard[];
};

export const StreamFeed = ({ cards }: StreamFeedProps) => {
  const [filter, setFilter] = React.useState<StreamFilter>("everything");

  return (
    <div className="flex flex-col gap-56 lg:gap-80">
      <Container size="md" enableMdMaxWidth className="px-24">
        <StreamFilterBar value={filter} onValueChange={setFilter} />
      </Container>
      <Container size="lg" enableMdMaxWidth className="px-40 lg:px-48">
        <ul className="columns-1 gap-40 lg:gap-64 sm:columns-2 lg:columns-3">
          {cards.map((card) => (
            <li
              key={card.key}
              hidden={filter !== "everything" && card.category !== filter}
              className="mb-48 break-inside-avoid"
            >
              {card.node}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};
