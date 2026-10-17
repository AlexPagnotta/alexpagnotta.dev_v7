import { CONTENT_TYPES, type ContentType } from "@/app/features/content/config";
import { CONTENT_TAG_LABELS, type ContentTag } from "@/app/features/content/tags";
import { Tag, type TagProps } from "@/app/features/ui/tag";

type Props = {
  type: ContentType;
  tags: readonly ContentTag[];
  size?: TagProps["size"];
};

/** The entry's content type, squared off against the pill tags that follow it, as every card and hero leads. */
export const EntryTags = ({ type, tags, size }: Props) => (
  <>
    <Tag shape="rounded" size={size}>
      {CONTENT_TYPES[type].label}
    </Tag>
    {tags.map((tag) => (
      <Tag key={tag} size={size}>
        {CONTENT_TAG_LABELS[tag]}
      </Tag>
    ))}
  </>
);
