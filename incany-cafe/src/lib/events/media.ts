import type { Event, EventGalleryImage } from '@/types/event';

function isNonEmptyString(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidHttpUrl(url: string | null | undefined): boolean {
  if (!isNonEmptyString(url)) {
    return false;
  }

  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Accepts local public paths or absolute http(s) image URLs. */
export function isValidImageSource(src: string | null | undefined): boolean {
  if (!isNonEmptyString(src)) {
    return false;
  }

  const trimmed = src.trim();

  if (trimmed.startsWith('/')) {
    return true;
  }

  return isValidHttpUrl(trimmed);
}

export function getValidGalleryImages(
  gallery: EventGalleryImage[] | null | undefined,
): EventGalleryImage[] {
  if (!gallery?.length) {
    return [];
  }

  return gallery.filter(
    (image) => isValidImageSource(image.url) && isNonEmptyString(image.alt),
  );
}

export function hasEventMedia(event: Event): boolean {
  return (
    isValidImageSource(event.coverImage) ||
    getValidGalleryImages(event.gallery).length > 0
  );
}
