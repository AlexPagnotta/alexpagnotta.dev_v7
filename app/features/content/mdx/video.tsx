import { Video, type VideoProps } from "@/app/features/ui/video";

export const MarkdownVideo = (props: VideoProps) => (
  <figure className="overflow-hidden rounded-lg">
    <Video {...props} />
  </figure>
);
