<div align="center">

# devdocs-forge-agent

**Turn tutorial transcripts into beautiful developer documentation.**

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://typescriptlang.org)
[![OpenAI](https://img.shields.io/badge/OpenAI-supported-412991)](https://platform.openai.com)
[![Anthropic](https://img.shields.io/badge/Anthropic-supported-D97757)](https://anthropic.com)
[![Gemini](https://img.shields.io/badge/Gemini-supported-4285F4)](https://aistudio.google.com)
[![Markdown](https://img.shields.io/badge/output-Markdown-lightgrey)](https://commonmark.org)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-ready-3ECC5F)](https://docusaurus.io)
[![GitBook](https://img.shields.io/badge/GitBook-ready-3884FF)](https://gitbook.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

<br/>

![devdocs-forge-agent hero](assets/devdocs-forge-agent-hero.png)

*Videos are great for learning. Docs are great for shipping.*
*devdocs-forge-agent turns your tutorials, demos, and lessons into docs developers can actually use.*

</div>

---

## What Is This?

**devdocs-forge-agent** is a local-first AI documentation agent that converts tutorial transcripts, product demos, and lesson notes into structured developer documentation.

You bring the transcript. devdocs-forge-agent generates:

- Docusaurus documentation pages
- Developer blog posts
- GitHub README tutorials
- FAQs and troubleshooting guides
- Course lesson pages
- SEO metadata and social summaries

No YouTube scraping. No video downloading. No account required. Works entirely on your machine with your own API key — or in mock mode without one.

---

## Why Developers Star This

- **Local-first** — runs entirely on your machine, no cloud backend
- **Bring your own model key** — OpenAI, Anthropic, Gemini, or mock mode
- **Markdown-first outputs** — drop directly into any docs site
- **Docusaurus/GitBook-ready** — correct frontmatter, admonitions, and structure
- **Built for developer tutorials** — understands code walkthroughs, API demos, course lessons
- **No scraping** — only processes transcripts you own or have permission to use
- **No lock-in** — fork it, modify it, extend it
- **Agent-friendly** — full AGENTS.md and CLAUDE.md for AI-assisted workflows
- **Contributor-friendly** — add a provider, a mode, or examples in minutes

---

## What It Generates

| Input | Output |
|-------|--------|
| Tutorial transcript | Step-by-step developer guide |
| Product demo transcript | Help docs / onboarding page |
| Course lesson notes | Lesson page with objectives |
| Raw learning notes | Developer blog post |
| Bug walkthrough | Troubleshooting guide |
| API demo | README tutorial |
| Webinar transcript | FAQ document |
| Internal training notes | Internal documentation page |

---

## Quick Start

```bash
git clone https://github.com/your-username/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
cp .env.example .env
npm run doctor
npm run examples
npm run generate -- --file examples/transcripts/angular-signals-tutorial.md --type docusaurus
```

Your generated documentation lands in `output/`.

---

## Model Provider Setup

By default, devdocs-forge-agent runs in **mock mode** — no API key required.

```env
DEVDOCS_PROVIDER=mock
```

Switch to a real provider by editing your `.env`:

**OpenAI:**
```env
DEVDOCS_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

**Anthropic Claude:**
```env
DEVDOCS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

**Google Gemini:**
```env
DEVDOCS_PROVIDER=gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.0-flash
```

See [docs/PROVIDERS.md](docs/PROVIDERS.md) for full provider setup and how to add Ollama, Groq, or OpenRouter.

---

## Usage

```bash
# Initialize your project
npm run init

# Check your setup
npm run doctor

# Generate documentation from a transcript
npm run generate -- --file input/my-tutorial.md --type docs
npm run generate -- --file input/my-tutorial.md --type docusaurus
npm run generate -- --file input/my-tutorial.md --type blog
npm run generate -- --file input/my-tutorial.md --type faq

# Process all transcripts in a directory
npm run batch -- --dir input/

# List available providers
npm run providers

# Validate generated outputs
npm run verify
```

All output goes to `output/{slug}-{YYYY-MM-DD}/`.

---

## How It Works

```
Transcript / Notes
       ↓
  Source Parser
  (extract title, source URL, content)
       ↓
  Mode Prompt Builder
  (shared rules + user profile + mode template)
       ↓
  Provider Adapter
  (mock / OpenAI / Anthropic / Gemini)
       ↓
  Markdown Generator
  (index.md + type-specific files)
       ↓
  Review Checklist
  (review-checklist.md + metadata.json)
       ↓
  Output Files
  (output/{slug}-{date}/)
```

---

## Modes

| Mode | Command | What It Generates |
|------|---------|-------------------|
| `docusaurus` | `--type docusaurus` | Docusaurus v3 page with frontmatter |
| `blog` | `--type blog` | Developer blog post with SEO |
| `docs` | `--type docs` | General documentation page |
| `gitbook` | `--type gitbook` | GitBook-formatted doc with hints |
| `readme` | `--type readme` | GitHub README tutorial |
| `faq` | `--type faq` | FAQ organized by category |
| `troubleshooting` | `--type troubleshooting` | Error/fix troubleshooting guide |
| `lesson` | `--type lesson` | Course lesson with objectives |
| `social` | `--type social` | LinkedIn + X + dev.to summaries |
| `changelog` | `--type changelog` | Keep A Changelog format release notes |
| `seo` | `--type seo` | SEO metadata and keyword analysis |

---

## Example Output

Running on `examples/transcripts/angular-signals-tutorial.md` with `--type docusaurus`:

```markdown
---
id: angular-signals-tutorial
title: "Angular Signals: Reactive State Without the Complexity"
sidebar_label: "Angular Signals"
sidebar_position: 1
description: "Learn how to use Angular Signals..."
tags:
  - tutorial
  - documentation
---

Angular 17 introduced Signals as a stable reactive primitive...

## Prerequisites
...

## What Is a Signal?
...

## Review Checklist
- [ ] Facts verified
- [ ] Code snippets tested
```

See full examples in [examples/outputs/](examples/outputs/).

---

## Project Structure

```
devdocs-forge-agent/
├── src/
│   ├── cli/              # CLI entry point and commands
│   ├── config/           # Config schema and loader
│   ├── pipeline/         # Core generation logic
│   ├── providers/        # AI provider adapters
│   ├── templates/        # Output templates
│   └── utils/            # Logger, errors, fs helpers
├── modes/                # Prompt mode files (customize these)
│   ├── _shared.md        # Quality rules for all modes
│   ├── _profile.template.md
│   ├── blog.md
│   ├── docusaurus.md
│   └── ...
├── examples/
│   ├── transcripts/      # Example input transcripts
│   └── outputs/          # Example generated outputs
├── docs/                 # Full documentation
├── tests/                # Vitest test suite
├── input/                # Drop your transcripts here
├── output/               # Generated docs land here
├── config/               # Your project config
└── .env.example          # Provider configuration template
```

---

## Video URL Safety

When you pass `--url` to the `generate` command, devdocs-forge-agent runs a **Video Intake Guard** before generation:

1. **URL validation** — checks that the URL is a supported YouTube or Vimeo link
2. **Tech video classification** — scores the video's metadata (title, description, tags, category) to verify it looks like a technical tutorial
3. **Transcript check** — confirms you have provided your own transcript file

**devdocs-forge-agent never scrapes YouTube transcripts.** The `--url` flag is for attribution and classification only — you must always supply `--file` with your own transcript.

```bash
# Inspect a video URL (classification only, no transcript needed)
npm run devdocs-forge-agent -- inspect-url "https://youtube.com/watch?v=..."

# Validate a URL + transcript before generation
npm run devdocs-forge-agent -- validate-source \
  --url "https://youtube.com/watch?v=..." \
  --file input/your-transcript.md

# Generate with URL attribution and intake guard
npm run devdocs-forge-agent -- generate \
  --url "https://youtube.com/watch?v=..." \
  --file input/your-transcript.md \
  --type docusaurus

# Bypass low-confidence classification (only if you own the content)
npm run devdocs-forge-agent -- generate \
  --url "https://youtube.com/watch?v=..." \
  --file input/your-transcript.md \
  --type docusaurus \
  --force
```

For richer classification (title, category, tags, duration), add `YOUTUBE_API_KEY` to your `.env`. Without it, classification uses URL heuristics only and may give a low-confidence result. This is a warning, not a failure — use `--force` to proceed if you own the content.

---

## Safety & Responsible Use

**Please read before using:**

- Only process transcripts you **own**, **created**, or have **explicit permission** to use
- Do not use this tool to plagiarize tutorial creators or course authors
- Always **review** generated documentation before publishing — AI can hallucinate
- AI may produce inaccurate code, wrong API names, or invented configuration values
- Source attribution is strongly recommended when processing others' content
- Respect the Terms of Service of YouTube, Udemy, Coursera, and other platforms
- Never scrape or download transcripts from platforms that prohibit it

See [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) and [docs/SAFETY.md](docs/SAFETY.md) for full details.

---

## Roadmap

- [x] CLI MVP
- [x] Provider abstraction (OpenAI, Anthropic, Gemini, mock)
- [x] Docusaurus output mode
- [x] GitBook output mode
- [x] Batch mode
- [x] Video Intake Guard (URL validation + tech classification + transcript check)
- [ ] Browser UI (React or Angular)
- [ ] VS Code extension
- [ ] Ollama provider (local LLMs)
- [ ] OpenRouter provider
- [ ] GitHub PR generator from changelogs
- [ ] Docs website generator (auto-publishes to GitHub Pages)
- [ ] Transcript chunking for long videos
- [ ] Diagram generation (Mermaid from architecture sections)
- [ ] Human review workflow (Git-based approval flow)
- [ ] Multilingual output support

See [ROADMAP.md](ROADMAP.md) for details and contribution opportunities.

---

## Contributing

We welcome all kinds of contributions:

| Type | How |
|------|-----|
| **Good first issue** | Browse issues labeled `good first issue` |
| **Add a provider** | Create `src/providers/yourprovider.provider.ts` — see [docs/PROVIDERS.md](docs/PROVIDERS.md) |
| **Add a mode** | Create `modes/yourmode.md` — see [docs/MODES.md](docs/MODES.md) |
| **Improve prompts** | Edit mode files in `modes/` — no TypeScript needed |
| **Add examples** | Add transcripts to `examples/transcripts/` |
| **Improve docs** | Edit files in `docs/` |
| **Build the UI** | Open an issue to discuss approach |

See [CONTRIBUTING.md](CONTRIBUTING.md) for full setup instructions.

---

## Star This Project

If devdocs-forge-agent helps you ship better documentation, please star it — it helps more developers discover it.

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.

---
