import { CardLabel, CardLayout } from "@/app/features/homepage/stream/cards/card-layout";

/*
  Thought card — mocked. A short written note on a cream sheet, tagged with the
  "THOUGHTS" category. Copy is placeholder until real thoughts are wired in.
*/
export const ThoughtCard = () => {
  return (
    <CardLayout label={<CardLabel color="yellow">Thoughts</CardLabel>} className="bg-cream p-48">
      <p className="body-1 text-black">
        With the advent of AI I am not just a dev, I am a maker. The tools got faster, the distance between an idea and
        a working thing got shorter, and the only real bottleneck left is taste.
      </p>
    </CardLayout>
  );
};
