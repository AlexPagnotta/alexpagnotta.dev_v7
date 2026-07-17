import { cx } from "@/app/features/style/utils";

/*
  Placeholder masonry grid — real stream cards come later. Each item is a solid
  colored block with a varied height to exercise the masonry column flow. Heights
  and colors are fixed (not random at runtime) to keep server/client markup in sync.
*/
const ITEMS = [
  { color: "bg-yellow", height: "h-300" },
  { color: "bg-cyan", height: "h-457" },
  { color: "bg-magenta", height: "h-240" },
  { color: "bg-green", height: "h-360" },
  { color: "bg-white", height: "h-200" },
  { color: "bg-yellow", height: "h-420" },
  { color: "bg-magenta", height: "h-300" },
  { color: "bg-cyan", height: "h-260" },
  { color: "bg-green", height: "h-440" },
  { color: "bg-white", height: "h-320" },
  { color: "bg-yellow", height: "h-220" },
  { color: "bg-magenta", height: "h-400" },
];

export const StreamGrid = () => {
  return (
    <ul className="columns-1 gap-24 sm:columns-2 lg:columns-3">
      {ITEMS.map(({ color, height }, index) => (
        <li key={index} className="mb-24 break-inside-avoid">
          <div className={cx("w-full rounded-md", height, color)} />
        </li>
      ))}
    </ul>
  );
};
