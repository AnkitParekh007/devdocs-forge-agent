import { describe, it, expect } from 'vitest';
import { ConfigSchema } from '../src/config/config.schema.js';

describe('ConfigSchema', () => {
  it('parses a full valid config', () => {
    const input = {
      project: {
        name: 'Test Project',
        default_output_type: 'blog',
        output_dir: 'output',
        input_dir: 'input',
      },
      model: {
        provider: 'mock',
        temperature: 0.5,
        max_tokens: 4000,
      },
      writing: {
        audience: 'beginners',
        tone: 'friendly',
        style: 'tutorial',
        include_summary: false,
        include_faq: false,
        include_troubleshooting: true,
        include_code_explanations: true,
        include_review_checklist: true,
      },
    };

    const result = ConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.project.name).toBe('Test Project');
      expect(result.data.model.temperature).toBe(0.5);
    }
  });

  it('uses defaults for missing fields', () => {
    const result = ConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.project.name).toBe('My Docs Project');
      expect(result.data.model.provider).toBe('mock');
      expect(result.data.model.temperature).toBe(0.3);
      expect(result.data.writing.include_review_checklist).toBe(true);
    }
  });

  it('rejects invalid temperature values', () => {
    const result = ConfigSchema.safeParse({ model: { temperature: 5 } });
    expect(result.success).toBe(false);
  });

  it('rejects negative max_tokens', () => {
    const result = ConfigSchema.safeParse({ model: { max_tokens: -100 } });
    expect(result.success).toBe(false);
  });

  it('applies default docusaurus tags', () => {
    const result = ConfigSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.docusaurus.tags).toContain('tutorial');
    }
  });
});
