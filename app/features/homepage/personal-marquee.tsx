import * as React from "react";
import { Marquee } from "@/app/features/ui/marquee";

const TEXT = ["DEV", "AI", "PHOTOS", "WORK"];

export const PersonalMarquee = () => {
  return (
    <Marquee variant="light" className="border-b-4">
      {TEXT.map((text) => (
        <React.Fragment key={text}>{text}&nbsp;&nbsp;-&nbsp;&nbsp; </React.Fragment>
      ))}
    </Marquee>
  );
};
