import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { validateTranscript } from '../src/intake/transcript-validator.js';

// ── Helpers ──────────────────────────────────────────────────
let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'devdocs-test-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

function write(filename: string, content: string): string {
  const p = path.join(tmpDir, filename);
  fs.writeFileSync(p, content, 'utf8');
  return p;
}

function words(n: number): string {
  return Array.from({ length: n }, (_, i) => `word${i}`).join(' ');
}

// ── Tests ─────────────────────────────────────────────────────
describe('validateTranscript', () => {
  it('returns hasTranscript: false for a missing file', () => {
    const result = validateTranscript('/nonexistent/path/transcript.md');
    expect(result.hasTranscript).toBe(false);
    expect(result.isLongEnough).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toMatch(/not found/i);
  });

  it('returns error for unsupported file extension', () => {
    const p = write('transcript.pdf', 'some content here');
    const result = validateTranscript(p);
    expect(result.hasTranscript).toBe(false);
    expect(result.errors[0]).toMatch(/unsupported transcript format/i);
  });

  it('returns error for empty file path', () => {
    const result = validateTranscript('');
    expect(result.hasTranscript).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  // ── Word count thresholds ─────────────────────────────────
  it('returns isLongEnough: false and an error for < 150 words', () => {
    const p = write('short.md', words(100));
    const result = validateTranscript(p);
    expect(result.hasTranscript).toBe(true);
    expect(result.wordCount).toBe(100);
    expect(result.isLongEnough).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toMatch(/too short/i);
  });

  it('returns isLongEnough: true with a warning for 150–499 words', () => {
    const p = write('medium.md', words(300));
    const result = validateTranscript(p);
    expect(result.hasTranscript).toBe(true);
    expect(result.wordCount).toBe(300);
    expect(result.isLongEnough).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toMatch(/short/i);
  });

  it('returns isLongEnough: true with no warning for >= 500 words', () => {
    const p = write('full.md', words(600));
    const result = validateTranscript(p);
    expect(result.hasTranscript).toBe(true);
    expect(result.wordCount).toBe(600);
    expect(result.isLongEnough).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  // ── .txt files ────────────────────────────────────────────
  it('accepts .txt files', () => {
    const p = write('transcript.txt', words(500));
    const result = validateTranscript(p);
    expect(result.hasTranscript).toBe(true);
    expect(result.isLongEnough).toBe(true);
  });

  // ── VTT timestamp stripping ───────────────────────────────
  it('strips VTT timestamps and counts only spoken words', () => {
    const vttContent = `WEBVTT

00:00:01.000 --> 00:00:04.000
Hello world this is a test transcript

00:00:05.000 --> 00:00:08.000
with multiple cue blocks of spoken content

NOTE This is a comment

00:00:09.000 --> 00:00:12.000
and more words here to reach the count threshold for validation
`;
    const p = write('transcript.vtt', vttContent);
    const result = validateTranscript(p);
    expect(result.hasTranscript).toBe(true);
    // Timestamps/headers should not be counted as words
    // Spoken: "Hello world this is a test transcript with multiple cue blocks of spoken content and more words here to reach the count threshold for validation" = ~28 words
    expect(result.wordCount).toBeLessThan(50); // no timestamp pollution
    expect(result.wordCount).toBeGreaterThan(10);
  });

  // ── SRT timestamp stripping ───────────────────────────────
  it('strips SRT timestamps and counts only spoken words', () => {
    const srtContent = `1
00:00:01,000 --> 00:00:04,000
Hello world this is a test

2
00:00:05,000 --> 00:00:08,000
with srt formatted captions here
`;
    const p = write('transcript.srt', srtContent);
    const result = validateTranscript(p);
    expect(result.hasTranscript).toBe(true);
    // Spoken: ~13 words, not 100s from timestamp lines
    expect(result.wordCount).toBeLessThan(20);
    expect(result.wordCount).toBeGreaterThan(5);
  });

  // ── Custom config ─────────────────────────────────────────
  it('respects custom min_transcript_words from config', () => {
    const p = write('transcript.md', words(200));
    // With default (150), 200 words is fine
    const defaultResult = validateTranscript(p);
    expect(defaultResult.isLongEnough).toBe(true);

    // With custom minimum of 300, 200 words should fail
    const strictResult = validateTranscript(p, { min_transcript_words: 300 });
    expect(strictResult.isLongEnough).toBe(false);
    expect(strictResult.errors.length).toBeGreaterThan(0);
  });
});
