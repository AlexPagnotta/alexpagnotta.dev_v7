type Props = PageProps<"/blog/[slug]">;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  return <div>{slug}</div>;
}
