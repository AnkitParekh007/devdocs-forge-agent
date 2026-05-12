import { parseVideoUrl } from '../../intake/url-parser.js';
import { fetchYouTubeMetadata } from '../../intake/youtube-metadata.provider.js';
import { classifyTechVideo, formatDuration } from '../../intake/tech-video-classifier.js';
import { loadConfig } from '../../config/config.loader.js';
import { logger } from '../../utils/logger.js';
import { DocuForgeError } from '../../utils/errors.js';

interface InspectUrlCommandOptions {
  url: string;
}

export async function inspectUrlCommand(opts: InspectUrlCommandOptions): Promise<void> {
  logger.section('devdocs-forge-agent inspect-url');

  const config = loadConfig();
  const { url } = opts;

  // Step 1: Parse URL
  const parsed = parseVideoUrl(url);
  if (!parsed.isValid) {
    throw new DocuForgeError(
      `Invalid or unsupported video URL: ${parsed.error}`,
      'INVALID_URL',
      'Supported platforms: youtube.com, youtu.be, vimeo.com\nOr use a local transcript file with --file',
    );
  }

  logger.ok(`Platform: ${parsed.platform}`);
  logger.ok(`Video ID: ${parsed.videoId ?? '(not extracted)'}`);
  logger.ok(`Normalized URL: ${parsed.normalizedUrl}`);

  // Step 2: Fetch metadata
  let metadata = { platform: parsed.platform, videoId: parsed.videoId, url: parsed.normalizedUrl ?? url } as Parameters<typeof classifyTechVideo>[0];

  if (parsed.platform === 'youtube' && parsed.videoId) {
    const hasApiKey = !!(process.env.YOUTUBE_API_KEY?.trim());
    if (hasApiKey) {
      logger.info('Fetching YouTube metadata...');
      const fetched = await fetchYouTubeMetadata(parsed.videoId);
      if (fetched) {
        metadata = fetched;
        logger.line();
        logger.info(`Title:    ${fetched.title ?? '(unknown)'}`);
        logger.info(`Channel:  ${fetched.channelTitle ?? '(unknown)'}`);
        logger.info(`Category: ${fetched.categoryName ?? (fetched.categoryId ? `ID ${fetched.categoryId}` : '(unknown)')}`);
        if (fetched.durationSeconds) {
          logger.info(`Duration: ${formatDuration(fetched.durationSeconds)}`);
        }
        if (fetched.tags && fetched.tags.length > 0) {
          logger.info(`Tags:     ${fetched.tags.slice(0, 8).join(', ')}${fetched.tags.length > 8 ? '...' : ''}`);
        }
      } else {
        logger.warn('Could not fetch metadata', 'video may be private, age-restricted, or invalid');
      }
    } else {
      logger.warn(
        'YOUTUBE_API_KEY not set',
        'metadata fetch skipped — classification uses URL only',
      );
    }
  } else if (parsed.platform === 'vimeo') {
    logger.info('Vimeo metadata fetch not yet supported — classification uses URL only');
  }

  // Step 3: Classify
  logger.line();
  logger.section('Tech Classification');

  const classification = classifyTechVideo(metadata, config.video_intake);

  const confidenceColor = {
    high: '\x1b[32m',
    medium: '\x1b[33m',
    low: '\x1b[31m',
  }[classification.confidence];

  console.log(
    `  Score: ${confidenceColor}${classification.score}/100\x1b[0m  (${classification.confidence} confidence)`,
  );

  if (classification.positiveSignals.length > 0) {
    logger.line();
    logger.dim('Positive signals:');
    for (const s of classification.positiveSignals) {
      logger.dim(`  + ${s}`);
    }
  }

  if (classification.negativeSignals.length > 0) {
    logger.line();
    logger.dim('Negative signals:');
    for (const s of classification.negativeSignals) {
      logger.dim(`  - ${s}`);
    }
  }

  for (const w of classification.warnings) {
    logger.warn(w);
  }

  logger.line();

  if (classification.confidence === 'high') {
    logger.success('This looks like a technical tutorial video.');
    logger.dim(
      `Next: validate-source --url "${parsed.normalizedUrl}" --file input/your-transcript.md`,
    );
  } else if (classification.confidence === 'medium') {
    logger.warn(
      'Medium confidence — may be a technical video.',
      'Provide a transcript to proceed.',
    );
    logger.dim('Use --force to bypass classification if you own the content.');
  } else {
    logger.fail('Low confidence — this does not appear to be a technical tutorial video.');
    logger.dim('If you own this content, use --force with generate.');
    logger.dim('Reasons:');
    for (const s of classification.negativeSignals) {
      logger.dim(`  ${s}`);
    }
  }
}
