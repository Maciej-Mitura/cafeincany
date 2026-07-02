import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { getSanityClient } from './client';

export function urlForImage(source: SanityImageSource | null | undefined): string | null {
  if (!source) {
    return null;
  }

  const client = getSanityClient();
  if (!client) {
    return null;
  }

  return createImageUrlBuilder(client).image(source).auto('format').width(1600).quality(85).url();
}
