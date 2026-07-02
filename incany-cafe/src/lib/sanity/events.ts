import eventsData from '@/data/events.json';
import type { Event, EventCategory, EventGalleryImage, EventsData } from '@/types/event';

import { getSanityClient, isSanityConfigured } from './client';
import { urlForImage } from './image';
import { publishedEventsQuery } from './queries';

type PortableTextChild = {
  _type?: string;
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextChild[];
};

type SanityGalleryImage = {
  alt?: string | null;
} & Record<string, unknown>;

type SanityEventDocument = {
  _id: string;
  slug?: string | null;
  title?: string | null;
  startDateTime?: string | null;
  endDateTime?: string | null;
  shortDescription?: string | null;
  fullDescription?: PortableTextBlock[] | null;
  category?: string | null;
  featured?: boolean | null;
  coverImage?: Record<string, unknown> | null;
  coverImageAlt?: string | null;
  gallery?: SanityGalleryImage[] | null;
  videoUrl?: string | null;
  externalEventUrl?: string | null;
  recap?: PortableTextBlock[] | null;
  recapPublished?: boolean | null;
};

const SANITY_CATEGORIES: EventCategory[] = [
  'DJ Night',
  'Theme Night',
  'Discount',
  'Live Muziek',
  'Quiz',
  'Promotie',
  'Sport',
  'Overig',
];

function getLocalFallbackEvents(): Event[] {
  return (eventsData as EventsData).events;
}

function stableIdFromSanityId(sanityId: string): number {
  let hash = 0;

  for (let index = 0; index < sanityId.length; index += 1) {
    hash = (hash << 5) - hash + sanityId.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function portableTextToPlainText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks?.length) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children?.length) {
        return '';
      }

      return block.children.map((child) => child.text ?? '').join('');
    })
    .filter(Boolean)
    .join('\n\n');
}

function mapCategory(category: string | null | undefined): EventCategory {
  if (category && SANITY_CATEGORIES.includes(category as EventCategory)) {
    return category as EventCategory;
  }

  return 'Overig';
}

function mapGalleryImages(gallery: SanityGalleryImage[] | null | undefined): EventGalleryImage[] | null {
  if (!gallery?.length) {
    return null;
  }

  const images = gallery
    .map((image) => {
      const url = urlForImage(image);
      const alt = image.alt?.trim();

      if (!url || !alt) {
        return null;
      }

      return { url, alt };
    })
    .filter((image): image is EventGalleryImage => image !== null);

  return images.length > 0 ? images : null;
}

function mapSanityEventToEvent(document: SanityEventDocument): Event | null {
  const title = document.title?.trim();
  const slug = document.slug?.trim();
  const startDateTime = document.startDateTime;
  const endDateTime = document.endDateTime;
  const shortDescription = document.shortDescription?.trim();

  if (!title || !slug || !startDateTime || !endDateTime || !shortDescription) {
    return null;
  }

  const coverImage = urlForImage(document.coverImage);

  return {
    id: stableIdFromSanityId(document._id),
    slug,
    title,
    startDateTime,
    endDateTime,
    shortDescription,
    fullDescription: portableTextToPlainText(document.fullDescription),
    category: mapCategory(document.category),
    featured: document.featured === true,
    coverImage,
    coverImageAlt: document.coverImageAlt?.trim() || null,
    gallery: mapGalleryImages(document.gallery),
    videoUrl: document.videoUrl?.trim() || null,
    externalEventUrl: document.externalEventUrl?.trim() || null,
    recap: portableTextToPlainText(document.recap) || null,
    recapPublished: document.recapPublished === true,
  };
}

export async function getEvents(): Promise<Event[]> {
  if (!isSanityConfigured()) {
    console.warn(
      '[events] NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing. Using src/data/events.json fallback.',
    );
    return getLocalFallbackEvents();
  }

  const client = getSanityClient();
  if (!client) {
    return getLocalFallbackEvents();
  }

  try {
    const documents = await client.fetch<SanityEventDocument[]>(publishedEventsQuery);

    const events = documents
      .map(mapSanityEventToEvent)
      .filter((event): event is Event => event !== null);

    if (events.length === 0) {
      console.warn('[events] Sanity returned no published events. Using src/data/events.json fallback.');
      return getLocalFallbackEvents();
    }

    return events;
  } catch (error) {
    console.error('[events] Failed to fetch events from Sanity. Using src/data/events.json fallback.', error);
    return getLocalFallbackEvents();
  }
}
