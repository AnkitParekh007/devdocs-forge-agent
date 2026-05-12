# Modes Guide

Modes define what type of documentation devdocs-forge-agent generates.
Each mode is a Markdown prompt file in the `modes/` directory.

## Available Modes

### `docusaurus` — Docusaurus v3 Documentation Page

Generates a full Docusaurus doc page with YAML frontmatter (`id`, `title`, `sidebar_label`, `tags`, `description`), proper heading structure, admonition support, and titled code blocks.

```bash
npm run generate -- --file input/tutorial.md --type docusaurus
```

### `blog` — Developer Blog Post

Generates a blog post with hook intro, background, main content sections, code examples, key takeaways, and SEO tag suggestions.

```bash
npm run generate -- --file input/tutorial.md --type blog
```

### `docs` — General Documentation Page

Generates a general-purpose documentation page suitable for any docs system. Includes overview, prerequisites, core concepts, step-by-step instructions, config reference, and troubleshooting.

```bash
npm run generate -- --file input/tutorial.md --type docs
```

### `gitbook` — GitBook Documentation Page

Generates GitBook-formatted markdown with hint blocks (`{% hint style="info" %}`), standard heading structure, and page navigation hints.

```bash
npm run generate -- --file input/tutorial.md --type gitbook
```

### `readme` — GitHub README Tutorial

Generates a README-style tutorial with badges, quick start commands, API reference table, and installation guide.

```bash
npm run generate -- --file input/tutorial.md --type readme
```

### `faq` — FAQ Document

Generates categorized FAQs written the way developers actually ask questions ("How do I...?", "Why is my...?").

```bash
npm run generate -- --file input/tutorial.md --type faq
```

### `troubleshooting` — Troubleshooting Guide

Generates a structured guide with symptom → cause → fix format, diagnostic checklist, and escalation path.

```bash
npm run generate -- --file input/tutorial.md --type troubleshooting
```

### `lesson` — Course Lesson Page

Generates a course lesson with learning objectives, prerequisites, core content, knowledge checks, and a hands-on exercise.

```bash
npm run generate -- --file input/tutorial.md --type lesson
```

### `social` — Social Media Summaries

Generates LinkedIn post, X (Twitter) thread, and dev.to intro in a single output.

```bash
npm run generate -- --file input/tutorial.md --type social
```

### `changelog` — Release Notes

Generates Keep A Changelog format release notes with Added/Changed/Fixed/Removed sections.

```bash
npm run generate -- --file input/tutorial.md --type changelog
```

### `seo` — SEO Metadata

Generates title tags, meta descriptions, Open Graph tags, Twitter Card tags, and keyword analysis.

```bash
npm run generate -- --file input/tutorial.md --type seo
```

---

## Adding a Mode

1. Create `modes/yourmode.md` with clear instructions for the AI
2. Add the mode name to `VALID_MODES` in `src/pipeline/prompt-builder.ts`
3. Document it above
4. Add an example output to `examples/outputs/`

Mode files are plain Markdown — no TypeScript knowledge needed to add or improve them.

---

## Customizing Your Profile

Edit `modes/_profile.md` (created by `npm run init`) to set:
- Your target audience
- Writing tone
- Preferred output format
- Branding terms
- SEO preferences

Your profile is applied to every generation run.
