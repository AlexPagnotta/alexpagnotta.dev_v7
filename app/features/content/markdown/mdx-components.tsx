import type { MDXComponents } from "mdx/types";
import { MarkdownImage, type MarkdownImageProps } from "@/app/features/content/markdown/markdown-image";
import { MarkdownList, MarkdownListItem } from "@/app/features/content/markdown/markdown-list";
import { MarkdownParagraph } from "@/app/features/content/markdown/markdown-paragraph";
import { MarkdownTitle } from "@/app/features/content/markdown/markdown-title";
import { MarkdownVideo } from "@/app/features/content/markdown/markdown-video";
import { Link } from "@/app/features/ui/link";

export const mdxComponents: MDXComponents = {
  h2: (props) => <MarkdownTitle {...props} />,
  p: (props) => <MarkdownParagraph {...props} />,
  a: ({ href, ...props }) => <Link href={href ?? "#"} {...props} />,
  ul: (props) => <MarkdownList {...props} />,
  ol: (props) => <MarkdownList ordered {...props} />,
  li: (props) => <MarkdownListItem {...props} />,
  // The typeface ships Regular and Black with nothing between, so bold is the 900 cut.
  strong: (props) => <strong className="font-black" {...props} />,
  // `![alt](src "caption")` — markdown's image title is the only slot a caption can ride in.
  img: ({ title, ...props }) => <MarkdownImage caption={title} {...(props as MarkdownImageProps)} />,
  Image: MarkdownImage,
  Video: MarkdownVideo,
};
