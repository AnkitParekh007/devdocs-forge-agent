---
id: cli-commands
title: CLI Commands
sidebar_position: 9
description: Full reference for all devdocs-forge-agent CLI commands.
---

# CLI Commands

## `npm run doctor`

Validates your setup. Run this first whenever something isn't working.

```bash
npm run doctor
```

Checks: Node.js version, package.json, config file, .env, provider, API keys, YOUTUBE_API_KEY, directories.

---

## `npm run init`

Creates missing files and directories. Safe to run multiple times — never overwrites existing files.

```bash
npm run init
```

Creates: `config/devdocs-forge-agent.yml`, `input/`, `output/`, `modes/_profile.md`

---

## `npm run examples`

Copies example transcripts from `examples/transcripts/` to `input/`.

```bash
npm run examples
```

---

## `npm run demo`

One-command demo. Runs in mock mode regardless of your `.env` setting.

```bash
npm run demo
```

Runs: doctor → examples → generate (Angular Signals tutorial, docusaurus) → verify

---

## `npm run generate`

Generates documentation from a transcript file.

```bash
npm run generate -- --file <path> [options]
```

**Flags:**

| Flag | Required | Description |
|------|----------|-------------|
| `--file <path>` | Yes | Path to transcript file |
| `--type <mode>` | No | Output mode (default from config) |
| `--url <url>` | No | Video URL — runs intake guard; used as `sourceUrl` |
| `--source-url <url>` | No | Static source URL for attribution |
| `--force` | No | Bypass low-confidence classification |

**Examples:**

```bash
# Basic generation
npm run generate -- --file input/my-tutorial.md --type docusaurus

# With video URL (runs intake guard)
npm run generate -- --url "https://youtube.com/watch?v=..." --file input/my-tutorial.md

# Force bypass for low-confidence classification
npm run generate -- --url "https://youtube.com/watch?v=..." --file input/my-tutorial.md --force

# All mode types
npm run generate -- --file input/tutorial.md --type blog
npm run generate -- --file input/tutorial.md --type faq
npm run generate -- --file input/tutorial.md --type readme
npm run generate -- --file input/tutorial.md --type troubleshooting
npm run generate -- --file input/tutorial.md --type lesson
npm run generate -- --file input/tutorial.md --type social
npm run generate -- --file input/tutorial.md --type changelog
npm run generate -- --file input/tutorial.md --type seo
npm run generate -- --file input/tutorial.md --type gitbook
```

---

## `npm run batch`

Processes all `.md` and `.txt` files in a directory.

```bash
npm run batch -- --dir input/
npm run batch -- --dir input/ --type blog
```

---

## `npm run verify`

Validates generated documentation for common quality issues.

```bash
npm run verify
npm run verify -- --dir output/my-doc-2026-05-13/
```

---

## `npm run providers`

Lists available providers and shows which is currently active.

```bash
npm run providers
```

---

## `npm run devdocs-forge-agent -- inspect-url`

Inspects and classifies a video URL. No transcript required.

```bash
npm run devdocs-forge-agent -- inspect-url "https://youtube.com/watch?v=..."
```

---

## `npm run devdocs-forge-agent -- validate-source`

Validates a video URL + local transcript file together.

```bash
npm run devdocs-forge-agent -- validate-source \
  --url "https://youtube.com/watch?v=..." \
  --file input/my-transcript.md
```

---

## `npm test`

Runs the Vitest test suite (54 tests).

```bash
npm test
```

---

## `npm run build`

Compiles TypeScript to `dist/`. Required for production use of the global `devdocs-forge-agent` binary.

```bash
npm run build
```

---

## Input file format

Transcript files are plain Markdown or text. Add YAML frontmatter to include a source URL:

```markdown
---
source_url: https://example.com/original-tutorial
---

# Tutorial Title

Content goes here...
```
