type Props = PageProps<"/projects/[slug]">;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  return <div>{slug}</div>;
}
