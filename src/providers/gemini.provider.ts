import { DocuForgeError } from '../utils/errors.js';
import type { Provider, GenerateOptions } from './provider.types.js';

/**
 * Google Gemini provider using native fetch (Node 18+).
 */
export class GeminiProvider implements Provider {
  readonly name = 'gemini';
  readonly model: string;
  private readonly apiKey: string;

  constructor() {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key.trim() === '') {
      throw new DocuForgeError(
        'GEMINI_API_KEY is not set.',
        'MISSING_API_KEY',
        'Add GEMINI_API_KEY=... to your .env file. Get a key at https://aistudio.google.com/',
      );
    }
    this.apiKey = key;
    this.model = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
  }

  async generate(options: GenerateOptions): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const body = {
      contents: [{ parts: [{ text: options.prompt }] }],
      generationConfig: {
        temperature: options.temperature ?? 0.3,
        maxOutputTokens: options.maxTokens ?? 6000,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '(no response body)');
      throw new DocuForgeError(
        `Gemini API error: ${response.status} ${response.statusText}`,
        'PROVIDER_ERROR',
        text,
      );
    }

    const data = (await response.json()) as {
      candidates: Array<{
        content: { parts: Array<{ text: string }> };
      }>;
    };

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new DocuForgeError('Gemini returned an empty response.', 'EMPTY_RESPONSE');
    }

    return content;
  }
}
