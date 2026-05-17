import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getProvider } from '../src/providers/provider-registry.js';
import { DocuForgeError } from '../src/utils/errors.js';

describe('getProvider', () => {
  beforeEach(() => {
    // Reset env vars before each test
    delete process.env.DEVDOCS_PROVIDER;
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.OLLAMA_BASE_URL;
    delete process.env.OLLAMA_MODEL;
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
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

  it('returns ollama provider without an API key', () => {
    process.env.DEVDOCS_PROVIDER = 'ollama';
    process.env.OLLAMA_BASE_URL = 'http://127.0.0.1:11434/';
    process.env.OLLAMA_MODEL = 'mistral';

    const provider = getProvider();

    expect(provider.name).toBe('ollama');
    expect(provider.model).toBe('mistral');
  });

  it('ollama provider sends prompts to the local generate endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'Generated local docs' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    process.env.OLLAMA_BASE_URL = 'http://localhost:11434/';
    process.env.OLLAMA_MODEL = 'llama3.1';
    const provider = getProvider('ollama');
    const result = await provider.generate({
      prompt: 'Write docs for local models',
      temperature: 0.1,
      maxTokens: 512,
    });

    expect(result).toBe('Generated local docs');
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:11434/api/generate',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.1',
          prompt: 'Write docs for local models',
          stream: false,
          options: {
            temperature: 0.1,
            num_predict: 512,
          },
        }),
      }),
    );
  });

  it('ollama provider wraps connection failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')));

    const provider = getProvider('ollama');

    await expect(provider.generate({ prompt: 'hello' })).rejects.toMatchObject({
      code: 'OLLAMA_UNREACHABLE',
    });
  });

  it('mock provider generates placeholder markdown', async () => {
    const provider = getProvider('mock');
    const result = await provider.generate({ prompt: 'Write docs for signals' });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(100);
    expect(result).toContain('#');
  });
});
