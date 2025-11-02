// Development environment configuration
export const IS_DEV = import.meta.env.DEV;
export const DISABLE_EXTERNAL_ASSETS = false;
export const USE_PLACEHOLDERS = false;

// Local development always uses the content/ directory and /media assets
export const LOCAL_MODE = true;
export const ASSET_BASE_PATH = IS_DEV ? '' : '/public';

// Debug logging for development
if (IS_DEV) {
  console.log('[ENV] Configuration:', {
    LOCAL_MODE,
    ASSET_BASE_PATH,
    IS_DEV
  });
}
