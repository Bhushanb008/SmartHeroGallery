const CDN_BASE = "https://cdn.iamalive.app";
const PROCESSED_MOBILE_PREFIX = "/processed/mobile/";
const PREVIEW_PREFIX = "/processed/preview/";

export const buildImageSources = (src: string) => {
  return {
    preview: `${CDN_BASE}${PREVIEW_PREFIX}${src}`,
    processed: `${CDN_BASE}${PROCESSED_MOBILE_PREFIX}${src}`,
    original: `${CDN_BASE}/${src}`,
  };
};

export const buildVideoSources = (src: string) => {
  const thumb = `${src}.webp`;

  return {
    videoProcessed: `${CDN_BASE}${PROCESSED_MOBILE_PREFIX}${src}`,
    videoOriginal: `${CDN_BASE}/${src}`,

    thumbPreview: `${CDN_BASE}${PREVIEW_PREFIX}${thumb}`,
    thumbProcessed: `${CDN_BASE}${PROCESSED_MOBILE_PREFIX}${thumb}`,
    thumbOriginal: `${CDN_BASE}/${thumb}`,
  };
};
