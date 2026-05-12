import { runGeneration } from '../../pipeline/generation-pipeline.js';
import { runIntakeValidation } from '../../intake/intake-validator.js';
import { loadConfig } from '../../config/config.loader.js';
import { logger } from '../../utils/logger.js';
import { DocuForgeError } from '../../utils/errors.js';

interface GenerateCommandOptions {
  file?: string;
  url?: string;
  type?: string;
  sourceUrl?: string;
  force?: boolean;
}

export async function generateCommand(opts: GenerateCommandOptions): Promise<void> {
  logger.section('devdocs-forge-agent generate');

  // Must have at least --file
  if (!opts.file) {
    if (opts.url) {
      throw new DocuForgeError(
        '--url requires --file for the transcript.',
        'MISSING_TRANSCRIPT',
        [
          'devdocs-forge-agent does not scrape YouTube transcripts.',
          'Please provide your transcript file:',
          `  npm run generate -- --url "${opts.url}" --file input/your-transcript.md --type docusaurus`,
        ].join('\n  '),
      );
    }
    throw new DocuForgeError(
      '--file is required.',
      'MISSING_FILE',
      'Provide a transcript file: npm run generate -- --file input/my-transcript.md',
    );
  }

  // Run Video Intake Guard if --url was provided
  if (opts.url) {
    const config = loadConfig();
    logger.info('Running Video Intake Guard...');

    const intake = await runIntakeValidation({
      url: opts.url,
      transcriptFile: opts.file,
      force: opts.force ?? false,
      config,
    });

    // Print intake warnings
    for (const w of intake.warnings) {
      logger.warn(w);
    }

    if (!intake.canGenerate) {
      for (const e of intake.errors) {
        logger.fail(e);
      }
      throw new DocuForgeError(
        'Video Intake Guard blocked generation. See errors above.',
        'INTAKE_BLOCKED',
        'Use --force to bypass low-confidence classification (only if you own the content).',
      );
    }

    logger.ok('Video Intake Guard passed');
  }

  // Use --url as sourceUrl if --source-url was not explicitly set
  const sourceUrl = opts.sourceUrl ?? opts.url;

  const result = await runGeneration({
    file: opts.file,
    type: opts.type,
    sourceUrl,
    force: opts.force,
  });

  logger.line();
  logger.success(`Documentation generated successfully!`);
  logger.line();
  logger.info(`Output directory: ${result.outputDir}`);
  logger.info(`Provider: ${result.provider}  Model: ${result.model}`);
  logger.line();
  logger.dim('Files created:');
  for (const f of result.files) {
    logger.dim(`  ${f}`);
  }
  logger.line();
  logger.dim('Next step: open review-checklist.md and verify the output before publishing.');
}
