import path from 'node:path';
import fs from 'node:fs';
import { fileExists, readFile } from '../../utils/fs-utils.js';
import { validateMarkdown } from '../../pipeline/markdown-validator.js';
import { logger } from '../../utils/logger.js';

const CWD = process.cwd();

interface VerifyCommandOptions {
  dir?: string;
}

export async function verifyCommand(opts: VerifyCommandOptions): Promise<void> {
  logger.section('devdocs-forge-agent verify');

  const outputBase = path.join(CWD, 'output');

  if (!fileExists(outputBase)) {
    logger.warn('output/ directory not found. Nothing to verify.');
    return;
  }

  // Find output subdirectories to verify
  const targets: string[] = [];

  if (opts.dir) {
    const specific = path.resolve(opts.dir);
    if (fileExists(specific)) {
      targets.push(specific);
    } else {
      logger.fail(`Directory not found: ${specific}`);
      process.exit(1);
    }
  } else {
    // Scan output/ for all subdirs
    const entries = fs.readdirSync(outputBase, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== '.gitkeep') {
        targets.push(path.join(outputBase, entry.name));
      }
    }
  }

  if (targets.length === 0) {
    logger.warn('No generated output directories found. Run `npm run generate` first.');
    return;
  }

  logger.info(`Verifying ${targets.length} output(s)...`);
  logger.line();

  let totalOk = 0;
  let totalWarn = 0;
  let totalFail = 0;

  for (const targetDir of targets) {
    const dirName = path.basename(targetDir);
    const indexPath = path.join(targetDir, 'index.md');

    if (!fileExists(indexPath)) {
      logger.fail(dirName, 'index.md not found');
      totalFail++;
      continue;
    }

    // Load metadata to get output type if available
    let outputType: string | undefined;
    const metaPath = path.join(targetDir, 'metadata.json');
    if (fileExists(metaPath)) {
      try {
        const meta = JSON.parse(readFile(metaPath)) as { output_type?: string };
        outputType = meta.output_type;
      } catch {
        // ignore parse errors
      }
    }

    const content = readFile(indexPath);
    // For docusaurus/gitbook, frontmatter lives in a separate file — don't warn on index.md
    const checkType = outputType === 'docusaurus' || outputType === 'gitbook' ? undefined : outputType;
    const result = validateMarkdown(content, checkType);

    if (result.errors.length === 0 && result.warnings.length === 0) {
      logger.ok(dirName);
      totalOk++;
    } else if (result.errors.length > 0) {
      logger.fail(dirName);
      for (const e of result.errors) logger.dim(`    ✗ ${e}`);
      for (const w of result.warnings) logger.dim(`    ⚠ ${w}`);
      totalFail++;
    } else {
      logger.warn(dirName);
      for (const w of result.warnings) logger.dim(`    ⚠ ${w}`);
      totalWarn++;
    }
  }

  logger.line();
  logger.dim(`─────────────────────────────────────────`);
  logger.dim(`Verified: ${totalOk} OK, ${totalWarn} warnings, ${totalFail} failures`);

  if (totalFail > 0) {
    logger.error('Verification failed. Fix the errors above before publishing.');
    process.exitCode = 1;
  } else if (totalWarn > 0) {
    logger.warn('Warnings found. Review them before publishing.');
  } else {
    logger.success('All outputs verified successfully!');
  }
}
