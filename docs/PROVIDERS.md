# Providers Guide

## Overview

devdocs-forge-agent uses a provider abstraction so you can switch AI models without changing code.
Set your provider in `.env`:

```env
DEVDOCS_PROVIDER=mock  # default — no API key needed
```

Run `npm run providers` to see available providers and the currently selected one.

---

## Mock Provider (default)

No API key required. Returns realistic placeholder markdown for testing and demos.

```env
DEVDOCS_PROVIDER=mock
```

---

## OpenAI

Get a key at [platform.openai.com](https://platform.openai.com/api-keys).

```env
DEVDOCS_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

Recommended models: `gpt-4.1-mini` (fast/cheap), `gpt-4.1` (best quality).

---

## Anthropic Claude

Get a key at [console.anthropic.com](https://console.anthropic.com/).

```env
DEVDOCS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

Recommended models: `claude-3-5-sonnet-latest` (best), `claude-3-5-haiku-latest` (fast).

---

## Google Gemini

Get a key at [aistudio.google.com](https://aistudio.google.com/).

```env
DEVDOCS_PROVIDER=gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.0-flash
```

Recommended models: `gemini-2.0-flash` (fast), `gemini-1.5-pro` (high quality).

---

## Adding a New Provider

All providers implement the `Provider` interface in `src/providers/provider.types.ts`:

```typescript
export interface Provider {
  readonly name: string;
  readonly model: string;
  generate(options: GenerateOptions): Promise<string>;
}
```

To add a provider:

1. Create `src/providers/yourprovider.provider.ts`
2. Implement the interface using native `fetch` (Node 18+)
3. Add a case in `src/providers/provider-registry.ts`
4. Add env var documentation to `.env.example`
5. Document it in this file

### Example: Ollama (local LLMs)

```typescript
export class OllamaProvider implements Provider {
  readonly name = 'ollama';
  readonly model: string;

  constructor() {
    this.model = process.env.OLLAMA_MODEL ?? 'llama3';
  }

  async generate(options: GenerateOptions): Promise<string> {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        prompt: options.prompt,
        stream: false,
      }),
    });
    const data = await response.json();
    return data.response;
  }
}
```

No extra npm packages needed — native `fetch` handles all HTTP calls.
