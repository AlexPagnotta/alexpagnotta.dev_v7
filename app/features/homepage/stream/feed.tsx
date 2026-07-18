"use client";

import * as React from "react";
import type { Category } from "@/app/features/content/config";
import { type StreamFilter, StreamFilterBar } from "@/app/features/homepage/stream/filter-bar";

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
    <div className="flex flex-col gap-56">
      <StreamFilterBar value={filter} onValueChange={setFilter} />
      <ul className="columns-1 gap-56 sm:columns-2 lg:columns-3">
        {cards.map((card) => (
          <li
            key={card.key}
            hidden={filter !== "everything" && card.category !== filter}
            className="mb-32 break-inside-avoid"
          >
            {card.node}
          </li>
        ))}
      </ul>
    </div>
  );
};
