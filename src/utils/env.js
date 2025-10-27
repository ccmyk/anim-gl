// Development environment configuration
export const IS_DEV = import.meta.env.DEV;
export const DISABLE_EXTERNAL_ASSETS = false;
export const USE_PLACEHOLDERS = false;

const rawUseSanity = (import.meta.env.VITE_USE_SANITY ?? '').toString().trim().toLowerCase();
export const USE_SANITY = rawUseSanity === '1' || rawUseSanity === 'true';

export const SANITY_PROJECT_ID = (import.meta.env.VITE_SANITY_PROJECT_ID ?? '').trim();
export const SANITY_DATASET = (import.meta.env.VITE_SANITY_DATASET ?? '').trim();
export const SANITY_API_VERSION = (import.meta.env.VITE_SANITY_API_VERSION ?? '2025-01-01').trim();
export const SANITY_TOKEN = (import.meta.env.VITE_SANITY_TOKEN ?? '').trim();

// Local development settings
export const LOCAL_MODE = false;
export const ASSET_BASE_PATH = '/public';
