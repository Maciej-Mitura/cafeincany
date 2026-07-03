export const publishedGalleryImagesQuery = `*[
  _type == "galleryImage" &&
  published == true
] | order(date desc) {
  _id,
  title,
  subtitle,
  date,
  image,
  alt
}`;

export const publishedEventsQuery = `*[
  _type == "event" &&
  published == true
] | order(startDateTime desc) {
  _id,
  "slug": slug.current,
  title,
  startDateTime,
  endDateTime,
  shortDescription,
  fullDescription,
  category,
  featured,
  coverImage,
  coverImageAlt,
  gallery[] {
    ...,
    alt
  },
  videoUrl,
  externalEventUrl,
  recap,
  recapPublished
}`;
