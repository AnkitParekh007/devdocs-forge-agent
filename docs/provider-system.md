# Provider System

devdocs-forge-agent uses a simple provider abstraction that makes it easy to swap AI backends without changing any pipeline code.

## Provider Interface

All providers implement one interface:

```typescript
// src/providers/provider.types.ts
interface Provider {
  name: string;
  model: string;
  generate(options: GenerateOptions): Promise<string>;
}

interface GenerateOptions {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}
```

The pipeline only depends on this interface. It never imports a specific provider directly — it calls `getProvider()` from the registry.

## Built-in Providers

| Provider | Env var | Default model | Requires API key |
|---|---|---|---|
| `mock` | `DEVDOCS_PROVIDER=mock` | `mock-v1` | No |
| `openai` | `DEVDOCS_PROVIDER=openai` | `gpt-4.1-mini` | `OPENAI_API_KEY` |
| `anthropic` | `DEVDOCS_PROVIDER=anthropic` | `claude-3-5-sonnet-latest` | `ANTHROPIC_API_KEY` |
| `gemini` | `DEVDOCS_PROVIDER=gemini` | `gemini-2.0-flash` | `GEMINI_API_KEY` |
| `ollama` | `DEVDOCS_PROVIDER=ollama` | `llama3` | No |

### Mock Provider

The mock provider (`src/providers/mock.provider.ts`) returns a structured placeholder document that matches the output format for the requested mode. It is used for:

- Local development without an API key
- CI tests (no API costs)
- Validating the pipeline and output structure

The `npm run demo` command uses mock mode by default.

### Real Providers

OpenAI, Anthropic, Gemini, and Ollama providers use native Node.js `fetch` (Node 18+). No SDK packages are installed — this keeps the install size small and makes each provider easy to audit in a single file.

Model override via env var:

```env
OPENAI_MODEL=gpt-4o
ANTHROPIC_MODEL=claude-opus-4
GEMINI_MODEL=gemini-2.0-pro
OLLAMA_MODEL=llama3
```

## Provider Registry

`src/providers/provider-registry.ts` reads `DEVDOCS_PROVIDER` from the environment (with fallback to config YAML) and returns the appropriate provider instance. If the requested provider is not found or the API key is missing, it throws a `DocuForgeError` with a clear remediation message.

```typescript
// How the pipeline gets a provider
const provider = getProvider(config);
const output = await provider.generate({ prompt, maxTokens, temperature });
```

## Adding a Provider

1. Create `src/providers/yourprovider.provider.ts` implementing the `Provider` interface
2. Add a case to `src/providers/provider-registry.ts`
3. Add the provider name to the `DEVDOCS_PROVIDER` allowed values in `src/config/config.schema.ts`
4. Add the API key env var to `.env.example`
5. Add a test to `tests/provider-registry.test.ts`

See [AGENTS.md](../AGENTS.md) for the full step-by-step guide.

### Good First Issues for New Providers

- **OpenRouter** ([issue #2](https://github.com/AnkitParekh007/devdocs-forge-agent/issues/2)) — access to 200+ models via a single API key

## Config Resolution Order

Provider selection resolves in this order (first match wins):

1. CLI flag `--provider openai` (not yet implemented — planned)
2. `DEVDOCS_PROVIDER` environment variable (`.env` or shell)
3. `model.provider` in `config/devdocs-forge-agent.yml`
4. Default: `mock`

Temperature and max tokens follow the same resolution order, with per-provider sensible defaults.
