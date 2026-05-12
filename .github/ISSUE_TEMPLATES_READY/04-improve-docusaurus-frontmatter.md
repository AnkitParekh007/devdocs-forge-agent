---
title: "Improve Docusaurus frontmatter customization"
labels: ["good first issue", "docusaurus", "documentation"]
---

## Summary

The Docusaurus output mode generates YAML frontmatter with `id`, `title`, `sidebar_label`, `sidebar_position`, `description`, and `tags`. This issue improves the customization options so users can control more frontmatter fields from their config or transcript frontmatter.

## Current Behavior

Frontmatter is generated in `src/templates/docusaurus-frontmatter.ts` using:
- `config.docusaurus.sidebar_position` (from YAML config)
- `config.docusaurus.tags` (from YAML config)
- `source.title` (from transcript H1)
- A slugified version of the title for `id` and `sidebar_label`

## Desired Behavior

Users should be able to override specific frontmatter fields from:
1. Their transcript's YAML frontmatter (e.g., `docusaurus_slug: custom-slug`)
2. The `docusaurus:` section in `config/devdocs-forge-agent.yml`

## Files to Touch

| File | Change |
|------|--------|
| `src/config/config.schema.ts` | Extend `docusaurus` config section with `custom_edit_url`, `draft`, `pagination_label` |
| `src/templates/docusaurus-frontmatter.ts` | Read new config fields and apply them |
| `src/pipeline/source-parser.ts` | Extract `docusaurus_slug` and `docusaurus_description` from transcript frontmatter |
| `config/devdocs-forge-agent.example.yml` | Document new options |
| `tests/` | Add tests for new frontmatter fields |
| `docs/MODES.md` | Document customization options |

## Acceptance Criteria

- [ ] `custom_edit_url` in config → appears in frontmatter when set
- [ ] `draft: true` in config → sets `draft: true` in frontmatter
- [ ] Transcript can override `sidebar_position` via `sidebar_position:` frontmatter key
- [ ] Tags from config and transcript frontmatter are merged (not replaced)
- [ ] `docs/MODES.md` updated with all customization options
- [ ] `config/devdocs-forge-agent.example.yml` updated
- [ ] Tests added for new frontmatter fields
- [ ] All existing tests still pass

## Difficulty

Low to medium — mainly TypeScript config/template work with clear file paths.

## How to Get Started

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
# Read src/templates/docusaurus-frontmatter.ts — it's < 50 lines
# Read src/config/config.schema.ts — extend the docusaurus section
npm test
```
