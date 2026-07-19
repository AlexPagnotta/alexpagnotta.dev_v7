"use client";

import { ToggleGroup, ToggleGroupItem } from "@/app/features/ui/toggle-group";

// "everything" clears the filter; the rest map to a content category.
export type StreamFilter = "everything" | "personal" | "work";

export type StreamFilterBarProps = {
  value: StreamFilter;
  onValueChange: (value: StreamFilter) => void;
};

export const StreamFilterBar = ({ value, onValueChange }: StreamFilterBarProps) => {
  return (
    <div className="flex items-center gap-16">
      <span className="body-2 text-white">Show me:</span>
      <ToggleGroup
        aria-label="Filter the stream"
        value={[value]}
        // Single-select: keep the last choice instead of allowing an empty selection.
        onValueChange={([next]) => next && onValueChange(next as StreamFilter)}
        size="md"
      >
        <ToggleGroupItem value="everything">Everything</ToggleGroupItem>
        <ToggleGroupItem value="work">Work</ToggleGroupItem>
        <ToggleGroupItem value="personal">Personal</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
