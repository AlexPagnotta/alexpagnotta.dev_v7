export type MarkdownFigureProps = {
  /** Sits under the frame, outside the border. */
  caption?: React.ReactNode;
  children: React.ReactNode;
};

/** The frame every piece of body media sits in: a hard black rule, with the caption below it. */
export const MarkdownFigure = ({ caption, children }: MarkdownFigureProps) => (
  <figure className="flex flex-col gap-16">
    {/* The fill shows through while the media loads, and behind anything transparent. */}
    <div className="border-2 border-black bg-grey-2">{children}</div>
    {caption ? <figcaption className="body-2">{caption}</figcaption> : null}
  </figure>
);
