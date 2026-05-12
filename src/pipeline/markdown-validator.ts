export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

const PLACEHOLDER_KEY_PATTERNS = [
  /sk-[a-z]{2,}-[A-Za-z0-9]{20,}/,
  /AIza[0-9A-Za-z\-_]{35}/,
  /OPENAI_API_KEY=.+/,
  /ANTHROPIC_API_KEY=.+/,
  /GEMINI_API_KEY=.+/,
];

/**
 * Validates generated markdown for common quality issues.
 */
export function validateMarkdown(content: string, outputType?: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for H1 title
  if (!content.match(/^#\s+.+/m)) {
    errors.push('Missing H1 title — add a # Title at the top of the document');
  }

  // Check for empty sections: H2+ heading immediately followed (with only blank lines) by another heading
  const emptySection = content.match(/^#{2,}[ \t]+.+\n(?:[ \t]*\n)*(?=#{1,}[ \t])/m);
  if (emptySection) {
    warnings.push('Empty section detected — a heading has no content below it');
  }

  // Check for placeholder API keys accidentally included in output
  for (const pattern of PLACEHOLDER_KEY_PATTERNS) {
    if (pattern.test(content)) {
      errors.push('Potential API key detected in output — remove it before publishing');
      break;
    }
  }

  // Check for Docusaurus frontmatter when type requires it
  if (outputType === 'docusaurus' || outputType === 'gitbook') {
    if (!content.startsWith('---')) {
      warnings.push(`Output type "${outputType}" typically requires YAML frontmatter`);
    }
  }

  // Note: review checklist lives in a separate review-checklist.md file — not checked here

  // Check for very short content (less than 100 words)
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 100) {
    warnings.push(`Document is very short (${wordCount} words) — may be incomplete`);
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}
