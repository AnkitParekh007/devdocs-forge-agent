---
id: modes
title: Modes
sidebar_position: 6
description: All 11 documentation output modes explained.
---

# Modes

Modes define what type of documentation is generated. Each mode is a Markdown prompt file in the `modes/` directory — no compiled code, fully customizable.

## Selecting a mode

```bash
npm run generate -- --file input/my-transcript.md --type <mode>
```

Or set the default in your config:

```yaml title="config/devdocs-forge-agent.yml"
project:
  default_output_type: "docusaurus"
```

## Available modes

### `docusaurus` — Docusaurus v3 documentation page

Generates a full Docusaurus page with YAML frontmatter, correct heading structure, and admonition-ready content. Also writes a copy to `docs/{slug}.md` ready for your Docusaurus project.

```bash
npm run generate -- --file input/tutorial.md --type docusaurus
```

**Output includes:** YAML frontmatter (`id`, `title`, `sidebar_label`, `tags`, `description`), prerequisites, step-by-step guide, code blocks, review checklist.

---

### `blog` — Developer blog post

Generates a blog post with a hook intro, background section, main content, code examples, key takeaways, and SEO tags.

```bash
npm run generate -- --file input/tutorial.md --type blog
```

---

### `docs` — General documentation page

General-purpose documentation page for any docs system. Includes overview, prerequisites, core concepts, step-by-step instructions, and troubleshooting.

```bash
npm run generate -- --file input/tutorial.md --type docs
```

---

### `gitbook` — GitBook documentation page

GitBook-formatted markdown with hint blocks (`{% hint style="info" %}`), standard heading structure, and page navigation hints.

```bash
npm run generate -- --file input/tutorial.md --type gitbook
```

---

### `readme` — GitHub README tutorial

README-style tutorial with badges placeholder, quick start commands, API reference table, and installation guide.

```bash
npm run generate -- --file input/tutorial.md --type readme
```

---

### `faq` — FAQ document

Categorized FAQs written the way developers actually ask questions: "How do I...?", "Why is my...?", "What happens when...?"

```bash
npm run generate -- --file input/tutorial.md --type faq
```

---

### `troubleshooting` — Troubleshooting guide

Structured guide with symptom → cause → fix format, diagnostic checklist, and escalation path.

```bash
npm run generate -- --file input/tutorial.md --type troubleshooting
```

---

### `lesson` — Course lesson page

Course lesson with learning objectives, prerequisites, core content, knowledge checks, and a hands-on exercise.

```bash
npm run generate -- --file input/tutorial.md --type lesson
```

---

### `social` — Social media summaries

LinkedIn post, X (Twitter) thread opener, and dev.to intro — all in one output.

```bash
npm run generate -- --file input/tutorial.md --type social
```

---

### `changelog` — Release notes

Keep A Changelog format with Added/Changed/Fixed/Removed sections.

```bash
npm run generate -- --file input/tutorial.md --type changelog
```

---

### `seo` — SEO metadata

Title tags, meta descriptions, Open Graph tags, Twitter Card tags, and keyword analysis.

```bash
npm run generate -- --file input/tutorial.md --type seo
```

---

## Adding a mode

1. Create `modes/yourmode.md` with prompt instructions for the AI
2. Add the mode name to `VALID_MODES` in `src/pipeline/prompt-builder.ts`
3. Test with `npm run generate -- --file examples/transcripts/angular-signals-tutorial.md --type yourmode`

Adding a mode requires zero TypeScript knowledge. See [GitHub Issue #3](https://github.com/AnkitParekh007/devdocs-forge-agent/issues/3) — Mermaid diagram mode is a good first contribution.

## Batch mode

Process all transcripts in a directory with the same mode:

```bash
npm run batch -- --dir input/
npm run batch -- --dir input/ --type blog
```
