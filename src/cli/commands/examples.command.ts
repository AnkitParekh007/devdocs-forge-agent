import path from 'node:path';
import fs from 'node:fs';
import { fileExists, ensureDir, copyFile } from '../../utils/fs-utils.js';
import { logger } from '../../utils/logger.js';

const CWD = process.cwd();

export async function examplesCommand(): Promise<void> {
  logger.section('devdocs-forge-agent examples');

  const examplesTranscriptsDir = path.join(CWD, 'examples', 'transcripts');
  const inputDir = path.join(CWD, 'input');

  if (!fileExists(examplesTranscriptsDir)) {
    logger.warn('examples/transcripts/', 'Directory not found. Skipping copy.');
    logger.dim('The examples/ folder should be included in the repository.');
    return;
  }

  ensureDir(inputDir);

  const files = fs
    .readdirSync(examplesTranscriptsDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.txt'));

  if (files.length === 0) {
    logger.warn('No example transcripts found in examples/transcripts/');
    return;
  }

  let copied = 0;
  let skipped = 0;

  for (const file of files) {
    const src = path.join(examplesTranscriptsDir, file);
    const dest = path.join(inputDir, file);

    if (fileExists(dest)) {
      logger.dim(`skipped  input/${file}  (already exists)`);
      skipped++;
    } else {
      copyFile(src, dest);
      logger.ok(`input/${file}`, 'copied');
      copied++;
    }
  }

  logger.line();
  logger.success(`${copied} example(s) copied to input/. ${skipped > 0 ? `${skipped} skipped.` : ''}`);
  logger.dim(`Try: npm run generate -- --file input/${files[0]} --type docusaurus`);
}
