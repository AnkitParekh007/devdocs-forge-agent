import { describe, it, expect, beforeEach } from 'vitest';
import { getProvider } from '../src/providers/provider-registry.js';
import { DocuForgeError } from '../src/utils/errors.js';

describe('getProvider', () => {
  beforeEach(() => {
    // Reset env vars before each test
    delete process.env.DEVDOCS_PROVIDER;
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;
  });

  it('returns mock provider by default', () => {
    const provider = getProvider('mock');
    expect(provider.name).toBe('mock');
  });

  it('returns mock provider when DEVDOCS_PROVIDER=mock', () => {
    process.env.DEVDOCS_PROVIDER = 'mock';
    const provider = getProvider();
    expect(provider.name).toBe('mock');
  });

  it('throws DocuForgeError for unknown provider', () => {
    expect(() => getProvider('unknownprovider')).toThrow(DocuForgeError);
  });

  it('throws for openai without API key', () => {
    expect(() => getProvider('openai')).toThrow(DocuForgeError);
  });

  it('throws for anthropic without API key', () => {
    expect(() => getProvider('anthropic')).toThrow(DocuForgeError);
  });

  it('throws for gemini without API key', () => {
    expect(() => getProvider('gemini')).toThrow(DocuForgeError);
  });

  it('mock provider generates placeholder markdown', async () => {
    const provider = getProvider('mock');
    const result = await provider.generate({ prompt: 'Write docs for signals' });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(100);
    expect(result).toContain('#');
  });
});
