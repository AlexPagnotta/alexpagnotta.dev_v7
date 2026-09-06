import type { MDXComponents } from "mdx/types";
import { Image, type ImageProps } from "@/app/features/ui/image";
import { Link } from "@/app/features/ui/link";
import { Video } from "@/app/features/ui/video";

export const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href ?? "#"}>{children}</Link>,
  img: (props) => <Image {...(props as ImageProps)} />,
  Image,
  Video,
};
