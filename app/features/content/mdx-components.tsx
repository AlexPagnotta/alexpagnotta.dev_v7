import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import { Image } from "@/app/features/content/mdx/image";
import { Video } from "@/app/features/content/mdx/video";
import { Link } from "@/app/features/ui/link";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => <h2 className="title-2">{children}</h2>,
  p: ({ children }) => <p className="body-1">{children}</p>,
  a: ({ href, children }) => (
    <Link href={href ?? "#"} variant="default">
      {children}
    </Link>
  ),
  ul: ({ children }) => <ul className="body-1 flex list-disc flex-col gap-8 pl-24">{children}</ul>,
  ol: ({ children }) => <ol className="body-1 flex list-decimal flex-col gap-8 pl-24">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  img: (props) => <Image {...(props as ImageProps)} />,
  Image,
  Video,
};
