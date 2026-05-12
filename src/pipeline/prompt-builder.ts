import path from 'node:path';
import { fileExists, readFile } from '../utils/fs-utils.js';
import type { DocuForgeConfig } from '../config/config.schema.js';
import type { ParsedSource } from './source-parser.js';

const CWD = process.cwd();

const VALID_MODES = [
  'blog', 'docs', 'docusaurus', 'gitbook', 'readme',
  'faq', 'troubleshooting', 'lesson', 'social', 'changelog', 'seo',
] as const;

export type OutputMode = (typeof VALID_MODES)[number];

export function isValidMode(mode: string): mode is OutputMode {
  return VALID_MODES.includes(mode as OutputMode);
}

export interface PromptBuildOptions {
  mode: string;
  source: ParsedSource;
  config: DocuForgeConfig;
}

/**
 * Assembles the full prompt from:
 *   1. shared rules (_shared.md)
 *   2. user profile (_profile.md or _profile.template.md)
 *   3. mode-specific instructions (modes/{mode}.md)
 *   4. config context
 *   5. source transcript
 */
export async function buildPrompt(options: PromptBuildOptions): Promise<string> {
  const { mode, source, config } = options;

  const modesDir = path.join(CWD, 'modes');

  const shared = loadModeFile(path.join(modesDir, '_shared.md'));
  const profile = loadProfileFile(modesDir);
  const modeInstructions = loadModeFile(path.join(modesDir, `${mode}.md`));

  const configContext = buildConfigContext(config);
  const sourceContext = buildSourceContext(source);

  const parts = [
    '# devdocs-forge-agent — Documentation Generation Task',
    '',
    '## Shared Rules (apply to all outputs)',
    shared,
    '',
    '## User Profile',
    profile,
    '',
    '## Output Mode Instructions',
    modeInstructions,
    '',
    '## Project Configuration',
    configContext,
    '',
    '## Source Transcript',
    sourceContext,
    '',
    '## Task',
    `Generate a "${mode}" documentation output following all the rules above.`,
    `The output must be valid Markdown, ready to use with minimal editing.`,
    source.sourceUrl
      ? `Include a source attribution section crediting: ${source.sourceUrl}`
      : '',
    `Add a human review checklist at the end labeled "## Review Checklist".`,
  ].filter(Boolean);

  return parts.join('\n');
}

function loadModeFile(filePath: string): string {
  if (fileExists(filePath)) {
    return readFile(filePath);
  }
  return `(Mode file not found: ${filePath})`;
}

function loadProfileFile(modesDir: string): string {
  const profilePath = path.join(modesDir, '_profile.md');
  const templatePath = path.join(modesDir, '_profile.template.md');

  if (fileExists(profilePath)) return readFile(profilePath);
  if (fileExists(templatePath)) return readFile(templatePath);
  return '(No user profile found — using defaults)';
}

function buildConfigContext(config: DocuForgeConfig): string {
  return [
    `- Audience: ${config.writing.audience}`,
    `- Tone: ${config.writing.tone}`,
    `- Style: ${config.writing.style}`,
    `- Include summary: ${config.writing.include_summary}`,
    `- Include FAQ: ${config.writing.include_faq}`,
    `- Include troubleshooting: ${config.writing.include_troubleshooting}`,
    `- Include code explanations: ${config.writing.include_code_explanations}`,
    `- Docusaurus sidebar position: ${config.docusaurus.sidebar_position}`,
    `- Docusaurus tags: ${config.docusaurus.tags.join(', ')}`,
  ].join('\n');
}

function buildSourceContext(source: ParsedSource): string {
  const header = [
    `**Title:** ${source.title}`,
    `**Word count:** ${source.wordCount}`,
    source.sourceUrl ? `**Source URL:** ${source.sourceUrl}` : '',
    '',
    '---',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  return header + source.content;
}
