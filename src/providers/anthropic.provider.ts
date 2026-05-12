import { DocuForgeError } from '../utils/errors.js';
import type { Provider, GenerateOptions } from './provider.types.js';

/**
 * Anthropic Claude provider using native fetch (Node 18+).
 */
export class AnthropicProvider implements Provider {
  readonly name = 'anthropic';
  readonly model: string;
  private readonly apiKey: string;

  constructor() {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key || key.trim() === '') {
      throw new DocuForgeError(
        'ANTHROPIC_API_KEY is not set.',
        'MISSING_API_KEY',
        'Add ANTHROPIC_API_KEY=sk-ant-... to your .env file. Get a key at https://console.anthropic.com/',
      );
    }
    this.apiKey = key;
    this.model = process.env.ANTHROPIC_MODEL ?? 'claude-3-5-sonnet-latest';
  }

  async generate(options: GenerateOptions): Promise<string> {
    const body = {
      model: this.model,
      max_tokens: options.maxTokens ?? 6000,
      messages: [{ role: 'user', content: options.prompt }],
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '(no response body)');
      throw new DocuForgeError(
        `Anthropic API error: ${response.status} ${response.statusText}`,
        'PROVIDER_ERROR',
        text,
      );
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text: string }>;
    };

    const content = data.content?.find((c) => c.type === 'text')?.text;
    if (!content) {
      throw new DocuForgeError('Anthropic returned an empty response.', 'EMPTY_RESPONSE');
    }

    return content;
  }
}
