export type MarkdownFigureProps = {
  /** Sits under the frame, outside the border. */
  caption?: React.ReactNode;
  children: React.ReactNode;
};

/** The frame every piece of body media sits in: a hard black rule, with the caption below it. */
export const MarkdownFigure = ({ caption, children }: MarkdownFigureProps) => (
  <figure className="flex flex-col gap-16">
    {/* The fill shows through while the media loads, and behind anything transparent. */}
    <div className="border-2 border-black bg-gray-300">{children}</div>
    {caption ? <figcaption className="body-1">{caption}</figcaption> : null}
  </figure>
);
