import { createClient, type SanityClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export function isSanityConfigured(): boolean {
  return Boolean(projectId?.trim() && dataset?.trim());
}

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }

  return createClient({
    projectId: projectId!.trim(),
    dataset: dataset!.trim(),
    apiVersion: '2026-02-01',
    useCdn: true,
  });
}
