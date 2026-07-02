export type EventCategory =
  | 'DJ Night'
  | 'Theme Night'
  | 'Discount'
  | 'Live Muziek'
  | 'Quiz'
  | 'Promotie'
  | 'Sport'
  | 'Overig';

export type EventStatus = 'upcoming' | 'live' | 'past';

export interface EventGalleryImage {
  url: string;
  alt: string;
}

export interface Event {
  id: number;
  slug: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  shortDescription: string;
  fullDescription: string;
  category: EventCategory;
  featured: boolean;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  gallery?: EventGalleryImage[] | null;
  videoUrl?: string | null;
  externalEventUrl?: string | null;
  recap?: string | null;
  recapPublished?: boolean | null;
}

export interface EventsData {
  events: Event[];
}
