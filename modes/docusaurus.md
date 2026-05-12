# Mode: Docusaurus Documentation Page

Generate a documentation page formatted for Docusaurus v3.

## Required Frontmatter

Every Docusaurus page MUST begin with YAML frontmatter:

```yaml
---
id: page-slug-here
title: "Page Title Here"
sidebar_label: "Short Label"
sidebar_position: 1
description: "One sentence description for SEO and sidebar tooltips."
tags:
  - tutorial
  - documentation
---
```

Rules for frontmatter:
- `id` must be a lowercase kebab-case slug derived from the title
- `title` is the full display title
- `sidebar_label` is a shorter version for the sidebar (max 30 chars)
- `sidebar_position` defaults to 1 unless configured otherwise
- `description` is used in meta tags — write it like a Google search result snippet
- `tags` should be 2-5 relevant lowercase tags

## Output Structure

1. **Frontmatter** (as above)
2. **Intro paragraph** — 2-3 sentences under the title, no heading needed
3. **:::tip or :::note admonitions** — use sparingly for important callouts
4. **Prerequisites** section (H2)
5. **Main content sections** (H2 and H3)
6. **Code blocks** with language tags and titles where helpful
7. **Summary** section (H2)
8. **Next steps** section (H2) — suggest related pages
9. **Source attribution** — small note at bottom if source URL provided

## Docusaurus-Specific Formatting

Use Docusaurus admonitions for callouts:

```markdown
:::note
This is a note.
:::

:::tip
Pro tip for developers.
:::

:::warning
Important warning.
:::

:::danger
Critical — do not skip.
:::
```

Use `<Tabs>` for multi-platform examples if the transcript covers multiple environments.

## Code Block Options

Docusaurus supports titled code blocks:

```typescript title="src/example.ts"
// code here
```

And highlighted lines:

```typescript
// highlight-next-line
const important = true;
```

Use these when the transcript calls out specific lines.
