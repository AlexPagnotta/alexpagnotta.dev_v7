import type { MDXComponents } from "mdx/types";
import { MarkdownImage } from "@/app/features/content/mdx/image";
import { MarkdownList, MarkdownListItem } from "@/app/features/content/mdx/list";
import { MarkdownParagraph } from "@/app/features/content/mdx/paragraph";
import { MarkdownTitle } from "@/app/features/content/mdx/title";
import { MarkdownVideo } from "@/app/features/content/mdx/video";
import type { ImageProps } from "@/app/features/ui/image";
import { Link } from "@/app/features/ui/link";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => <MarkdownTitle>{children}</MarkdownTitle>,
  p: ({ children }) => <MarkdownParagraph>{children}</MarkdownParagraph>,
  a: ({ href, children }) => (
    <Link href={href ?? "#"} variant="default">
      {children}
    </Link>
  ),
  ul: ({ children }) => <MarkdownList>{children}</MarkdownList>,
  ol: ({ children }) => <MarkdownList ordered>{children}</MarkdownList>,
  li: ({ children }) => <MarkdownListItem>{children}</MarkdownListItem>,
  img: (props) => <MarkdownImage {...(props as ImageProps)} />,
  Image: MarkdownImage,
  Video: MarkdownVideo,
};
