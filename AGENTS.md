# AGENTS.md — devdocs-forge-agent

Canonical instructions for AI agents working with this repository.
This file is the authoritative guide. Claude Code should read CLAUDE.md, which references this file.

---

## What This Project Does

devdocs-forge-agent is a local-first AI documentation agent. It takes transcript files
(tutorial notes, demo walkthroughs, course lessons) and transforms them into structured
developer documentation: Docusaurus pages, blog posts, READMEs, FAQs, and more.

It does NOT scrape YouTube. It does NOT download videos. It does NOT steal transcripts.
It only processes text that the user provides directly.

---

## First-Run Onboarding

When a user first opens this project, guide them through:

1. Run `npm install`
2. Copy `.env.example` to `.env`
3. Run `npm run doctor` to verify setup
4. Run `npm run init` if directories are missing
5. Run `npm run examples` to get sample transcripts
6. Run `npm run generate -- --file examples/transcripts/angular-signals-tutorial.md --type docusaurus`

If any step fails, diagnose the doctor output before suggesting fixes.

---

## How to Check Setup

Before running any generation task:

```bash
npm run doctor
```

Doctor checks: Node.js >= 18, config file, .env file, provider setting, API key (if non-mock), directories.

If doctor fails on API key: ask the user which provider they want to use, then guide them to add the key to `.env`.

---

## How to Create Config

The config file is `config/devdocs-forge-agent.yml`. If it does not exist, run `npm run init`.

Template is in `config/devdocs-forge-agent.example.yml`.

Do NOT put API keys in the config file. Keys go in `.env` only.

---

## How to Ask for Missing Information

If the user does not specify an output type, use the default from config (`project.default_output_type`).
If the config is also missing, use `docusaurus` as the fallback.

If the user does not specify an input file, ask them:
- "Which file in input/ do you want to generate docs from?"
- List available files if possible.

---

## Mode Selection Guide

| User says... | Suggest mode |
|-------------|-------------|
| "blog post", "article", "write-up" | `blog` |
| "documentation page", "docs" | `docusaurus` or `docs` |
| "GitBook", "handbook" | `gitbook` |
| "README", "github readme" | `readme` |
| "FAQ", "questions", "Q&A" | `faq` |
| "troubleshooting", "errors", "bugs" | `troubleshooting` |
| "course", "lesson", "tutorial page" | `lesson` |
| "LinkedIn", "tweet", "social" | `social` |
| "changelog", "release notes", "what's new" | `changelog` |
| "SEO", "keywords", "meta" | `seo` |

---

## Provider Usage

The provider is set in `.env` via `DEVDOCS_PROVIDER`. Options: mock, openai, anthropic, gemini.

Default is `mock` — no API key needed.

To list providers: `npm run providers`

NEVER log or print API keys. NEVER ask the user to paste API keys into the chat.
Guide them to add keys directly to `.env`.

---

## Output File Locations

Every generation run creates:

```
output/{slug}-{YYYY-MM-DD}/
  index.md            ← Main generated document
  metadata.json       ← Generation metadata
  review-checklist.md ← Human review checklist
  source-summary.md   ← Source usage summary
```

Docusaurus mode also creates: `output/{slug}-{date}/docs/{slug}.md`
Blog mode also creates: `output/{slug}-{date}/blog/{slug}.md`

---

## Data Contract Rules

**User files (do not overwrite):**
- `input/` — user's transcripts
- `output/` — user's generated docs
- `config/devdocs-forge-agent.yml` — user's config
- `modes/_profile.md` — user's writing profile
- `.env` — user's API keys

**System files (update via git pull):**
- `src/` — TypeScript source code
- `modes/_shared.md` and all mode files except `_profile.md`
- `package.json`, `tsconfig.json`
- `examples/` — example content

Never delete output/ or input/ without explicit user confirmation.
Never overwrite _profile.md on init if it already exists.

---

## Video URL Handling

The `--url` flag is used for **attribution and classification only** — not for scraping.

### Intake Guard rules (enforced by `src/intake/`)

1. **URL validation** — only `youtube.com`, `youtu.be`, and `vimeo.com` are accepted
2. **Metadata fetch** — uses YouTube Data API v3 `videos.list` (snippet + contentDetails only). NEVER fetches captions, subtitles, or transcript text from the API
3. **Tech classification** — scores the video's title, description, tags, and category against keyword lists. Score ≥ 60 = high confidence (allow), 35–59 = medium (warn), < 35 = low (block unless `--force`)
4. **Transcript requirement** — the user MUST provide `--file` with their own transcript. If `--url` is given without `--file`, throw `DocuForgeError` with a helpful message explaining no scraping occurs
5. **`--force` semantics** — only bypasses low-confidence classification. It does NOT bypass URL validation or transcript requirement. Append `force_used: true` to `metadata.json` and a warning to `review-checklist.md` when used

### What never to do

- NEVER call YouTube's captions API or fetch subtitle tracks
- NEVER auto-download or scrape transcript text from any URL
- NEVER imply the tool can obtain transcripts automatically
- If the user asks for auto-scraping, explain the tool does not support it and show the `validate-source` command instead

---

## Safety Rules

1. NEVER process or encourage processing of transcripts the user does not own
2. NEVER scrape YouTube, Coursera, Udemy, or other platforms
3. NEVER log, print, or store API keys
4. ALWAYS include a review checklist in generated output
5. ALWAYS cite/attribute the source URL if one was provided
6. NEVER invent code that was not present in the source transcript
7. If code is reconstructed or inferred, label it: `// Conceptual — verify against source`
8. ALWAYS remind the user to review before publishing
9. NEVER claim AI-generated text is human-authored
10. If the transcript seems to be copied from a platform without permission, warn the user

---

## Hallucination Prevention

- Only use facts, names, and code from the provided transcript
- If a library version is mentioned, use that exact version — do not upgrade it
- If config values are shown in the transcript, use them — do not invent defaults
- Mark anything unclear as: `<!-- TODO: Verify this claim against source -->`
- Do not add features, APIs, or steps that were not covered in the transcript

---

## Quality Standards

Generated documentation must be:
- Practical and developer-focused
- Structured with clear headings
- Including code examples when the transcript shows them
- Ending with a review checklist
- Attributing the source if a URL was provided
- Reviewed by a human before publishing

---

## Running Tests

```bash
npm test
```

Tests use Vitest and live in `tests/`. They cover config validation, markdown validation,
provider registry, and doctor logic.

---

## Adding a New Provider

1. Create `src/providers/yourprovider.provider.ts` implementing the `Provider` interface
2. Add a case in `src/providers/provider-registry.ts`
3. Add the provider to `PROVIDERS` in `src/cli/commands/providers.command.ts`
4. Add env var documentation to `.env.example` and `docs/PROVIDERS.md`
5. Run tests: `npm test`

---

## Adding a New Mode

1. Create `modes/yourmode.md` with prompt instructions
2. Add the mode name to `VALID_MODES` in `src/pipeline/prompt-builder.ts`
3. Document the mode in `docs/MODES.md`
4. Add an example output to `examples/outputs/`
