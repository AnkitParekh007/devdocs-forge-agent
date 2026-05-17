import { DocuForgeError } from '../utils/errors.js';
import type { Provider, GenerateOptions } from './provider.types.js';

/**
 * Ollama provider using the local HTTP API.
 * No npm package or API key required; run `ollama serve` locally.
 */
export class OllamaProvider implements Provider {
  readonly name = 'ollama';
  readonly model: string;
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = (process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434').replace(/\/$/, '');
    this.model = process.env.OLLAMA_MODEL ?? 'llama3';
  }

  async generate(options: GenerateOptions): Promise<string> {
    const body = {
      model: this.model,
      prompt: options.prompt,
      stream: false,
      options: {
        temperature: options.temperature ?? 0.3,
        num_predict: options.maxTokens ?? 6000,
      },
    };

    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch((error: unknown) => {
      const detail = error instanceof Error ? error.message : String(error);
      throw new DocuForgeError(
        `Could not connect to Ollama at ${this.baseUrl}.`,
        'OLLAMA_UNREACHABLE',
        `Make sure Ollama is running locally. ${detail}`,
      );
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '(no response body)');
      throw new DocuForgeError(
        `Ollama API error: ${response.status} ${response.statusText}`,
        'PROVIDER_ERROR',
        text,
      );
    }

    const data = (await response.json()) as { response?: string };
    const content = data.response;
    if (!content) {
      throw new DocuForgeError('Ollama returned an empty response.', 'EMPTY_RESPONSE');
    }

    return content;
  }
}
