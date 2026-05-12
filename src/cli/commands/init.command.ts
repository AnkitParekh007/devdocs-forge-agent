import path from 'node:path';
import { fileExists, ensureDir, copyFile, writeFile } from '../../utils/fs-utils.js';
import { logger } from '../../utils/logger.js';

const CWD = process.cwd();

function created(label: string) {
  logger.ok(label, 'created');
}

function skipped(label: string) {
  logger.dim(`skipped  ${label}  (already exists)`);
}

export async function initCommand(): Promise<void> {
  logger.section('devdocs-forge-agent init');

  // Ensure directories
  for (const dir of ['input', 'output', 'config', 'modes']) {
    const dirPath = path.join(CWD, dir);
    if (!fileExists(dirPath)) {
      ensureDir(dirPath);
      created(dir + '/');
    } else {
      skipped(dir + '/');
    }
  }

  // Copy config example
  const configDest = path.join(CWD, 'config', 'devdocs-forge-agent.yml');
  const configSrc = path.join(CWD, 'config', 'devdocs-forge-agent.example.yml');
  if (!fileExists(configDest)) {
    if (fileExists(configSrc)) {
      copyFile(configSrc, configDest);
      created('config/devdocs-forge-agent.yml');
    } else {
      // Write a minimal config inline if example is missing
      writeFile(
        configDest,
        `project:\n  name: "My Docs Project"\n  default_output_type: "docusaurus"\n  output_dir: "output"\n  input_dir: "input"\n\nmodel:\n  provider: "mock"\n  temperature: 0.3\n  max_tokens: 6000\n`,
      );
      created('config/devdocs-forge-agent.yml');
    }
  } else {
    skipped('config/devdocs-forge-agent.yml');
  }

  // Copy .env.example → .env if .env missing
  const envDest = path.join(CWD, '.env');
  const envSrc = path.join(CWD, '.env.example');
  if (!fileExists(envDest) && fileExists(envSrc)) {
    copyFile(envSrc, envDest);
    created('.env');
    logger.warn('.env', 'Review and add your API keys before using a real provider');
  } else if (!fileExists(envDest)) {
    skipped('.env  (no .env.example found — create one manually)');
  } else {
    skipped('.env');
  }

  // Copy _profile.template.md → modes/_profile.md
  const profileDest = path.join(CWD, 'modes', '_profile.md');
  const profileSrc = path.join(CWD, 'modes', '_profile.template.md');
  if (!fileExists(profileDest)) {
    if (fileExists(profileSrc)) {
      copyFile(profileSrc, profileDest);
      created('modes/_profile.md');
    }
  } else {
    skipped('modes/_profile.md');
  }

  // Ensure .gitkeep in input/ and output/
  const inputKeep = path.join(CWD, 'input', '.gitkeep');
  const outputKeep = path.join(CWD, 'output', '.gitkeep');
  if (!fileExists(inputKeep)) writeFile(inputKeep, '');
  if (!fileExists(outputKeep)) writeFile(outputKeep, '');

  logger.line();
  logger.success('Init complete. Run `npm run doctor` to verify your setup.');
  logger.dim('Next: add a transcript to input/ and run `npm run generate -- --file input/my-transcript.md`');
}
