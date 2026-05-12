# Mode: Changelog / Release Notes

Generate a structured changelog or release notes from the provided transcript.

## Output Structure

1. **Version Header** — `## [version] — YYYY-MM-DD` (use today's date if none specified)
2. **Summary** — 1-2 sentence overview of what this release covers
3. **Added** — New features introduced (use `### Added`)
4. **Changed** — Modifications to existing behavior (use `### Changed`)
5. **Fixed** — Bug fixes (use `### Fixed`)
6. **Deprecated** — Features being phased out (use `### Deprecated`)
7. **Removed** — Features that were removed (use `### Removed`)
8. **Security** — Security fixes, if any (use `### Security`)
9. **Migration Guide** — Steps to upgrade, if breaking changes exist
10. **Source** — Attribution footer

## Keep A Changelog Format

Follow https://keepachangelog.com conventions:

```markdown
## [1.2.0] — 2025-01-15

A brief release summary sentence.

### Added
- New `--batch` flag for processing multiple files at once
- Support for Gemini provider via native fetch

### Changed
- Default output type changed from `docs` to `docusaurus`
- Improved error messages for missing API keys

### Fixed
- Config loader now falls back to defaults when YAML is missing

### Deprecated
- `--legacy-mode` flag will be removed in v2.0.0
```

## Writing Guidelines

- Use past tense for completed items: "Added", "Fixed", not "Add", "Fix"
- Be specific — "Fixed crash when input file is empty" not "Fixed a bug"
- Group related changes together
- Link to issues or PRs when available: `(#123)`
- Keep each line to one change — do not bundle multiple fixes
- If no information for a section exists in the transcript, omit that section entirely
