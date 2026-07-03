import { formatGalleryDate } from '@/lib/gallery/format';
import type { GalleryItem } from '@/types/gallery';

const TILE_HEIGHTS = ['gallery-tile--short', 'gallery-tile--medium', 'gallery-tile--tall'] as const;

interface GalleryTileProps {
  item: GalleryItem;
  index: number;
  isActive: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}

export default function GalleryTile({
  item,
  index,
  isActive,
  onActivate,
  onDeactivate,
}: GalleryTileProps) {
  const heightClass = TILE_HEIGHTS[index % TILE_HEIGHTS.length];
  const hasImage = Boolean(item.imageUrl?.trim());
  const formattedDate = formatGalleryDate(item.date);

  return (
    <article
      className={`gallery-tile ${heightClass} group`}
      onMouseEnter={() => onActivate(item.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(item.id)}
      onBlur={onDeactivate}
      tabIndex={0}
      aria-label={`${item.title}, ${item.subtitle}, ${formattedDate}`}
    >
      <div
        className="gallery-tile__frame"
        style={{
          boxShadow: isActive ? 'var(--shadow-lg)' : 'var(--shadow)',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {hasImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.imageUrl!}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="gallery-tile__image"
          />
        ) : (
          <div className="gallery-tile__placeholder" aria-hidden="true">
            <div className="gallery-tile__placeholder-gradient" />
            <div className="gallery-tile__placeholder-pattern" />
          </div>
        )}

        <div
          className={`gallery-tile__overlay${isActive ? ' gallery-tile__overlay--visible' : ''}`}
          aria-hidden={!isActive}
        >
          <div className="gallery-tile__overlay-content">
            <h3
              className="gallery-tile__title"
              style={{
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                opacity: isActive ? 1 : 0,
              }}
            >
              {item.title}
            </h3>
            <p
              className="gallery-tile__subtitle"
              style={{
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                opacity: isActive ? 1 : 0,
              }}
            >
              {item.subtitle}
            </p>
            <time
              className="gallery-tile__date"
              dateTime={item.date}
              style={{
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                opacity: isActive ? 1 : 0,
              }}
            >
              {formattedDate}
            </time>
          </div>
          <div
            className="gallery-tile__accent-line"
            style={{ width: isActive ? '100%' : '0%' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
