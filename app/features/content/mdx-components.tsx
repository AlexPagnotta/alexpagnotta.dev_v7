import type { MDXComponents } from "mdx/types";
import { Carousel } from "@/app/features/content/mdx/carousel";
import { Gallery } from "@/app/features/content/mdx/gallery";
import { Note } from "@/app/features/content/mdx/note";
import { BaseLink } from "@/app/features/ui/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="title-1">{children}</h1>,
  h2: ({ children }) => <h2 className="title-2">{children}</h2>,
  h3: ({ children }) => <h3 className="title-3">{children}</h3>,
  h4: ({ children }) => <h4 className="body-2 font-black">{children}</h4>,
  p: ({ children }) => <p className="body-1">{children}</p>,
  a: ({ href, children }) => (
    <BaseLink
      href={href ?? "#"}
      className="underline underline-offset-2 hover:font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      {children}
    </BaseLink>
  ),
  ul: ({ children }) => <ul className="body-1 flex list-disc flex-col gap-8 pl-24">{children}</ul>,
  ol: ({ children }) => <ol className="body-1 flex list-decimal flex-col gap-8 pl-24">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="body-1 border-l-4 border-yellow pl-16 italic">{children}</blockquote>
  ),
  hr: () => <hr className="border-t-2 border-black/10" />,
  pre: ({ children }) => (
    <pre className="caption overflow-x-auto rounded-md bg-black p-16 text-cream [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
  code: ({ children }) => <code className="caption rounded-sm bg-black/8 px-4 py-2">{children}</code>,
  img: ({ src, alt }) => (
    <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" className="w-full rounded-md" />
  ),
  Carousel,
  Gallery,
  Note,
};
