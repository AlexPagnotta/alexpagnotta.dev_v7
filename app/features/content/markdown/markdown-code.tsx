import * as React from "react";
import { MarkdownCopyButton } from "@/app/features/content/markdown/markdown-copy-button";
import { cx } from "@/app/features/style/cva";

export type MarkdownCodeProps = React.ComponentPropsWithRef<"code">;

// Sized in `em` so it follows whichever body step the paragraph uses.
const codeStyles = cx(
  "rounded-xs border border-black/10 bg-gray-100 px-4 box-decoration-clone font-mono text-[0.875em] [overflow-wrap:anywhere]",
  "in-[pre]:rounded-none in-[pre]:border-0 in-[pre]:bg-transparent in-[pre]:p-0 in-[pre]:text-[length:inherit]"
);

export const MarkdownCode = ({ className, ...props }: MarkdownCodeProps) => (
  <code className={cx(codeStyles, className)} {...props} />
);

export type MarkdownCodeBlockProps = React.ComponentPropsWithRef<"pre">;

const copyButtonPositionStyles = "absolute -top-16 -right-12 rotate-6";

const codeBlockStyles = cx(
  "code-1 overflow-x-auto rounded-lg border-2 border-black bg-gray-100 p-16 pt-28 [tab-size:2] lg:p-24 lg:pt-28",
  "scrollbar-thin scrollbar-thumb-gray-dark focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-black"
);

type CodeElementProps = { children?: React.ReactNode };

/** MDX hands `pre` a single `code` child carrying the raw source. */
const readCodeText = (children: React.ReactNode) => {
  const child = React.Children.only(children);
  if (!React.isValidElement<CodeElementProps>(child)) return "";
  return typeof child.props.children === "string" ? child.props.children.trimEnd() : "";
};

export const MarkdownCodeBlock = ({ className, children, ...props }: MarkdownCodeBlockProps) => {
  const text = readCodeText(children);

  return (
    <div className="relative">
      {text && <MarkdownCopyButton text={text} className={copyButtonPositionStyles} />}
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: focusable so keyboard users can scroll a long line into view */}
      <pre tabIndex={0} className={cx(codeBlockStyles, className)} {...props}>
        {children}
      </pre>
    </div>
  );
};
