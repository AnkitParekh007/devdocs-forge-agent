import { runIntakeValidation } from '../../intake/intake-validator.js';
import { loadConfig } from '../../config/config.loader.js';
import { logger } from '../../utils/logger.js';
import { DocuForgeError } from '../../utils/errors.js';

interface ValidateSourceCommandOptions {
  url: string;
  file: string;
}

export async function validateSourceCommand(opts: ValidateSourceCommandOptions): Promise<void> {
  logger.section('devdocs-forge-agent validate-source');

  const config = loadConfig();

  const result = await runIntakeValidation({
    url: opts.url,
    transcriptFile: opts.file,
    force: false,
    config,
  });

  // URL check
  if (result.urlValid) {
    const platform = result.metadata?.platform ?? 'unknown';
    logger.ok(`URL is valid (${platform})`, result.metadata?.title ?? opts.url);
  } else {
    logger.fail('URL is invalid');
  }

  // Tech classification
  if (result.classification) {
    const { score, confidence } = result.classification;
    if (confidence === 'high') {
      logger.ok(`Tech classification: ${score}/100`, 'high confidence — looks like a tutorial');
    } else if (confidence === 'medium') {
      logger.warn(
        `Tech classification: ${score}/100`,
        'medium confidence — review output carefully',
      );
    } else {
      logger.fail(`Tech classification: ${score}/100`, 'low confidence — may not be technical');
    }
  }

  // Transcript check
  if (result.transcript) {
    const t = result.transcript;
    if (t.isLongEnough) {
      logger.ok(`Transcript: ${opts.file}`, `${t.wordCount} words`);
    } else {
      logger.fail(`Transcript: ${opts.file}`, `${t.wordCount} words (too short)`);
    }
    for (const w of t.warnings) {
      logger.warn(w);
    }
  } else if (!result.transcriptValid) {
    logger.fail('Transcript: not provided or not found');
  }

  // Warnings
  for (const w of result.warnings) {
    logger.warn(w);
  }

  logger.line();

  if (result.errors.length > 0) {
    for (const e of result.errors) {
      logger.error(e);
    }
    logger.line();

    if (!result.transcriptValid && !opts.file) {
      logger.dim('devdocs-forge-agent does not scrape YouTube transcripts.');
      logger.dim(`Provide your transcript file with --file:`);
      logger.dim(`  npm run devdocs-forge-agent -- validate-source --url "${opts.url}" --file input/your-transcript.md`);
    }

    throw new DocuForgeError(
      'Source validation failed. Fix the issues above before generating.',
      'INTAKE_VALIDATION_FAILED',
    );
  }

  logger.success('Source is valid. Ready to generate.');
  logger.dim(`Run:`);
  logger.dim(
    `  npm run generate -- --url "${opts.url}" --file "${opts.file}" --type docusaurus`,
  );
}
