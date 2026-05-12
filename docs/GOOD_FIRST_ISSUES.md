# Good First Issues

These are well-scoped, contributor-friendly tasks for developers new to the devdocs-forge-agent codebase.

Each issue has a clear scope, file list, and acceptance criteria. No previous contributions required.

---

## How to Pick an Issue

1. Browse the list below
2. Check the [GitHub Issues](https://github.com/AnkitParekh007/devdocs-forge-agent/issues) page for what's already in progress
3. Comment on the issue before starting — this reserves it and lets maintainers answer questions
4. Fork, branch, and open a PR when ready

See [CONTRIBUTING.md](../CONTRIBUTING.md) for setup instructions.

---

## Available Issues

### 1. Add Ollama Provider

**Title:** Add Ollama provider for local LLM generation
**Labels:** `good first issue`, `provider`, `enhancement`
**Difficulty:** Low (~80 lines of new TypeScript)

Add support for running devdocs-forge-agent with Ollama (Llama 3, Mistral, Phi) entirely locally — no API key, no internet connection needed.

Key files:
- Create `src/providers/ollama.provider.ts`
- Update `src/providers/provider-registry.ts`
- Update `docs/PROVIDERS.md`

Full issue: [.github/ISSUE_TEMPLATES_READY/01-add-ollama-provider.md](../.github/ISSUE_TEMPLATES_READY/01-add-ollama-provider.md)

---

### 2. Add OpenRouter Provider

**Title:** Add OpenRouter provider support
**Labels:** `good first issue`, `provider`, `enhancement`
**Difficulty:** Low (~60 lines, very similar to OpenAI provider)

OpenRouter provides a unified API for 100+ models. Since the request format is OpenAI-compatible, this is a very small change.

Key files:
- Create `src/providers/openrouter.provider.ts`
- Update `src/providers/provider-registry.ts`
- Update `docs/PROVIDERS.md`

Full issue: [.github/ISSUE_TEMPLATES_READY/02-add-openrouter-provider.md](../.github/ISSUE_TEMPLATES_READY/02-add-openrouter-provider.md)

---

### 3. Add Mermaid Diagram Generation Mode

**Title:** Add Mermaid diagram generation mode
**Labels:** `good first issue`, `mode`, `documentation`
**Difficulty:** Low (mostly writing a good prompt file, no TypeScript expertise required)

Add a `--type diagram` mode that generates Mermaid flowcharts, sequence diagrams, and architecture diagrams from transcript content.

Key files:
- Create `modes/diagram.md` (prompt fragment)
- Add `'diagram'` to `VALID_MODES` in `src/pipeline/prompt-builder.ts`

Full issue: [.github/ISSUE_TEMPLATES_READY/03-add-mermaid-diagram-mode.md](../.github/ISSUE_TEMPLATES_READY/03-add-mermaid-diagram-mode.md)

---

### 4. Improve Docusaurus Frontmatter Customization

**Title:** Improve Docusaurus frontmatter customization
**Labels:** `good first issue`, `docusaurus`, `documentation`
**Difficulty:** Low to medium (TypeScript config + template work)

Allow users to customize more Docusaurus frontmatter fields from config and transcript frontmatter (e.g., `custom_edit_url`, `draft`, `pagination_label`, tag merging).

Key files:
- `src/config/config.schema.ts`
- `src/templates/docusaurus-frontmatter.ts`

Full issue: [.github/ISSUE_TEMPLATES_READY/04-improve-docusaurus-frontmatter.md](../.github/ISSUE_TEMPLATES_READY/04-improve-docusaurus-frontmatter.md)

---

### 5. Build Minimal Local Web Preview

**Title:** Build minimal local web preview for generated docs
**Labels:** `good first issue`, `frontend`, `enhancement`
**Difficulty:** Medium (Node.js HTTP server + Markdown rendering)

Add `npm run preview` to serve generated Markdown files as a readable local HTML preview before publishing to Docusaurus or GitBook.

Key files:
- Create `src/cli/commands/preview.command.ts`
- Register in `src/cli/index.ts`

Full issue: [.github/ISSUE_TEMPLATES_READY/05-build-minimal-web-preview.md](../.github/ISSUE_TEMPLATES_READY/05-build-minimal-web-preview.md)

---

## Creating These as GitHub Issues

If you are the maintainer, use GitHub CLI to create these issues:

```bash
gh issue create \
  --title "Add Ollama provider for local LLM generation" \
  --body-file ".github/ISSUE_TEMPLATES_READY/01-add-ollama-provider.md" \
  --label "good first issue,provider,enhancement"

gh issue create \
  --title "Add OpenRouter provider support" \
  --body-file ".github/ISSUE_TEMPLATES_READY/02-add-openrouter-provider.md" \
  --label "good first issue,provider,enhancement"

gh issue create \
  --title "Add Mermaid diagram generation mode" \
  --body-file ".github/ISSUE_TEMPLATES_READY/03-add-mermaid-diagram-mode.md" \
  --label "good first issue,mode,documentation"

gh issue create \
  --title "Improve Docusaurus frontmatter customization" \
  --body-file ".github/ISSUE_TEMPLATES_READY/04-improve-docusaurus-frontmatter.md" \
  --label "good first issue,docusaurus,documentation"

gh issue create \
  --title "Build minimal local web preview for generated docs" \
  --body-file ".github/ISSUE_TEMPLATES_READY/05-build-minimal-web-preview.md" \
  --label "good first issue,frontend,enhancement"
```

> Note: GitHub labels must exist before using `--label`. Create them first in the Labels settings page or with `gh label create "good first issue" --color "#7057ff"`.
