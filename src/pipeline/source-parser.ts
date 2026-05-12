import { readFile, wordCount } from '../utils/fs-utils.js';

export interface ParsedSource {
  title: string;
  content: string;
  sourceUrl?: string;
  wordCount: number;
  slug: string;
}

/**
 * Parses an input transcript file.
 * Extracts title, source URL (from frontmatter), and word count.
 */
export function parseSource(filePath: string): ParsedSource {
  const raw = readFile(filePath);

  let content = raw;
  let sourceUrl: string | undefined;

  // Extract YAML frontmatter if present
  const frontmatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    content = raw.slice(frontmatterMatch[0].length);

    const urlMatch = frontmatter.match(/source_url:\s*(.+)/);
    if (urlMatch) {
      sourceUrl = urlMatch[1].trim().replace(/^["']|["']$/g, '');
    }
  }

  // Extract title from first H1 heading
  const h1Match = content.match(/^#\s+(.+)$/m);
  const title = h1Match ? h1Match[1].trim() : deriveTitle(filePath);

  // Generate slug from title
  const slug = slugifyTitle(title);

  return {
    title,
    content: content.trim(),
    sourceUrl,
    wordCount: wordCount(content),
    slug,
  };
}

function deriveTitle(filePath: string): string {
  const basename = filePath.split(/[\\/]/).pop() ?? 'document';
  return basename
    .replace(/\.(md|txt)$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
