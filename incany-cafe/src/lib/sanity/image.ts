import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { getSanityClient } from './client';

type ImageUrlOptions = {
  width?: number;
  quality?: number;
};

export function urlForImage(
  source: SanityImageSource | null | undefined,
  options?: ImageUrlOptions,
): string | null {
  if (!source) {
    return null;
  }

  const client = getSanityClient();
  if (!client) {
    return null;
  }

  const width = options?.width ?? 1600;
  const quality = options?.quality ?? 85;

  return createImageUrlBuilder(client).image(source).auto('format').width(width).quality(quality).url();
}
