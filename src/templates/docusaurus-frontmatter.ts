import type { DocuForgeConfig } from '../config/config.schema.js';

export interface DocusaurusFrontmatter {
  id: string;
  title: string;
  sidebar_label: string;
  sidebar_position: number;
  description: string;
  tags: string[];
}

export function buildDocusaurusFrontmatter(options: {
  slug: string;
  title: string;
  description: string;
  config: DocuForgeConfig;
}): string {
  const { slug, title, description, config } = options;

  const sidebarLabel = title.length > 30 ? title.slice(0, 30).trim() + '…' : title;

  const fm: DocusaurusFrontmatter = {
    id: slug,
    title,
    sidebar_label: sidebarLabel,
    sidebar_position: config.docusaurus.sidebar_position,
    description: description.slice(0, 160),
    tags: config.docusaurus.tags,
  };

  const lines = [
    '---',
    `id: ${fm.id}`,
    `title: "${fm.title}"`,
    `sidebar_label: "${fm.sidebar_label}"`,
    `sidebar_position: ${fm.sidebar_position}`,
    `description: "${fm.description}"`,
    `tags:`,
    ...fm.tags.map((t) => `  - ${t}`),
    '---',
    '',
  ];

  return lines.join('\n');
}
