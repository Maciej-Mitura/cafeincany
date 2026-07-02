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
