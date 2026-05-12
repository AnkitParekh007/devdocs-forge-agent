---
title: "Add Ollama provider for local LLM generation"
labels: ["good first issue", "provider", "enhancement"]
---

## Summary

Add an Ollama provider so users can run devdocs-forge-agent entirely locally with open-weight LLMs (Llama 3, Mistral, Phi, etc.) without any API key or internet connection.

## Background

devdocs-forge-agent uses a provider abstraction (`src/providers/provider.types.ts`) that makes adding new providers straightforward. Each provider implements two fields (`name`, `model`) and one method (`generate(options)`). All existing providers use native `fetch` with no external SDK packages.

## Files to Touch

| File | Change |
|------|--------|
| `src/providers/ollama.provider.ts` | Create — implement Provider interface |
| `src/providers/provider-registry.ts` | Add `'ollama'` case to `getProvider()` switch |
| `.env.example` | Add `OLLAMA_BASE_URL` and `OLLAMA_MODEL` |
| `docs/PROVIDERS.md` | Document Ollama setup |
| `tests/provider-registry.test.ts` | Add test for `DEVDOCS_PROVIDER=ollama` |

## Implementation Guide

1. Create `src/providers/ollama.provider.ts`:

```typescript
import type { Provider, GenerateOptions } from './provider.types.js';
import { DocuForgeError } from '../utils/errors.js';

export class OllamaProvider implements Provider {
  readonly name = 'ollama';
  readonly model: string;
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL ?? 'llama3';
  }

  async generate(options: GenerateOptions): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        prompt: options.prompt,
        stream: false,
      }),
    }).catch(() => {
      throw new DocuForgeError(
        `Could not connect to Ollama at ${this.baseUrl}`,
        'OLLAMA_UNREACHABLE',
        'Make sure Ollama is running: https://ollama.ai',
      );
    });

    if (!response.ok) {
      throw new DocuForgeError(`Ollama error: ${response.statusText}`, 'OLLAMA_ERROR');
    }

    const data = await response.json() as { response: string };
    return data.response;
  }
}
```

2. Register in `src/providers/provider-registry.ts`:

```typescript
case 'ollama': return new OllamaProvider();
```

3. Add to `.env.example`:

```env
# --- Ollama (local LLMs, no API key needed) ---
# DEVDOCS_PROVIDER=ollama
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_MODEL=llama3
```

## Acceptance Criteria

- [ ] `DEVDOCS_PROVIDER=ollama npm run generate -- --file ...` works when Ollama is running
- [ ] `OLLAMA_BASE_URL` and `OLLAMA_MODEL` are read from environment
- [ ] Graceful error when Ollama is unreachable (not a raw stack trace)
- [ ] `npm run doctor` does not fail if Ollama is not set
- [ ] Tests for provider registry updated
- [ ] `docs/PROVIDERS.md` updated with Ollama setup instructions
- [ ] `.env.example` updated

## Difficulty

Low — ~80 lines of new code, no external packages needed.

## How to Get Started

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
npm test  # all 54 tests should pass before you start
```

Questions? Comment on this issue before opening a PR.
