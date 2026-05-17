# Output Contract

Every `generate` or `batch` run produces a timestamped output directory with a guaranteed file set. This document defines what those files contain and what consumers can rely on.

## Directory Structure

```
output/{slug}-{YYYY-MM-DD}/
├── index.md              ← Primary generated documentation
├── metadata.json         ← Machine-readable generation record
├── review-checklist.md   ← Human review tasks
├── source-summary.md     ← Source attribution and stats
└── docs/                 ← (docusaurus mode only)
    └── {slug}.md         ← Docusaurus-ready copy with YAML frontmatter
```

The `docs/` subdirectory is only created when `--type docusaurus` is used.

## File Specifications

### `index.md`

The primary generated document. Contains:

- Markdown body matching the requested output mode
- Source attribution comment at the bottom
- A "Review Checklist" section embedded in the document

**Consumers:** human review, Git history, docs site ingestion.

### `metadata.json`

Machine-readable generation record. Schema:

```typescript
{
  provider: string;           // "mock" | "openai" | "anthropic" | "gemini" | "ollama"
  model: string;              // exact model ID used
  mode: string;               // output mode (docusaurus, blog, faq, etc.)
  sourceFile: string;         // path to input transcript
  sourceUrl: string | null;   // video URL if --url was provided
  title: string;              // extracted or inferred title
  slug: string;               // URL-safe slug derived from title
  wordCount: number;          // word count of input transcript
  outputWordCount: number;    // word count of generated document
  generatedAt: string;        // ISO 8601 timestamp
  outputDir: string;          // path to this output directory
  reviewRequired: true;       // always true — never false
  intakeGuard: {
    urlValidated: boolean;
    techClassificationScore: number | null;  // 0.0–1.0 or null if no URL
    transcriptWordCount: number;
    passed: boolean;
  };
}
```

**Consumers:** `npm run verify`, CI pipelines, audit logs.

### `review-checklist.md`

A Markdown checklist of tasks a human reviewer should complete before publishing. Generated based on the output mode and source content.

**Consumers:** human reviewer, PR description templates.

### `source-summary.md`

Short summary of the source used in generation:

- Title
- Source URL (if provided)
- Word count
- Slug
- Generation timestamp

**Consumers:** attribution compliance, provenance tracking.

### `docs/{slug}.md` (docusaurus mode only)

A copy of the generated document with YAML frontmatter prepended, ready to copy into a Docusaurus `docs/` directory.

Frontmatter fields guaranteed: `id`, `title`, `sidebar_label`, `sidebar_position`, `description`, `tags`.

## Guarantees

| Property | Guarantee |
|---|---|
| `reviewRequired` in metadata.json | Always `true` — never omitted or `false` |
| `review-checklist.md` | Always present in every output directory |
| `metadata.json` | Always valid JSON, always present |
| `index.md` | Always present, always Markdown |
| File encoding | UTF-8 |
| Line endings | LF (`\n`) |

## What Is Not Guaranteed

- Content accuracy — AI output is a first draft; always review
- Code correctness — all generated code should be tested before use
- Completeness — transcripts with insufficient content may produce short outputs
- Stability of `metadata.json` schema across major versions — check CHANGELOG.md

## Validation

Run `npm run verify` to validate all output directories against this contract. The verify command checks:

- Required files are present
- `metadata.json` is valid JSON with required fields
- `index.md` contains a review checklist section
- No empty output files

See `src/cli/commands/verify.command.ts` for the implementation.
