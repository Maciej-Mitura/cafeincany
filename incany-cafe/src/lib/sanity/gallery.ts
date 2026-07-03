import galleryData from '@/data/gallery.json';
import type { GalleryData, GalleryItem } from '@/types/gallery';

import { getSanityClient, isSanityConfigured } from './client';
import { urlForImage } from './image';
import { publishedGalleryImagesQuery } from './queries';

type SanityGalleryImageDocument = {
  _id: string;
  title?: string | null;
  subtitle?: string | null;
  date?: string | null;
  image?: Record<string, unknown> | null;
  alt?: string | null;
};

function getLocalFallbackGallery(): GalleryItem[] {
  return (galleryData as GalleryData).items;
}

function mapSanityGalleryImage(document: SanityGalleryImageDocument): GalleryItem | null {
  const title = document.title?.trim();
  const subtitle = document.subtitle?.trim();
  const date = document.date?.trim();
  const alt = document.alt?.trim();

  if (!title || !subtitle || !date || !alt) {
    return null;
  }

  const imageUrl = urlForImage(document.image, { width: 900, quality: 85 });

  if (!imageUrl) {
    return null;
  }

  return {
    id: document._id,
    title,
    subtitle,
    date,
    imageUrl,
    alt,
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isSanityConfigured()) {
    console.warn(
      '[gallery] NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing. Using src/data/gallery.json fallback.',
    );
    return getLocalFallbackGallery();
  }

  const client = getSanityClient();
  if (!client) {
    return getLocalFallbackGallery();
  }

  try {
    const documents = await client.fetch<SanityGalleryImageDocument[]>(publishedGalleryImagesQuery);

    const items = documents
      .map(mapSanityGalleryImage)
      .filter((item): item is GalleryItem => item !== null);

    if (items.length === 0) {
      console.warn(
        '[gallery] Sanity returned no published gallery images. Using src/data/gallery.json fallback.',
      );
      return getLocalFallbackGallery();
    }

    return items;
  } catch (error) {
    console.error(
      '[gallery] Failed to fetch gallery images from Sanity. Using src/data/gallery.json fallback.',
      error,
    );
    return getLocalFallbackGallery();
  }
}
