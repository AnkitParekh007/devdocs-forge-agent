# Changelog

All notable changes to devdocs-forge-agent are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

---

## [0.1.0] — 2026-05-12

Initial release of devdocs-forge-agent.

### Added

- CLI with `init`, `doctor`, `generate`, `batch`, `providers`, `examples`, and `verify` commands
- Provider abstraction supporting OpenAI, Anthropic Claude, Google Gemini, and mock (default)
- 11 documentation output modes: blog, docs, docusaurus, gitbook, readme, faq, troubleshooting, lesson, social, changelog, seo
- Prompt system using composable Markdown mode files (`modes/`)
- User profile customization via `modes/_profile.md`
- Per-run output folders with `index.md`, `metadata.json`, `review-checklist.md`, `source-summary.md`
- Docusaurus frontmatter generation for `--type docusaurus`
- Markdown validation via `verify` command
- Example transcripts and outputs
- Full documentation in `docs/`
- Vitest test suite
- GitHub Actions CI workflow
- AGENTS.md canonical AI agent instructions
- LEGAL_DISCLAIMER.md with clear transcript usage rules
- MIT license

### Notes

- This is an MVP release — batch mode, verify, and provider abstraction are functional
- Mock provider works without any API keys
- YouTube scraping is explicitly not included and will not be added
