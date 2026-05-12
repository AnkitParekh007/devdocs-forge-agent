# Changelog

All notable changes to devdocs-forge-agent are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

---

## [0.1.0] — 2026-05-12

Initial release of devdocs-forge-agent.

### Added

- CLI with `init`, `doctor`, `generate`, `batch`, `providers`, `examples`, `verify`, `inspect-url`, and `validate-source` commands
- Provider abstraction supporting OpenAI, Anthropic Claude, Google Gemini, and mock (default) via native fetch
- 11 documentation output modes: blog, docs, docusaurus, gitbook, readme, faq, troubleshooting, lesson, social, changelog, seo
- **Video Intake Guard** — URL validation, YouTube metadata classification, transcript word count validation
- `inspect-url` command — classify a video URL without a transcript
- `validate-source` command — validate URL + transcript pair before generation
- `--url` and `--force` flags on `generate` command
- Optional `YOUTUBE_API_KEY` for full metadata classification (degrades gracefully without it)
- Prompt system using composable Markdown mode files (`modes/`)
- User profile customization via `modes/_profile.md`
- Per-run output folders with `index.md`, `metadata.json`, `review-checklist.md`, `source-summary.md`
- Docusaurus frontmatter generation for `--type docusaurus`
- Markdown validation via `verify` command
- `npm run demo` one-command demo (doctor → examples → generate → verify)
- Example transcripts and outputs
- Full documentation in `docs/`
- 54-test Vitest suite across 7 test files
- GitHub Actions CI workflow (Node 18/20 × ubuntu/macos)
- AGENTS.md canonical AI agent instructions
- LEGAL_DISCLAIMER.md with clear transcript usage rules
- MIT license

### Notes

- Mock provider works without any API keys — switch to OpenAI/Anthropic/Gemini for production quality
- YouTube scraping is explicitly not included and will not be added
- URL-only generation is blocked by design (`allow_url_only_generation: false` in config)
