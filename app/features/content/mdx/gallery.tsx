type GalleryImage = { src: string; alt: string };

export type GalleryProps = {
  images: GalleryImage[];
};

export const Gallery = ({ images }: GalleryProps) => (
  <ul className="columns-1 gap-16 sm:columns-2 lg:columns-3">
    {images.map((image) => (
      <li key={image.src} className="mb-16 break-inside-avoid">
        <img src={image.src} alt={image.alt} loading="lazy" className="w-full rounded-md" />
      </li>
    ))}
  </ul>
);
