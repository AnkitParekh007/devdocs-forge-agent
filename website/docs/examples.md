---
id: examples
title: Examples
sidebar_position: 10
description: Real workflow examples and sample outputs for devdocs-forge-agent.
---

# Examples

## Run the built-in demo

The fastest way to see devdocs-forge-agent in action. Runs entirely in mock mode — no API key needed.

```bash
npm run demo
```

This runs: `doctor` → `examples` → `generate` (Angular Signals tutorial, docusaurus) → `verify`

Output lands in `output/angular-signals-reactive-state-YYYY-MM-DD/`.

---

## Example 1: Docusaurus doc from a tutorial transcript

**Input:** `examples/transcripts/angular-signals-tutorial.md`

```bash
npm run generate -- \
  --file examples/transcripts/angular-signals-tutorial.md \
  --type docusaurus
```

**Output:** `output/angular-signals-reactive-state-2026-05-13/index.md`

```markdown
---
id: angular-signals-reactive-state
title: "Angular Signals: Reactive State"
sidebar_label: "Angular Signals"
sidebar_position: 1
tags:
  - tutorial
  - angular
  - signals
description: "Learn how Angular Signals provide reactive state management..."
---

# Angular Signals: Reactive State

## Prerequisites

- Angular 17+ installed
- Basic understanding of components and services

## What you'll learn

...
```

A copy is also written to `output/.../docs/angular-signals-reactive-state.md` — drop it directly into your Docusaurus `docs/` folder.

---

## Example 2: Blog post from the same transcript

```bash
npm run generate -- \
  --file examples/transcripts/angular-signals-tutorial.md \
  --type blog
```

**Output:** `output/angular-signals-reactive-state-2026-05-13/index.md`

The blog output includes a hook intro, code examples with explanations, and a "Key Takeaways" section.

---

## Example 3: FAQ document

```bash
npm run generate -- \
  --file input/my-transcript.md \
  --type faq
```

Questions are written as developers actually ask them:
- "How do I create a signal in Angular?"
- "Why is my computed signal not updating?"
- "What happens when I use effect() inside a service?"

---

## Example 4: With a video URL (attribution + classification)

```bash
npm run generate -- \
  --url "https://youtube.com/watch?v=..." \
  --file input/my-transcript.md \
  --type docusaurus
```

The `--url` flag:
1. Validates the URL (must be youtube.com, youtu.be, or vimeo.com)
2. Fetches video metadata (requires `YOUTUBE_API_KEY`)
3. Classifies whether it's a technical tutorial
4. Uses the URL as `sourceUrl` in the output metadata

The generated `metadata.json` includes:
```json
{
  "sourceUrl": "https://youtube.com/watch?v=...",
  "outputType": "docusaurus"
}
```

---

## Example 5: Batch processing

Process all transcripts in a directory at once:

```bash
# Copy examples to input/
npm run examples

# Generate docs for all files in input/
npm run batch -- --dir input/

# Generate blog posts for all files
npm run batch -- --dir input/ --type blog
```

Each file gets its own timestamped output directory.

---

## Example 6: SEO metadata

```bash
npm run generate -- \
  --file input/my-transcript.md \
  --type seo
```

Output includes:
- `<title>` tag (50–60 characters)
- Meta description (150–160 characters)
- Open Graph tags (`og:title`, `og:description`, `og:type`)
- Twitter Card tags
- Primary keyword, secondary keywords, long-tail keywords

---

## Example 7: Release notes from a "what's new" video

```bash
npm run generate -- \
  --file input/release-overview.md \
  --type changelog
```

Output follows [Keep A Changelog](https://keepachangelog.com/) format:

```markdown
## [Unreleased]

### Added
- ...

### Changed
- ...

### Fixed
- ...
```

---

## Validate output

Always run verify after generating:

```bash
npm run verify

# Or validate a specific run
npm run verify -- --dir output/angular-signals-reactive-state-2026-05-13/
```

---

## Inspect a video URL without a transcript

```bash
npm run devdocs-forge-agent -- inspect-url "https://youtube.com/watch?v=..."
```

Shows: URL validity, video ID, title, category, duration, tech classification score, and positive/negative signals.

---

## Validate a URL + transcript pair

```bash
npm run devdocs-forge-agent -- validate-source \
  --url "https://youtube.com/watch?v=..." \
  --file input/my-transcript.md
```

Output:
```
devdocs-forge-agent validate-source
──────────────────────────────────────
  OK   URL is valid (youtube)
  OK   Tech classification: 75/100   high confidence
  OK   Transcript: input/my-transcript.md   842 words

  ✓ Source is valid. Ready to generate.
```
