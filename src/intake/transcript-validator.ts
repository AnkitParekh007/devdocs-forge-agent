import path from 'node:path';
import { fileExists, readFile } from '../utils/fs-utils.js';
import type { TranscriptValidationResult, VideoIntakeConfig } from './video-metadata.types.js';

const SUPPORTED_EXTENSIONS = ['.md', '.txt', '.vtt', '.srt'];

/**
 * Strips VTT/SRT timestamp lines for accurate word counting.
 * Keeps only the spoken text content. Does NOT modify the file.
 */
function stripTimestamps(content: string, ext: string): string {
  if (ext === '.vtt') {
    // VTT format: remove WEBVTT header, timestamps (00:00:00.000 --> 00:00:00.000), and metadata lines
    return content
      .replace(/^WEBVTT.*$/m, '')
      .replace(/^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}.*$/gm, '')
      .replace(/^\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}\.\d{3}.*$/gm, '')
      .replace(/^\s*\d+\s*$/gm, '') // sequence numbers
      .replace(/^NOTE.*$/gm, '')
      .trim();
  }

  if (ext === '.srt') {
    // SRT format: remove sequence numbers and timestamps
    return content
      .replace(/^\d+\s*$/gm, '') // sequence numbers
      .replace(/^\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}.*$/gm, '')
      .trim();
  }

  return content;
}

/**
 * Validates a user-provided transcript file.
 * Checks existence, extension, and word count.
 * Pure file read — does NOT modify the file.
 */
export function validateTranscript(
  filePath: string,
  config?: Partial<VideoIntakeConfig>,
): TranscriptValidationResult {
  const minWords = config?.min_transcript_words ?? 150;
  const warnWords = 500;

  if (!filePath) {
    return {
      hasTranscript: false,
      wordCount: 0,
      isLongEnough: false,
      warnings: [],
      errors: ['No transcript file path provided'],
    };
  }

  if (!fileExists(filePath)) {
    return {
      hasTranscript: false,
      wordCount: 0,
      isLongEnough: false,
      warnings: [],
      errors: [`Transcript file not found: ${filePath}`],
    };
  }

  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    return {
      hasTranscript: false,
      wordCount: 0,
      isLongEnough: false,
      warnings: [],
      errors: [
        `Unsupported transcript format: ${ext}. Supported: ${SUPPORTED_EXTENSIONS.join(', ')}`,
      ],
    };
  }

  const raw = readFile(filePath);
  const cleaned = stripTimestamps(raw, ext);
  const count = cleaned.trim().split(/\s+/).filter(Boolean).length;

  const warnings: string[] = [];
  const errors: string[] = [];

  if (count < minWords) {
    errors.push(
      `Transcript is too short (${count} words). Minimum required: ${minWords} words.`,
    );
  } else if (count < warnWords) {
    warnings.push(
      `Transcript is short (${count} words). Consider adding more context for better output. Recommended: ${warnWords}+ words.`,
    );
  }

  return {
    hasTranscript: true,
    wordCount: count,
    isLongEnough: count >= minWords,
    warnings,
    errors,
  };
}
