# Contributor Guide

This is a detailed guide for contributors. For a quick overview, see [CONTRIBUTING.md](../CONTRIBUTING.md).

## Development Environment

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
cp .env.example .env
# Leave DEVDOCS_PROVIDER=mock for development
npm run doctor
npm test
npm run build
```

All tests should pass. Build should compile with no TypeScript errors.

## Branch Strategy

- `main` — stable, always works with `npm run doctor`
- `feat/your-feature` — feature branches
- `fix/your-fix` — bug fix branches

## TypeScript Conventions

- Strict mode is enabled (`"strict": true` in tsconfig.json)
- ESM modules — use `.js` extensions in all imports
- Small files — one concern per file
- Named exports preferred over default exports
- `DocuForgeError` for user-facing errors, not raw `throw new Error()`

## Testing

Tests live in `tests/`. Use Vitest:

```bash
npm test                                      # Run all tests
npx vitest run tests/config.test.ts           # Run one file
npx vitest watch                              # Watch mode
```

Write tests for:
- New validation logic
- New config options
- New provider behavior (use mock, not real API)
- Edge cases in parsing or output writing

## Adding a Provider (detailed)

1. Create `src/providers/yourprovider.provider.ts`
   - Implement the `Provider` interface from `provider.types.ts`
   - Use native `fetch` — no npm packages for AI SDKs
   - Read API key from `process.env.YOUR_PROVIDER_API_KEY`
   - Throw `DocuForgeError` with a helpful hint if the key is missing

2. Register in `src/providers/provider-registry.ts`

3. Add to `providers.command.ts` PROVIDERS array

4. Add env vars to `.env.example`

5. Document in `docs/PROVIDERS.md`

6. Add a test in `tests/provider-registry.test.ts`

## Adding a Mode (detailed)

1. Create `modes/yourmode.md`
   - Describe the output format clearly
   - Include example output structure
   - Specify any format-specific requirements (e.g., frontmatter)

2. Add to `VALID_MODES` in `src/pipeline/prompt-builder.ts`

3. Document in `docs/MODES.md`

4. (Optional) Add example output to `examples/outputs/`

## Pull Request Checklist

- [ ] `npm test` passes
- [ ] `npm run build` compiles with no errors
- [ ] `npm run doctor` shows no failures
- [ ] New code follows existing TypeScript conventions
- [ ] New mode or provider is documented
- [ ] Tests added for non-trivial changes
- [ ] No API keys in any committed file
- [ ] PR description explains what changed and why

## Commit Messages

Use conventional commits format:

```
feat: add Ollama provider for local LLMs
fix: handle empty input files in batch mode
docs: add Groq to PROVIDERS.md
test: add validator test for missing H1
refactor: extract prompt assembly to helper function
```
