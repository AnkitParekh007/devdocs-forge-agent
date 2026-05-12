# Contributing to devdocs-forge-agent

Thank you for your interest in contributing! This guide will get you set up in a few minutes.

---

## Setup

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
cp .env.example .env
npm run doctor
```

No API key is needed for development — mock mode works out of the box.

---

## Running Tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev). All tests live in `tests/`.

Run a specific test file:
```bash
npx vitest run tests/markdown-validator.test.ts
```

---

## Adding a Provider

Providers live in `src/providers/`. To add a new one (e.g., Ollama):

1. Create `src/providers/ollama.provider.ts`:

```typescript
import type { Provider, GenerateOptions } from './provider.types.js';

export class OllamaProvider implements Provider {
  readonly name = 'ollama';
  readonly model: string;

  constructor() {
    this.model = process.env.OLLAMA_MODEL ?? 'llama3';
  }

  async generate(options: GenerateOptions): Promise<string> {
    // Call your provider's API here
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: this.model, prompt: options.prompt }),
    });
    // ... parse response
  }
}
```

2. Register it in `src/providers/provider-registry.ts`:

```typescript
case 'ollama':
  return new OllamaProvider();
```

3. Add env var docs to `.env.example` and `docs/PROVIDERS.md`

4. Run tests: `npm test`

---

## Adding a Mode

Modes are Markdown prompt files in `modes/`. To add a new one:

1. Create `modes/yourmode.md` with prompt instructions for the new output format
2. Add the mode name to `VALID_MODES` in `src/pipeline/prompt-builder.ts`:

```typescript
const VALID_MODES = [
  'blog', 'docs', 'docusaurus', ... 'yourmode',
] as const;
```

3. Document it in `docs/MODES.md`
4. (Optional) Add an example output to `examples/outputs/`

No TypeScript changes are required for prompt improvements — just edit the `.md` file.

---

## Adding Example Transcripts

1. Create an original, synthetic transcript in `examples/transcripts/`
2. Make it clearly labeled as a demo/example (not a real YouTube transcript)
3. Keep it under 600 words — just enough to demonstrate a real use case
4. (Optional) Add a pre-generated output to `examples/outputs/`

---

## Improving Documentation

All docs live in `docs/`. They're plain Markdown — edit and submit a PR.

---

## Opening a Pull Request

1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Run `npm test` — all tests must pass
4. Run `npm run build` — TypeScript must compile with no errors
5. Run `npm run doctor` — doctor should report OK
6. Open a PR with a clear description of what you changed and why
7. Link any relevant issues

---

## Code Style

- TypeScript strict mode
- ESM (`"type": "module"`) — use `.js` extensions in imports
- Small files, clear function names
- No raw stack traces for user errors — throw `DocuForgeError`
- Run `npm run lint` and `npm run format` before submitting

---

## Questions?

Open a [GitHub Discussion](https://github.com/AnkitParekh007/devdocs-forge-agent/discussions) or check [SUPPORT.md](SUPPORT.md).
