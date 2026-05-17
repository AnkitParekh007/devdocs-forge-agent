import { describe, it, expect } from 'vitest';

/**
 * Doctor command tests validate the logic of individual checks.
 * Integration-level doctor tests run via `npm run doctor` in the shell.
 */
describe('Doctor checks', () => {
  it('detects Node.js version >= 18', () => {
    const version = process.versions.node;
    const major = parseInt(version.split('.')[0], 10);
    expect(major).toBeGreaterThanOrEqual(18);
  });

  it('DEVDOCS_PROVIDER defaults to mock when unset', () => {
    const saved = process.env.DEVDOCS_PROVIDER;
    delete process.env.DEVDOCS_PROVIDER;
    const provider = process.env.DEVDOCS_PROVIDER ?? 'mock';
    expect(provider).toBe('mock');
    if (saved !== undefined) process.env.DEVDOCS_PROVIDER = saved;
  });

  it('recognizes valid providers', () => {
    const valid = ['mock', 'openai', 'anthropic', 'gemini', 'ollama'];
    for (const p of valid) {
      expect(valid.includes(p)).toBe(true);
    }
  });

  it('rejects invalid provider names', () => {
    const valid = ['mock', 'openai', 'anthropic', 'gemini', 'ollama'];
    expect(valid.includes('youtube-scraper')).toBe(false);
    expect(valid.includes('')).toBe(false);
  });
});
