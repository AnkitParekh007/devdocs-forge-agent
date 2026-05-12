import { parseVideoUrl } from './url-parser.js';
import { fetchYouTubeMetadata } from './youtube-metadata.provider.js';
import { classifyTechVideo } from './tech-video-classifier.js';
import { validateTranscript } from './transcript-validator.js';
import type { IntakeValidationResult, VideoMetadata } from './video-metadata.types.js';
import type { DocuForgeConfig } from '../config/config.schema.js';

export interface IntakeOptions {
  url?: string;
  transcriptFile?: string;
  force?: boolean;
  config: DocuForgeConfig;
}

/**
 * Orchestrates the full Video Intake Guard validation.
 * Returns a result indicating whether generation can proceed.
 */
export async function runIntakeValidation(options: IntakeOptions): Promise<IntakeValidationResult> {
  const { url, transcriptFile, force = false, config } = options;
  const intakeCfg = config.video_intake;

  const result: IntakeValidationResult = {
    canGenerate: false,
    urlValid: false,
    transcriptValid: false,
    techVideoValid: false,
    errors: [],
    warnings: [],
  };

  // If intake guard is disabled, allow everything
  if (!intakeCfg.enabled) {
    result.canGenerate = true;
    result.urlValid = true;
    result.transcriptValid = true;
    result.techVideoValid = true;
    result.warnings.push('Video intake guard is disabled in config');
    return result;
  }

  // Step 1: URL validation
  if (url) {
    const parsed = parseVideoUrl(url);
    if (!parsed.isValid) {
      result.errors.push(parsed.error ?? 'Invalid video URL');
      result.urlValid = false;
      return result; // fatal — can't continue without valid URL
    }
    result.urlValid = true;

    // Step 2: Fetch metadata (YouTube only; Vimeo metadata is a future extension)
    let metadata: VideoMetadata | undefined;
    if (parsed.platform === 'youtube' && parsed.videoId) {
      metadata = await fetchYouTubeMetadata(parsed.videoId);
    }

    // Build minimal metadata from URL if API returned nothing
    if (!metadata) {
      metadata = { platform: parsed.platform, videoId: parsed.videoId, url: parsed.normalizedUrl ?? url };
      if (!process.env.YOUTUBE_API_KEY) {
        result.warnings.push(
          'YOUTUBE_API_KEY not set — classification uses URL and filename only (accuracy reduced)',
        );
      }
    }

    result.metadata = metadata;

    // Step 3: Tech video classification
    const classification = classifyTechVideo(metadata, intakeCfg);
    result.classification = classification;

    if (classification.confidence === 'high') {
      result.techVideoValid = true;
    } else if (classification.confidence === 'medium') {
      result.techVideoValid = true;
      result.warnings.push(
        `Video classification confidence is medium (score: ${classification.score}/100). ` +
          'Review the generated output carefully.',
      );
    } else {
      // Low confidence
      if (force && intakeCfg.allow_force_for_low_confidence) {
        result.techVideoValid = true;
        result.warnings.push(
          `--force used: bypassing low-confidence classification (score: ${classification.score}/100). ` +
            'This warning will appear in metadata.json and review-checklist.md.',
        );
      } else {
        result.techVideoValid = false;
        result.errors.push(
          `This video does not appear to be a technical tutorial (score: ${classification.score}/100, confidence: low).`,
        );
        if (classification.negativeSignals.length > 0) {
          result.errors.push(`Reasons: ${classification.negativeSignals.join(', ')}`);
        }
        if (intakeCfg.allow_force_for_low_confidence) {
          result.warnings.push('Use --force to bypass this check if you own the content.');
        }
      }
    }

    // Step 4: Require transcript if URL is provided
    if (!transcriptFile) {
      if (intakeCfg.require_transcript) {
        result.errors.push(
          'A video URL was provided but no transcript file was supplied.',
        );
        result.errors.push(
          'devdocs-forge-agent does not scrape transcripts. Provide --file input/your-transcript.md',
        );
        result.transcriptValid = false;
      } else {
        result.transcriptValid = true;
      }
    }
  } else {
    // No URL — URL check is not applicable
    result.urlValid = true;
    result.techVideoValid = true;
  }

  // Step 5: Validate transcript file (always, if provided)
  if (transcriptFile) {
    const transcriptResult = validateTranscript(transcriptFile, intakeCfg);
    result.transcript = transcriptResult;

    if (!transcriptResult.isLongEnough) {
      result.errors.push(...transcriptResult.errors);
      result.transcriptValid = false;
    } else {
      result.transcriptValid = true;
      result.warnings.push(...transcriptResult.warnings);
    }
  }

  // Final decision
  result.canGenerate =
    result.urlValid && result.transcriptValid && result.techVideoValid && result.errors.length === 0;

  return result;
}
