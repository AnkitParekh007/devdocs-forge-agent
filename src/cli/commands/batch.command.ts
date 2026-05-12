import path from 'node:path';
import { listFiles, fileExists } from '../../utils/fs-utils.js';
import { runGeneration } from '../../pipeline/generation-pipeline.js';
import { logger } from '../../utils/logger.js';
import { DocuForgeError } from '../../utils/errors.js';

interface BatchCommandOptions {
  dir: string;
  type?: string;
}

export async function batchCommand(opts: BatchCommandOptions): Promise<void> {
  logger.section('devdocs-forge-agent batch');

  const dirPath = path.resolve(opts.dir);

  if (!fileExists(dirPath)) {
    throw new DocuForgeError(
      `Directory not found: ${dirPath}`,
      'DIR_NOT_FOUND',
      `Create the directory or check the --dir path.`,
    );
  }

  const files = listFiles(dirPath, ['.md', '.txt']);

  if (files.length === 0) {
    logger.warn(`No .md or .txt files found in: ${dirPath}`);
    return;
  }

  logger.info(`Processing ${files.length} file(s) from ${opts.dir}`);
  logger.line();

  let succeeded = 0;
  let failed = 0;
  let skipped = 0;

  for (const file of files) {
    const filename = path.basename(file);

    try {
      const result = await runGeneration({ file, type: opts.type });
      logger.ok(filename, `→ ${path.relative(process.cwd(), result.outputDir)}`);
      succeeded++;
    } catch (err) {
      if (err instanceof DocuForgeError && err.code === 'FILE_NOT_FOUND') {
        logger.warn(filename, 'skipped — empty or unreadable');
        skipped++;
      } else {
        const message = err instanceof Error ? err.message : String(err);
        logger.fail(filename, message);
        failed++;
      }
    }
  }

  logger.line();
  logger.dim('─'.repeat(50));
  logger.dim(`Batch complete: ${succeeded} succeeded, ${failed} failed, ${skipped} skipped`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}
