export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string | null;
  alt: string;
}

export interface GalleryData {
  items: GalleryItem[];
}
