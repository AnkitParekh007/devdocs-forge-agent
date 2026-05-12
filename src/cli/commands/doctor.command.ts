import path from 'node:path';
import { fileExists } from '../../utils/fs-utils.js';
import { logger } from '../../utils/logger.js';

const CWD = process.cwd();

const SUPPORTED_PROVIDERS = ['mock', 'openai', 'anthropic', 'gemini'];

const PROVIDER_KEY_MAP: Record<string, string> = {
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  gemini: 'GEMINI_API_KEY',
};

export async function doctorCommand(): Promise<void> {
  logger.section('devdocs-forge-agent doctor');

  let warnings = 0;
  let failures = 0;

  // Node version
  const nodeVersion = process.versions.node;
  const major = parseInt(nodeVersion.split('.')[0], 10);
  if (major >= 18) {
    logger.ok(`Node.js v${nodeVersion}`, `>= 18 required`);
  } else {
    logger.fail(`Node.js v${nodeVersion}`, `>= 18 required — please upgrade`);
    failures++;
  }

  // package.json
  if (fileExists(path.join(CWD, 'package.json'))) {
    logger.ok('package.json');
  } else {
    logger.fail('package.json', 'Run `npm init` or clone the full repo');
    failures++;
  }

  // config
  const configPath = path.join(CWD, 'config', 'devdocs-forge-agent.yml');
  if (fileExists(configPath)) {
    logger.ok('config/devdocs-forge-agent.yml');
  } else {
    logger.warn('config/devdocs-forge-agent.yml', 'Run `npm run init` to create it');
    warnings++;
  }

  // .env
  if (fileExists(path.join(CWD, '.env'))) {
    logger.ok('.env');
  } else {
    logger.warn('.env', 'Copy .env.example → .env and fill in your keys');
    warnings++;
  }

  // Provider
  const provider = process.env.DEVDOCS_PROVIDER ?? 'mock';
  if (SUPPORTED_PROVIDERS.includes(provider)) {
    logger.ok(`provider: ${provider}`);
  } else {
    logger.fail(`provider: ${provider}`, `Unknown provider. Choose: ${SUPPORTED_PROVIDERS.join(', ')}`);
    failures++;
  }

  // API key check (only for non-mock)
  if (provider !== 'mock') {
    const keyName = PROVIDER_KEY_MAP[provider];
    if (keyName) {
      const keyValue = process.env[keyName];
      if (keyValue && keyValue.trim().length > 0) {
        logger.ok(`${keyName}`, 'present');
      } else {
        logger.fail(`${keyName}`, `Required for provider "${provider}" — add it to .env`);
        failures++;
      }
    }
  } else {
    logger.ok('API key', 'not required in mock mode');
  }

  // YouTube API key (optional — degrades gracefully)
  const youtubeKey = process.env.YOUTUBE_API_KEY;
  if (youtubeKey && youtubeKey.trim().length > 0) {
    logger.ok('YOUTUBE_API_KEY', 'YouTube metadata enabled for video URL classification');
  } else {
    logger.warn(
      'YOUTUBE_API_KEY',
      'YouTube metadata disabled — title-only classification for video URLs',
    );
    warnings++;
  }

  // Directories
  for (const dir of ['input', 'output', 'modes', 'examples']) {
    if (fileExists(path.join(CWD, dir))) {
      logger.ok(`${dir}/`);
    } else {
      logger.warn(`${dir}/`, 'Run `npm run init` to create missing directories');
      warnings++;
    }
  }

  // Footer
  logger.line();
  logger.dim(`─────────────────────────────────────────`);
  logger.dim(`MVP status: local-first AI documentation agent`);
  logger.dim(`API keys required: only if non-mock provider selected`);
  logger.dim(`YouTube scraping: not included`);
  logger.dim(`Human review: enabled`);
  logger.line();

  if (failures > 0) {
    logger.error(`${failures} failure(s) found. Fix them before running generate.`);
    process.exit(1);
  } else if (warnings > 0) {
    logger.warn(`${warnings} warning(s). Run \`npm run init\` to resolve most of them.`);
  } else {
    logger.success('All checks passed. You are ready to generate docs!');
  }
}
