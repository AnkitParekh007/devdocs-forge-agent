import path from 'node:path';
import { writeFile, todayString } from '../utils/fs-utils.js';
import { buildMetadata, buildReviewChecklist, buildSourceSummary } from '../templates/output-template.js';
import { buildDocusaurusFrontmatter } from '../templates/docusaurus-frontmatter.js';
import type { ParsedSource } from './source-parser.js';
import type { DocuForgeConfig } from '../config/config.schema.js';

const CWD = process.cwd();

export interface WriteOutputOptions {
  content: string;
  source: ParsedSource;
  sourceFile: string;
  outputType: string;
  provider: string;
  model: string;
  config: DocuForgeConfig;
  warnings?: string[];
}

export interface WriteOutputResult {
  outputDir: string;
  files: string[];
}

export function writeOutput(options: WriteOutputOptions): WriteOutputResult {
  const { content, source, sourceFile, outputType, provider, model, config, warnings } = options;

  const outputBaseDir = path.join(CWD, config.project.output_dir);
  const folderName = `${source.slug}-${todayString()}`;
  const outputDir = path.join(outputBaseDir, folderName);

  const files: string[] = [];

  // 1. index.md — the main generated content
  const indexPath = path.join(outputDir, 'index.md');
  writeFile(indexPath, content);
  files.push(indexPath);

  // 2. metadata.json
  const metadata = buildMetadata({
    source,
    sourceFile,
    outputType,
    provider,
    model,
    generatedContent: content,
    warnings,
  });
  const metadataPath = path.join(outputDir, 'metadata.json');
  writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  files.push(metadataPath);

  // 3. review-checklist.md
  const checklistPath = path.join(outputDir, 'review-checklist.md');
  writeFile(checklistPath, buildReviewChecklist(source.title));
  files.push(checklistPath);

  // 4. source-summary.md
  const summaryPath = path.join(outputDir, 'source-summary.md');
  writeFile(summaryPath, buildSourceSummary(source, outputType));
  files.push(summaryPath);

  // 5. Type-specific extra files
  if (outputType === 'docusaurus') {
    // Extract description from first paragraph of generated content
    const descMatch = content.match(/^(?!#)[^\n]{20,200}/m);
    const description = descMatch
      ? descMatch[0].trim().replace(/[*_`]/g, '')
      : source.title;

    const frontmatter = buildDocusaurusFrontmatter({
      slug: source.slug,
      title: source.title,
      description,
      config,
    });

    const docsPath = path.join(outputDir, 'docs', `${source.slug}.md`);
    writeFile(docsPath, frontmatter + content);
    files.push(docsPath);
  }

  if (outputType === 'blog') {
    const blogPath = path.join(outputDir, 'blog', `${source.slug}.md`);
    writeFile(blogPath, content);
    files.push(blogPath);
  }

  return { outputDir, files };
}
