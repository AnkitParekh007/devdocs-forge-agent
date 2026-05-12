export interface ParsedVideoUrl {
  isValid: boolean;
  platform: 'youtube' | 'vimeo' | 'unknown';
  videoId?: string;
  normalizedUrl?: string;
  error?: string;
}

/**
 * Parses and validates a video URL.
 * Supports: youtube.com/watch?v=, youtu.be/, vimeo.com/
 * Pure function — no API calls or file I/O.
 */
export function parseVideoUrl(input: string): ParsedVideoUrl {
  if (!input || input.trim() === '') {
    return { isValid: false, platform: 'unknown', error: 'URL cannot be empty' };
  }

  const url = input.trim();

  // Try to parse as URL
  let parsed: URL;
  try {
    parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
  } catch {
    return { isValid: false, platform: 'unknown', error: `Not a valid URL: ${url}` };
  }

  const host = parsed.hostname.replace(/^www\./, '');

  // YouTube: youtube.com/watch?v=VIDEO_ID
  if (host === 'youtube.com') {
    const videoId = parsed.searchParams.get('v');
    if (!videoId) {
      return {
        isValid: false,
        platform: 'youtube',
        error: 'YouTube URL is missing the video ID (?v=...)',
      };
    }
    return {
      isValid: true,
      platform: 'youtube',
      videoId,
      normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }

  // YouTube short: youtu.be/VIDEO_ID
  if (host === 'youtu.be') {
    const videoId = parsed.pathname.replace(/^\//, '').split('/')[0];
    if (!videoId) {
      return {
        isValid: false,
        platform: 'youtube',
        error: 'Could not extract video ID from youtu.be URL',
      };
    }
    return {
      isValid: true,
      platform: 'youtube',
      videoId,
      normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }

  // Vimeo: vimeo.com/VIDEO_ID
  if (host === 'vimeo.com') {
    const segments = parsed.pathname.replace(/^\//, '').split('/');
    const videoId = segments[0];
    if (!videoId || !/^\d+$/.test(videoId)) {
      return {
        isValid: false,
        platform: 'vimeo',
        error: 'Could not extract numeric video ID from Vimeo URL',
      };
    }
    return {
      isValid: true,
      platform: 'vimeo',
      videoId,
      normalizedUrl: `https://vimeo.com/${videoId}`,
    };
  }

  return {
    isValid: false,
    platform: 'unknown',
    error: `Unsupported platform: ${host}. Supported: youtube.com, youtu.be, vimeo.com`,
  };
}
