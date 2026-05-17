# Recruiter and Hiring Manager Review Guide

This guide helps you evaluate devdocs-forge-agent as a portfolio project demonstrating AI developer tooling skills.

## What This Project Is

devdocs-forge-agent is a local-first TypeScript CLI that converts tutorial transcripts, demo recordings, and lesson notes into developer documentation. It uses a provider abstraction layer to support multiple AI backends (OpenAI, Anthropic, Gemini, or local mock).

It is not a SaaS product. It is not a proof-of-concept prototype. It is a working, testable, open-source CLI with a real user experience, a test suite, CI/CD, and a documentation site.

## How to Evaluate It in 5 Minutes

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
cp .env.example .env
npm run demo
```

This runs without any API key. You will see:
1. A doctor check confirming setup
2. Example transcripts copied to `input/`
3. A Docusaurus page generated from the Angular Signals transcript
4. Output validation

The output lands in `output/angular-signals-tutorial-{date}/` with 4-5 files.

## What the Code Demonstrates

### TypeScript and Node.js Fundamentals

| Skill | Where to Look |
|---|---|
| TypeScript strict mode + ESM | `tsconfig.json`, any file in `src/` |
| Zod schema validation | `src/config/config.schema.ts` |
| Commander.js CLI design | `src/cli/index.ts`, `src/cli/commands/` |
| Native `fetch` (no SDK bloat) | `src/providers/openai.provider.ts` |
| Error classes and user-facing messages | `src/utils/errors.ts` |

### Architecture and Design Patterns

| Pattern | Where |
|---|---|
| Provider abstraction (interface + registry) | `src/providers/provider.types.ts`, `provider-registry.ts` |
| Pipeline orchestration | `src/pipeline/generation-pipeline.ts` |
| Layered prompt assembly | `src/pipeline/prompt-builder.ts` |
| Config resolution (CLI → env → YAML → defaults) | `src/config/config.loader.ts` |
| Intake guard / validation pipeline | `src/intake/intake-validator.ts` |

### AI Integration

| Capability | Implementation |
|---|---|
| Multi-provider abstraction | One interface, four implementations |
| Prompt engineering | `modes/` folder — modular, human-editable prompt files |
| Output validation | `src/pipeline/markdown-validator.ts` |
| Mock provider for testing | `src/providers/mock.provider.ts` |

### Developer Experience

| DX Feature | Where |
|---|---|
| One-command demo | `npm run demo` → `scripts/demo.mjs` |
| Self-check command | `npm run doctor` |
| Human review checklists in every output | `modes/_shared.md` |
| Structured metadata output | `src/pipeline/output-writer.ts` |

### Testing

```bash
npm test
```

Nine test files covering: config validation, provider registry, markdown validation, tech video classification, transcript normalization, URL parsing.

### CI/CD

See `.github/workflows/ci.yml`:
- Runs on Ubuntu and macOS
- Tests on Node 22 and 24
- No secrets required for CI (mock mode)

## What to Look For in the Code

**Good signs:**
- `src/providers/provider.types.ts` — clean interface design with no leaky abstractions
- `src/pipeline/generation-pipeline.ts` — clear orchestration with single responsibility
- `modes/_shared.md` — prompt engineering as a first-class concern, human-editable
- `src/utils/errors.ts` — `DocuForgeError` with actionable messages, not raw stack traces
- `AGENTS.md` — thoughtful AI collaboration documentation

**Questions this project can answer:**
- How do you design a provider abstraction that makes adding a new AI backend a 50-line change?
- How do you build CLI tooling that works in CI without external dependencies?
- How do you structure prompt engineering so non-engineers can contribute?
- How do you handle the review gap in AI-generated content responsibly?

## Project Scale

| Metric | Value |
|---|---|
| TypeScript source files | ~25 |
| Test files | 9 |
| Lines of TypeScript | ~2,000 |
| Output modes | 11 |
| AI providers supported | 5 (including mock) |
| CLI commands | 10 |
| CI environments | Ubuntu + macOS × Node 22 + 24 |

## Asking the Author About It

If you want to go deeper, ask about:

1. Why native `fetch` instead of the official provider SDKs?
2. How does the intake guard prevent misuse without being paternalistic?
3. What would it take to add a streaming provider?
4. How does the prompt layering system work and what tradeoffs did it involve?
5. What is the most interesting test to write for an AI documentation generator?

These questions have specific, non-generic answers in the codebase.
