import {createClient} from '@sanity/client';

import {
  USE_SANITY,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION,
  SANITY_TOKEN,
} from './env.js';

let cachedClient = null;

export const isSanityEnabled =
  USE_SANITY && Boolean(SANITY_PROJECT_ID) && Boolean(SANITY_DATASET);

export function getSanityClient() {
  if (!isSanityEnabled) {
    throw new Error('Sanity client requested but USE_SANITY flag or configuration is missing');
  }

  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION || '2025-01-01',
    useCdn: !SANITY_TOKEN,
    token: SANITY_TOKEN || undefined,
    perspective: SANITY_TOKEN ? 'drafts' : 'published',
  });

  return cachedClient;
}
