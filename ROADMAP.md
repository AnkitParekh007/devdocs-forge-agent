# Roadmap — devdocs-forge-agent

This roadmap reflects the current plans for devdocs-forge-agent. It is not a commitment — priorities shift based on community interest and contributions.

Want to work on something? Open an issue!

---

## v0.1.x — Stability (Current — v0.1.1)

| Feature | Status |
|---------|--------|
| CLI MVP (`init`, `doctor`, `generate`, `batch`, `verify`) | ✅ Done |
| Provider abstraction (OpenAI, Anthropic, Gemini, Ollama, mock) | ✅ Done |
| Docusaurus output mode | ✅ Done |
| GitBook output mode | ✅ Done |
| Blog, FAQ, troubleshooting, lesson, social modes | ✅ Done |
| Batch processing | ✅ Done |
| Markdown validation | ✅ Done |
| Test suite (Vitest) | ✅ Done |
| Example transcripts and outputs | ✅ Done |
| Video Intake Guard (URL validation + tech classification) | ✅ Done |
| Transcript Intake Agent (clipboard, paste, file import) | ✅ Done |
| One-command demo (`npm run demo`) | ✅ Done |
| `npm run preview` — local browser doc preview | Planned — previous PR closed, open for contribution |

---

## v0.2.x — Extended Providers

| Feature | Status | Notes |
|---------|--------|-------|
| Ollama provider (local LLMs) | Done | fetch-based, no install |
| OpenRouter provider | Planned | unified API for 100+ models |
| Groq provider | Planned | fast inference |
| Mistral provider | Planned | EU-hosted option |

---

## v0.3.x — Smarter Processing

| Feature | Status | Notes |
|---------|--------|-------|
| Transcript chunking | Planned | Handle transcripts > 50,000 tokens |
| Source URL auto-detection | Planned | Parse YouTube URLs for attribution metadata |
| Frontmatter extraction | Planned | Better YAML frontmatter from transcript signals |
| Code block language detection | Planned | Guess language from context |

---

## v0.4.x — Workflow Integration

| Feature | Status | Notes |
|---------|--------|-------|
| GitHub PR generator | Planned | Auto-generate PRs for documentation updates |
| Docs website generator | Planned | Auto-publish to GitHub Pages via CI |
| Human review workflow | Planned | Git-based approval flow before publishing |
| Webhook output adapter | Planned | POST generated docs to a URL on completion |

---

## v0.5.x — Editor Integration

| Feature | Status | Notes |
|---------|--------|-------|
| VS Code extension | Planned | Right-click transcript → generate docs |
| JetBrains plugin | Planned | Same concept, JetBrains platform |
| Obsidian plugin | Planned | For knowledge management workflows |

---

## v1.0.x — Browser UI

| Feature | Status | Notes |
|---------|--------|-------|
| Web UI | Planned | Upload transcript → preview generated docs |
| Angular frontend | Planned | CLI-first first, then Angular UI |
| Dark/light mode | Planned | |
| Side-by-side diff view | Planned | Compare original vs generated |

---

## Diagram Generation (Stretch)

| Feature | Status | Notes |
|---------|--------|-------|
| Mermaid diagram from architecture sections | Stretch goal | Extract component descriptions → flowchart |
| Sequence diagram generation | Stretch goal | API flows → sequence diagrams |

---

## Multilingual Support (Stretch)

| Feature | Status | Notes |
|---------|--------|-------|
| Generate docs in non-English languages | Stretch goal | Pass target language in config |
| Translation of existing docs | Stretch goal | Separate translation mode |

---

## Contributions Welcome

Every item marked "Planned" is available to work on. Open an issue to claim it and discuss the approach before building.

Priority contributions (most impactful for the community):
1. Ollama provider — enables fully offline, private use
2. Transcript chunking — handles real-world long transcripts
3. GitHub PR generator — closes the documentation workflow loop
4. VS Code extension — meets developers where they already work
