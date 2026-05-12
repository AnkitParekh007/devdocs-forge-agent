import { DocuForgeError } from '../utils/errors.js';
import { MockProvider } from './mock.provider.js';
import { OpenAIProvider } from './openai.provider.js';
import { AnthropicProvider } from './anthropic.provider.js';
import { GeminiProvider } from './gemini.provider.js';
import type { Provider } from './provider.types.js';

const SUPPORTED = ['mock', 'openai', 'anthropic', 'gemini'] as const;

/**
 * Returns the active Provider based on DEVDOCS_PROVIDER env var.
 * Defaults to mock if not set.
 *
 * To add a new provider:
 * 1. Create src/providers/yourprovider.provider.ts implementing the Provider interface
 * 2. Import it here and add a case below
 * 3. Document it in docs/PROVIDERS.md
 */
export function getProvider(overrideName?: string): Provider {
  const name = overrideName ?? process.env.DEVDOCS_PROVIDER ?? 'mock';

  switch (name) {
    case 'mock':
      return new MockProvider();
    case 'openai':
      return new OpenAIProvider();
    case 'anthropic':
      return new AnthropicProvider();
    case 'gemini':
      return new GeminiProvider();
    default:
      throw new DocuForgeError(
        `Unknown provider: "${name}"`,
        'UNKNOWN_PROVIDER',
        `Supported providers: ${SUPPORTED.join(', ')}. Set DEVDOCS_PROVIDER in your .env`,
      );
  }
}
