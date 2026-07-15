import * as React from "react";
import { Marquee } from "@/app/features/ui/marquee";

const TEXT = [
  { label: "WORK", separatorColor: "text-magenta" },
  { label: "AI", separatorColor: "text-yellow" },
  { label: "PHOTOS", separatorColor: "text-cyan" },
  { label: "THOUGHTS", separatorColor: "text-green" },
];

export const TopicsMarquee = () => {
  return (
    <Marquee>
      <span className="flex items-center gap-20">
        {TEXT.map(({ label, separatorColor }) => (
          <React.Fragment key={label}>
            <span className="font-black">{label}</span>
            <span aria-hidden="true" className={separatorColor}>
              ✷
            </span>
          </React.Fragment>
        ))}
      </span>
    </Marquee>
  );
};
