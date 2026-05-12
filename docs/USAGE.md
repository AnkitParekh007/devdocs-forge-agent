# Usage Guide

## All Commands

### `npm run init`

Creates config, directories, and copies profile template. Safe to run multiple times — never overwrites existing files.

```bash
npm run init
```

### `npm run doctor`

Validates your setup and prints a status report.

```bash
npm run doctor
```

Output:
```
devdocs-forge-agent doctor
──────────────────────────────────────
  OK   Node.js v20.11.0   >= 18 required
  OK   package.json
  OK   config/devdocs-forge-agent.yml
  WARN .env   Copy .env.example → .env
  OK   provider: mock
  OK   API key   not required in mock mode
  OK   input/
  OK   output/
  OK   modes/
  OK   examples/
```

### `npm run examples`

Copies example transcripts from `examples/transcripts/` to `input/`.

```bash
npm run examples
```

### `npm run generate`

Generates documentation from a transcript file.

```bash
# Default output type from config
npm run generate -- --file input/my-tutorial.md

# Specific output type
npm run generate -- --file input/my-tutorial.md --type docusaurus
npm run generate -- --file input/my-tutorial.md --type blog
npm run generate -- --file input/my-tutorial.md --type faq

# With source attribution (static URL — no validation)
npm run generate -- --file input/my-tutorial.md --type docs --source-url https://example.com/tutorial

# With video URL — runs Video Intake Guard before generation
npm run generate -- --url "https://youtube.com/watch?v=..." --file input/my-tutorial.md --type docusaurus

# Bypass low-confidence classification (only if you own the content)
npm run generate -- --url "https://youtube.com/watch?v=..." --file input/my-tutorial.md --force
```

**Flags:**
| Flag | Required | Description |
|------|----------|-------------|
| `--file` | Yes | Path to transcript file |
| `--type` | No | Output mode (default from config) |
| `--url` | No | Video URL — validates and classifies before generation; also used as `sourceUrl` |
| `--source-url` | No | Static source URL for attribution (use `--url` when validating a video) |
| `--force` | No | Bypass low-confidence classification warning (only if you own the content) |

### `devdocs-forge-agent inspect-url`

Inspects and classifies a video URL. No transcript required. Useful for checking whether a video will pass the intake guard before you run `generate`.

```bash
npm run devdocs-forge-agent -- inspect-url "https://youtube.com/watch?v=..."
```

Output includes:
- Platform and video ID
- YouTube metadata (title, channel, category, duration, tags) — requires `YOUTUBE_API_KEY`
- Tech classification score (0–100) with confidence level and signal breakdown

### `devdocs-forge-agent validate-source`

Validates a video URL + local transcript file together. Runs all intake checks and prints a detailed report.

```bash
npm run devdocs-forge-agent -- validate-source \
  --url "https://youtube.com/watch?v=..." \
  --file input/your-transcript.md
```

Output:
```
devdocs-forge-agent validate-source
──────────────────────────────────────
  OK   URL is valid (youtube)
  OK   Tech classification: 75/100   high confidence
  OK   Transcript: input/your-transcript.md   842 words

  ✓ Source is valid. Ready to generate.
  Run:
    npm run generate -- --url "..." --file "input/your-transcript.md" --type docusaurus
```

> **Note:** devdocs-forge-agent never scrapes YouTube transcripts. You must always provide your own transcript file with `--file`.

### `npm run batch`

Processes all `.md` and `.txt` files in a directory.

```bash
npm run batch -- --dir input/
npm run batch -- --dir input/ --type blog
```

### `npm run providers`

Lists all available providers and shows which is active.

```bash
npm run providers
```

### `npm run verify`

Validates generated documentation for common issues.

```bash
npm run verify
npm run verify -- --dir output/my-doc-2025-01-15/
```

Checks:
- H1 title present
- No empty sections
- No API keys in content
- Frontmatter present for docusaurus/gitbook types
- Review checklist present
- Minimum content length

### `npm test`

Runs the Vitest test suite.

```bash
npm test
```

### `npm run build`

Compiles TypeScript to `dist/`. Required for production use of the `devdocs-forge-agent` binary.

```bash
npm run build
```

---

## Input File Format

Input files are plain Markdown or text files. Add optional YAML frontmatter to include a source URL:

```markdown
---
source_url: https://example.com/original-tutorial
---

# Tutorial Title

Content goes here...
```

The `source_url` is included in attribution sections of the generated output.

---

## Output Structure

Every generation creates:

```
output/{slug}-{YYYY-MM-DD}/
  index.md              ← Main generated documentation
  metadata.json         ← Title, provider, model, word count, warnings
  review-checklist.md   ← Review this before publishing
  source-summary.md     ← Summary of source usage
  docs/{slug}.md        ← (docusaurus mode only)
  blog/{slug}.md        ← (blog mode only)
```
