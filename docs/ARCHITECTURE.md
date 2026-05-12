# Architecture

## System Overview

```
devdocs-forge-agent/
  CLI Layer          ← commander + commands
  Config Layer       ← YAML + Zod schema
  Pipeline Layer     ← parse → prompt → generate → write
  Provider Layer     ← mock / openai / anthropic / gemini
  Template Layer     ← output structure + frontmatter
  Utility Layer      ← logger, errors, fs-utils
```

## Data Flow

```
User runs: npm run generate -- --file input/tutorial.md --type docusaurus

1. src/cli/index.ts
   - Parses CLI args via commander
   - Loads .env via dotenv

2. src/cli/commands/generate.command.ts
   - Calls runGeneration()

3. src/pipeline/generation-pipeline.ts
   - loadConfig() → reads config/devdocs-forge-agent.yml
   - parseSource() → extracts title, content, sourceUrl
   - buildPrompt() → assembles AI prompt
   - getProvider() → returns the active Provider
   - provider.generate() → calls AI API (or mock)
   - writeOutput() → writes output folder

4. Output: output/{slug}-{date}/
   - index.md
   - metadata.json
   - review-checklist.md
   - source-summary.md
   - docs/{slug}.md (docusaurus only)
```

## Key Files

| File | Role |
|------|------|
| `src/cli/index.ts` | Entry point, command registration |
| `src/pipeline/generation-pipeline.ts` | Main orchestrator |
| `src/pipeline/prompt-builder.ts` | Assembles AI prompt from mode files |
| `src/pipeline/source-parser.ts` | Parses input transcript |
| `src/pipeline/output-writer.ts` | Writes all output files |
| `src/pipeline/markdown-validator.ts` | Validates output quality |
| `src/providers/provider-registry.ts` | Selects and instantiates provider |
| `src/providers/provider.types.ts` | Provider interface |
| `src/config/config.loader.ts` | Loads and validates YAML config |
| `src/config/config.schema.ts` | Zod schema for config |

## Provider Architecture

```typescript
interface Provider {
  name: string;
  model: string;
  generate(options: GenerateOptions): Promise<string>;
}
```

All providers use native `fetch` (Node 18+). No external AI SDK packages.
This keeps install size minimal and makes providers easy to audit.

## Prompt Architecture

The prompt sent to the AI is assembled in layers:

```
1. modes/_shared.md      ← Shared quality rules (always included)
2. modes/_profile.md     ← User's writing preferences
3. modes/{mode}.md       ← Mode-specific output instructions
4. Config context        ← Audience, tone, style from YAML
5. Source transcript     ← The actual content to document
6. Task instruction      ← Final instruction + checklist requirement
```

## Adding a New Command

1. Create `src/cli/commands/yourcommand.command.ts`
2. Register it in `src/cli/index.ts` using `program.command()`
3. Add an npm script to `package.json`
4. Document it in `docs/USAGE.md`

## Config Resolution Order

CLI flags → `.env` variables → `config/devdocs-forge-agent.yml` → built-in defaults
