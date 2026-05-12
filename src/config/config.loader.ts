import path from 'node:path';
import yaml from 'js-yaml';
import { fileExists, readFile } from '../utils/fs-utils.js';
import { ConfigSchema, type DocuForgeConfig } from './config.schema.js';
import { DocuForgeError } from '../utils/errors.js';

const CWD = process.cwd();

export function loadConfig(configPathOverride?: string): DocuForgeConfig {
  const configPath =
    configPathOverride ??
    process.env.DEVDOCS_CONFIG ??
    path.join(CWD, 'config', 'devdocs-forge-agent.yml');

  if (!fileExists(configPath)) {
    // Return defaults if no config file — allows running without init
    return ConfigSchema.parse({});
  }

  const raw = readFile(configPath);

  let parsed: unknown;
  try {
    parsed = yaml.load(raw);
  } catch (e) {
    throw new DocuForgeError(
      `Invalid YAML in config file: ${configPath}`,
      'INVALID_CONFIG',
      e instanceof Error ? e.message : String(e),
    );
  }

  const result = ConfigSchema.safeParse(parsed ?? {});
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new DocuForgeError(
      `Config validation failed:\n${issues}`,
      'INVALID_CONFIG',
      `Fix the errors in ${configPath}`,
    );
  }

  return result.data;
}
