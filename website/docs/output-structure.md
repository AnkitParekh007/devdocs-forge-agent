---
id: output-structure
title: Output Structure
sidebar_position: 8
description: What files are generated and what each one contains.
---

# Output Structure

Every generation run creates a timestamped directory in `output/`.

## Directory layout

```
output/
└── {slug}-{YYYY-MM-DD}/
    ├── index.md              ← Main generated documentation
    ├── metadata.json         ← Run metadata
    ├── review-checklist.md   ← Human review tasks
    ├── source-summary.md     ← Source stats
    └── docs/
        └── {slug}.md         ← Docusaurus-ready copy (docusaurus mode only)
```

For `--type blog`, a `blog/` directory is also created with a blog-ready copy.

## File descriptions

### `index.md`

The main generated documentation. This is the file you'll edit and publish. Content varies by output mode:

- `docusaurus` — full YAML frontmatter + doc structure
- `blog` — blog post with hook, code examples, takeaways
- `faq` — categorized FAQ questions and answers
- etc.

### `metadata.json`

Machine-readable record of the generation run:

```json
{
  "title": "Angular Signals: Reactive State",
  "slug": "angular-signals-reactive-state",
  "sourceFile": "examples/transcripts/angular-signals-tutorial.md",
  "sourceUrl": "https://youtube.com/watch?v=...",
  "outputType": "docusaurus",
  "provider": "openai",
  "model": "gpt-4.1-mini",
  "wordCount": 1247,
  "generatedAt": "2026-05-13T10:00:00.000Z",
  "warnings": []
}
```

If `--force` was used with a video URL, `force_used: true` appears in `warnings`.

### `review-checklist.md`

A checklist of review tasks to complete before publishing. Always review this file — AI can hallucinate.

Typical checks:
- [ ] All facts verified against the source transcript
- [ ] Code snippets tested locally
- [ ] No API keys, secrets, or credentials in the output
- [ ] Source attribution included if required
- [ ] Headings match the transcript structure

### `source-summary.md`

Summary of the source transcript:

```markdown
# Source Summary

- **File:** examples/transcripts/angular-signals-tutorial.md
- **Title:** Angular Signals: Reactive State
- **Word count:** 444 words
- **Source URL:** https://...
- **Slug:** angular-signals-reactive-state
```

### `docs/{slug}.md` (docusaurus mode)

An identical copy of `index.md` placed in `docs/` subdirectory for easy copying to a Docusaurus project. Includes YAML frontmatter:

```markdown
---
id: angular-signals-reactive-state
title: "Angular Signals: Reactive State"
sidebar_label: "Angular Signals"
sidebar_position: 1
tags:
  - tutorial
  - documentation
---
```

## Validate output

```bash
npm run verify
```

Checks all outputs for:
- H1 title present
- No empty sections
- No API keys in content
- YAML frontmatter for Docusaurus/GitBook types
- Minimum content length

```bash
# Validate a specific output directory
npm run verify -- --dir output/my-doc-2026-05-13/
```
