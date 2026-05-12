import { describe, it, expect } from 'vitest';
import { parseVideoUrl } from '../src/intake/url-parser.js';

describe('parseVideoUrl', () => {
  // ── YouTube standard ────────────────────────────────────────
  it('parses youtube.com/watch?v= as valid YouTube', () => {
    const result = parseVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(result.isValid).toBe(true);
    expect(result.platform).toBe('youtube');
    expect(result.videoId).toBe('dQw4w9WgXcQ');
    expect(result.normalizedUrl).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });

  it('parses youtube.com without www prefix', () => {
    const result = parseVideoUrl('https://youtube.com/watch?v=ABC123');
    expect(result.isValid).toBe(true);
    expect(result.platform).toBe('youtube');
    expect(result.videoId).toBe('ABC123');
  });

  it('returns invalid for youtube.com URL missing ?v= param', () => {
    const result = parseVideoUrl('https://www.youtube.com/channel/UCtest');
    expect(result.isValid).toBe(false);
    expect(result.platform).toBe('youtube');
    expect(result.error).toMatch(/missing the video ID/i);
  });

  // ── YouTube short link ────────────────────────────────────
  it('parses youtu.be/VIDEO_ID as valid YouTube', () => {
    const result = parseVideoUrl('https://youtu.be/dQw4w9WgXcQ');
    expect(result.isValid).toBe(true);
    expect(result.platform).toBe('youtube');
    expect(result.videoId).toBe('dQw4w9WgXcQ');
    expect(result.normalizedUrl).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });

  it('parses youtu.be without https:// prefix', () => {
    const result = parseVideoUrl('youtu.be/dQw4w9WgXcQ');
    expect(result.isValid).toBe(true);
    expect(result.platform).toBe('youtube');
    expect(result.videoId).toBe('dQw4w9WgXcQ');
  });

  // ── Vimeo ─────────────────────────────────────────────────
  it('parses vimeo.com/NUMERIC_ID as valid Vimeo', () => {
    const result = parseVideoUrl('https://vimeo.com/123456789');
    expect(result.isValid).toBe(true);
    expect(result.platform).toBe('vimeo');
    expect(result.videoId).toBe('123456789');
    expect(result.normalizedUrl).toBe('https://vimeo.com/123456789');
  });

  it('returns invalid for vimeo.com with non-numeric path', () => {
    const result = parseVideoUrl('https://vimeo.com/channels/staffpicks');
    expect(result.isValid).toBe(false);
    expect(result.platform).toBe('vimeo');
    expect(result.error).toMatch(/numeric video ID/i);
  });

  // ── Unsupported / invalid ─────────────────────────────────
  it('returns invalid for random URL', () => {
    const result = parseVideoUrl('https://example.com/video/123');
    expect(result.isValid).toBe(false);
    expect(result.platform).toBe('unknown');
    expect(result.error).toMatch(/unsupported platform/i);
  });

  it('returns invalid for empty string', () => {
    const result = parseVideoUrl('');
    expect(result.isValid).toBe(false);
    expect(result.error).toMatch(/cannot be empty/i);
  });

  it('returns invalid for completely non-URL string', () => {
    const result = parseVideoUrl('not a url at all ###');
    expect(result.isValid).toBe(false);
    expect(result.platform).toBe('unknown');
  });
});
