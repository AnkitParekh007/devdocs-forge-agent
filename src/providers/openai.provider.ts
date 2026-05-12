import { DocuForgeError } from '../utils/errors.js';
import type { Provider, GenerateOptions } from './provider.types.js';

/**
 * OpenAI provider using native fetch (Node 18+).
 * No openai npm package required — keeps install footprint minimal.
 */
export class OpenAIProvider implements Provider {
  readonly name = 'openai';
  readonly model: string;
  private readonly apiKey: string;

  constructor() {
    const key = process.env.OPENAI_API_KEY;
    if (!key || key.trim() === '') {
      throw new DocuForgeError(
        'OPENAI_API_KEY is not set.',
        'MISSING_API_KEY',
        'Add OPENAI_API_KEY=sk-... to your .env file. Get a key at https://platform.openai.com/api-keys',
      );
    }
    this.apiKey = key;
    this.model = process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';
  }

  async generate(options: GenerateOptions): Promise<string> {
    const body = {
      model: this.model,
      messages: [{ role: 'user', content: options.prompt }],
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 6000,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '(no response body)');
      throw new DocuForgeError(
        `OpenAI API error: ${response.status} ${response.statusText}`,
        'PROVIDER_ERROR',
        text,
      );
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new DocuForgeError('OpenAI returned an empty response.', 'EMPTY_RESPONSE');
    }

    return content;
  }
}
