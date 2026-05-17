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

### 1. Add OpenRouter Provider

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

### 2. Add Mermaid Diagram Generation Mode

**Title:** Add Mermaid diagram generation mode
**Labels:** `good first issue`, `mode`, `documentation`
**Difficulty:** Low (mostly writing a good prompt file, no TypeScript expertise required)

Add a `--type diagram` mode that generates Mermaid flowcharts, sequence diagrams, and architecture diagrams from transcript content.

Key files:
- Create `modes/diagram.md` (prompt fragment)
- Add `'diagram'` to `VALID_MODES` in `src/pipeline/prompt-builder.ts`

Full issue: [.github/ISSUE_TEMPLATES_READY/03-add-mermaid-diagram-mode.md](../.github/ISSUE_TEMPLATES_READY/03-add-mermaid-diagram-mode.md)

---

### 3. Improve Docusaurus Frontmatter Customization

**Title:** Improve Docusaurus frontmatter customization
**Labels:** `good first issue`, `docusaurus`, `documentation`
**Difficulty:** Low to medium (TypeScript config + template work)

Allow users to customize more Docusaurus frontmatter fields from config and transcript frontmatter (e.g., `custom_edit_url`, `draft`, `pagination_label`, tag merging).

Key files:
- `src/config/config.schema.ts`
- `src/templates/docusaurus-frontmatter.ts`

Full issue: [.github/ISSUE_TEMPLATES_READY/04-improve-docusaurus-frontmatter.md](../.github/ISSUE_TEMPLATES_READY/04-improve-docusaurus-frontmatter.md)

---

### 4. Build Minimal Local Web Preview

**Title:** Build minimal local web preview for generated docs
**Labels:** `good first issue`, `frontend`, `enhancement`
**Difficulty:** Medium (Node.js HTTP server + Markdown rendering)

Add `npm run preview` to serve generated Markdown files as a readable local HTML preview before publishing to Docusaurus or GitBook.

Key files:
- Create `src/cli/commands/preview.command.ts`
- Register in `src/cli/index.ts`

Full issue: [.github/ISSUE_TEMPLATES_READY/05-build-minimal-web-preview.md](../.github/ISSUE_TEMPLATES_READY/05-build-minimal-web-preview.md)

---

### 5. GitBook Export Polish

**Title:** Polish GitBook output mode formatting
**Labels:** `good first issue`, `mode`, `documentation`
**Difficulty:** Low (prompt engineering + template work, minimal TypeScript)

The `--type gitbook` mode generates valid Markdown but misses some GitBook-specific conventions: hint blocks (`{% hint style="info" %}`), page-ref cards, and tab blocks. Improve the mode prompt and add an example output.

Key files:
- `modes/gitbook.md` — update prompt with GitBook-specific formatting instructions
- `examples/` — add a sample GitBook output showing hint blocks
- `docs/MODES.md` — document the GitBook-specific output features

Acceptance criteria:
- Generated GitBook output uses `{% hint %}` blocks for notes and warnings
- Output renders correctly in a local GitBook project
- Example output added to `examples/`

---

### 6. Docusaurus Sidebar Helper

**Title:** Add Docusaurus sidebar.js snippet generator
**Labels:** `good first issue`, `docusaurus`, `enhancement`
**Difficulty:** Low to medium (TypeScript, file reading)

After running `npm run batch`, users manually update their Docusaurus `sidebars.js`. Add a command that reads the `output/` directory and prints a ready-to-paste sidebar config snippet.

Key files:
- Create `src/cli/commands/sidebar.command.ts`
- Register in `src/cli/index.ts`
- Add `npm run sidebar` script to `package.json`

Acceptance criteria:
- `npm run sidebar` prints a valid Docusaurus sidebar config snippet to stdout
- Snippet includes all `docs/{slug}.md` files found in `output/`
- Works with zero additional config

---

### 7. Transcript Chunking for Long Videos

**Title:** Add transcript chunking for long transcripts
**Labels:** `good first issue`, `pipeline`, `enhancement`
**Difficulty:** Medium (~100 lines, involves pipeline changes)

Long transcripts (>8,000 tokens) exceed typical LLM context windows. Add a chunking strategy that splits long transcripts into sections, generates per-section docs, and merges them into a single output.

Key files:
- Create `src/pipeline/transcript-chunker.ts`
- Update `src/pipeline/generation-pipeline.ts` to call chunker when transcript exceeds a threshold
- Add chunking config option to `src/config/config.schema.ts`

Acceptance criteria:
- Transcripts under the threshold are processed unchanged
- Transcripts over the threshold are split at section boundaries (H2 headings)
- Merged output is a single valid Markdown document
- `metadata.json` records `chunked: true` and chunk count

---

### 8. Docs Quality Score

**Title:** Add documentation quality score to verify output
**Labels:** `good first issue`, `pipeline`, `enhancement`
**Difficulty:** Medium (~80 lines, heuristic scoring)

`npm run verify` currently checks for required files. Add a quality score (0–100) based on heuristics: heading count, code block count, word count, checklist completeness, frontmatter completeness.

Key files:
- Create `src/pipeline/quality-scorer.ts`
- Update `src/cli/commands/verify.command.ts` to display the score
- Add score to `metadata.json`

Acceptance criteria:
- `npm run verify` displays a quality score for each output directory
- Score is between 0 and 100
- Score is written to `metadata.json` as `qualityScore`
- Documented scoring criteria in `docs/output-contract.md`

---

## Creating These as GitHub Issues

If you are the maintainer, use GitHub CLI to create these issues:

```bash
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

# New issues (v0.1.1)
gh issue create \
  --title "Polish GitBook output mode formatting" \
  --label "good first issue,mode,documentation" \
  --body "See docs/GOOD_FIRST_ISSUES.md issue #6 for full spec."

gh issue create \
  --title "Add Docusaurus sidebar snippet generator" \
  --label "good first issue,docusaurus,enhancement" \
  --body "See docs/GOOD_FIRST_ISSUES.md issue #7 for full spec."

gh issue create \
  --title "Add transcript chunking for long videos" \
  --label "good first issue,pipeline,enhancement" \
  --body "See docs/GOOD_FIRST_ISSUES.md issue #8 for full spec."

gh issue create \
  --title "Add docs quality score to verify command" \
  --label "good first issue,pipeline,enhancement" \
  --body "See docs/GOOD_FIRST_ISSUES.md issue #9 for full spec."
```

> Note: GitHub labels must exist before using `--label`. Create them first in the Labels settings page or with `gh label create "good first issue" --color "#7057ff"`.
