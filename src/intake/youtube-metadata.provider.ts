import type { VideoMetadata } from './video-metadata.types.js';

/** ISO 8601 duration (PT4M13S) → total seconds */
function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const h = parseInt(match[1] ?? '0', 10);
  const m = parseInt(match[2] ?? '0', 10);
  const s = parseInt(match[3] ?? '0', 10);
  return h * 3600 + m * 60 + s;
}

/**
 * Fetches public video metadata from the YouTube Data API v3.
 * Uses native fetch (Node 18+) — no external packages.
 *
 * Returns undefined (gracefully) if:
 *  - YOUTUBE_API_KEY is not set
 *  - The API returns an error
 *  - The video is private or not found
 *
 * NEVER fetches captions, transcripts, or video content.
 */
export async function fetchYouTubeMetadata(videoId: string): Promise<VideoMetadata | undefined> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return undefined;
  }

  try {
    // Fetch video metadata (snippet + contentDetails)
    const videoUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    videoUrl.searchParams.set('id', videoId);
    videoUrl.searchParams.set('part', 'snippet,contentDetails');
    videoUrl.searchParams.set('key', apiKey);

    const videoRes = await fetch(videoUrl.toString());
    if (!videoRes.ok) return undefined;

    const videoData = (await videoRes.json()) as {
      items?: Array<{
        snippet: {
          title: string;
          description: string;
          channelTitle: string;
          categoryId: string;
          tags?: string[];
          publishedAt: string;
        };
        contentDetails: { duration: string };
      }>;
    };

    const item = videoData.items?.[0];
    if (!item) return undefined;

    const { snippet, contentDetails } = item;
    const durationSeconds = parseDuration(contentDetails.duration);

    // Resolve category name from categoryId
    let categoryName: string | undefined;
    if (snippet.categoryId) {
      categoryName = await fetchCategoryName(snippet.categoryId, apiKey);
    }

    return {
      platform: 'youtube',
      videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: snippet.title,
      description: snippet.description,
      channelTitle: snippet.channelTitle,
      categoryId: snippet.categoryId,
      categoryName,
      tags: snippet.tags ?? [],
      durationSeconds,
      publishedAt: snippet.publishedAt,
    };
  } catch {
    // Network errors, parse errors — degrade gracefully
    return undefined;
  }
}

async function fetchCategoryName(categoryId: string, apiKey: string): Promise<string | undefined> {
  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/videoCategories');
    url.searchParams.set('id', categoryId);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) return undefined;

    const data = (await res.json()) as {
      items?: Array<{ snippet: { title: string } }>;
    };

    return data.items?.[0]?.snippet?.title;
  } catch {
    return undefined;
  }
}
