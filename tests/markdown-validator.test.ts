import { describe, it, expect } from 'vitest';
import { validateMarkdown } from '../src/pipeline/markdown-validator.js';

describe('validateMarkdown', () => {
  it('returns valid for a well-formed document', () => {
    const content = `# My Guide

## Overview

This is a well-formed document with enough content to be meaningful.
It has multiple paragraphs and clear structure.

## Steps

1. First step
2. Second step

## Review Checklist

- [ ] Facts verified
`;
    const result = validateMarkdown(content);
    expect(result.errors).toHaveLength(0);
  });

  it('fails when H1 title is missing', () => {
    const content = `## Overview\n\nSome content here without a title.\n\n## Review Checklist\n- [ ] done`;
    const result = validateMarkdown(content);
    expect(result.errors.some((e) => e.includes('Missing H1'))).toBe(true);
  });

  it('warns about very short content', () => {
    const content = `# Title\n\nShort.\n\n## Review Checklist\n- [ ] done`;
    const result = validateMarkdown(content);
    expect(result.warnings.some((w) => w.includes('short'))).toBe(true);
  });

  it('does not warn about review checklist in index.md (checklist lives in a separate file)', () => {
    const content = `# Title\n\n${'Word '.repeat(120)}\n`;
    const result = validateMarkdown(content);
    // Review checklist is always in review-checklist.md — not checked in index.md
    expect(result.warnings.some((w) => w.includes('review checklist'))).toBe(false);
  });

  it('fails when API key pattern is detected', () => {
    const content = `# Title\n\nsome content\n\nOPENAI_API_KEY=sk-proj-abc123\n\n## Review Checklist\n- [ ] done`;
    const result = validateMarkdown(content);
    expect(result.errors.some((e) => e.includes('API key'))).toBe(true);
  });

  it('warns for docusaurus type without frontmatter', () => {
    const content = `# Title\n\n${'Word '.repeat(120)}\n\n## Review Checklist\n- [ ] done`;
    const result = validateMarkdown(content, 'docusaurus');
    expect(result.warnings.some((w) => w.includes('frontmatter'))).toBe(true);
  });

  it('does not warn about frontmatter for blog type', () => {
    const content = `# Title\n\n${'Word '.repeat(120)}\n\n## Review Checklist\n- [ ] done`;
    const result = validateMarkdown(content, 'blog');
    expect(result.warnings.some((w) => w.includes('frontmatter'))).toBe(false);
  });
});
