---
id: contributing
title: Contributing
sidebar_position: 11
description: How to contribute to devdocs-forge-agent.
---

# Contributing

devdocs-forge-agent is open source and contributions are welcome. This page covers how to get started.

## Good first issues

These are well-scoped tasks that don't require deep knowledge of the codebase:

| Issue | Description | Effort |
|-------|-------------|--------|
| [#1 Ollama provider](https://github.com/AnkitParekh007/devdocs-forge-agent/issues/1) | Add local LLM support via Ollama | Small |
| [#2 OpenRouter provider](https://github.com/AnkitParekh007/devdocs-forge-agent/issues/2) | Add OpenRouter.ai as a provider | Small |
| [#3 Mermaid diagram mode](https://github.com/AnkitParekh007/devdocs-forge-agent/issues/3) | New output mode for Mermaid diagrams | Small |
| [#4 Improve Docusaurus frontmatter](https://github.com/AnkitParekh007/devdocs-forge-agent/issues/4) | Smarter tag extraction from content | Medium |
| [#5 Minimal web preview](https://github.com/AnkitParekh007/devdocs-forge-agent/issues/5) | Browser preview of generated docs | Medium |

## Development setup

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
cp .env.example .env
npm run init
npm run doctor
```

## Running tests

```bash
npm test
```

The test suite uses Vitest and covers: URL parsing, tech video classification, transcript validation, config loading, output writing, and more.

## Adding an output mode

This is the easiest contribution — no TypeScript required.

1. Create `modes/yourmode.md` with AI prompt instructions
2. Add the mode name to `VALID_MODES` in `src/pipeline/prompt-builder.ts`
3. Test it:
   ```bash
   npm run generate -- \
     --file examples/transcripts/angular-signals-tutorial.md \
     --type yourmode
   ```

See the existing files in `modes/` for reference.

## Adding a provider

Each provider implements a small interface:

```typescript
export interface Provider {
  readonly name: string;
  readonly model: string;
  generate(options: GenerateOptions): Promise<string>;
}
```

Steps:
1. Create `src/providers/yourprovider.provider.ts`
2. Implement the `Provider` interface using native `fetch` (no SDK packages)
3. Register it in `src/providers/provider-registry.ts`
4. Add env var docs to `.env.example`
5. Add a test in `tests/`

## Code conventions

- TypeScript with strict mode
- ESM modules — use `.js` extensions in imports
- `DocuForgeError` for user-facing errors (no raw stack traces)
- `logger.ok / warn / fail / info` for all CLI output
- No external AI SDK packages — use native `fetch`

## Submitting a PR

1. Fork the repo
2. Create a branch: `git checkout -b feat/my-feature`
3. Make changes, add tests
4. Run `npm test` and `npm run build`
5. Open a PR against `main`

Please keep PRs focused — one feature or fix per PR.

## Questions

Open a [GitHub Discussion](https://github.com/AnkitParekh007/devdocs-forge-agent/discussions) or leave a comment on an issue.
