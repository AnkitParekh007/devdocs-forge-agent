import { parseSource } from './source-parser.js';
import { buildPrompt, isValidMode } from './prompt-builder.js';
import { writeOutput } from './output-writer.js';
import { getProvider } from '../providers/provider-registry.js';
import { loadConfig } from '../config/config.loader.js';
import { logger } from '../utils/logger.js';
import { DocuForgeError } from '../utils/errors.js';

export interface GenerateOptions {
  file: string;
  type?: string;
  sourceUrl?: string;
  force?: boolean;
}

export interface GenerateResult {
  outputDir: string;
  files: string[];
  provider: string;
  model: string;
}

export async function runGeneration(options: GenerateOptions): Promise<GenerateResult> {
  const config = loadConfig();

  // Resolve output type
  const outputType = options.type ?? config.project.default_output_type;
  if (!isValidMode(outputType)) {
    throw new DocuForgeError(
      `Unknown output type: "${outputType}"`,
      'INVALID_MODE',
      `Valid types: blog, docs, docusaurus, gitbook, readme, faq, troubleshooting, lesson, social, changelog, seo`,
    );
  }

  logger.info(`Parsing: ${options.file}`);
  const source = parseSource(options.file);

  // Allow source URL from CLI to override frontmatter
  if (options.sourceUrl) {
    source.sourceUrl = options.sourceUrl;
  }

  logger.info(`Building prompt for mode: ${outputType}`);
  const prompt = await buildPrompt({ mode: outputType, source, config });

  logger.info(`Generating with provider: ${process.env.DEVDOCS_PROVIDER ?? 'mock'}`);
  const provider = getProvider();
  const content = await provider.generate({
    prompt,
    temperature: config.model.temperature,
    maxTokens: config.model.max_tokens,
  });

  logger.info(`Writing output files...`);
  const result = writeOutput({
    content,
    source,
    sourceFile: options.file,
    outputType,
    provider: provider.name,
    model: provider.model,
    config,
  });

  return {
    outputDir: result.outputDir,
    files: result.files,
    provider: provider.name,
    model: provider.model,
  };
}
