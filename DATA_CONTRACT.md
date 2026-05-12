# Data Contract — devdocs-forge-agent

This document defines which files belong to the user and which belong to the system.
Understanding this prevents accidental overwrites and makes upgrades safe.

---

## User Layer (your files — never overwritten by updates)

| Path | Purpose | Created by |
|------|---------|-----------|
| `input/` | Your transcript files | You |
| `output/` | Your generated documentation | `generate`, `batch` |
| `config/devdocs-forge-agent.yml` | Your project config | `init` |
| `modes/_profile.md` | Your writing profile | `init` (from template) |
| `.env` | Your API keys | You (from `.env.example`) |
| `user-notes.md` | Optional: your notes | You |

**Rules for user files:**
- The `init` command never overwrites files that already exist
- The `examples` command never overwrites files in `input/` that already exist
- The `generate` and `batch` commands create new output folders — they never delete old ones
- No command deletes output without explicit user confirmation
- Doctor warns before suggesting destructive actions

---

## System Layer (project files — updated via git)

| Path | Purpose | Modified by |
|------|---------|------------|
| `src/` | TypeScript source code | Project contributors |
| `modes/_shared.md` | Shared quality rules | Project contributors |
| `modes/blog.md`, `modes/docs.md`, etc. | Mode prompt files | Project contributors |
| `modes/_profile.template.md` | Profile template (not your _profile.md) | Project contributors |
| `package.json` | Dependencies | Project contributors |
| `tsconfig.json` | TypeScript config | Project contributors |
| `examples/` | Example transcripts and outputs | Project contributors |
| `templates/` | Output structure templates | Project contributors |
| `AGENTS.md`, `CLAUDE.md` | AI agent instructions | Project contributors |
| `docs/` | Documentation | Project contributors |
| `.github/` | CI and issue templates | Project contributors |

**Rules for system files:**
- Users should not edit system files for personal customization — use config files instead
- Personal prompt adjustments go in `modes/_profile.md`, not `modes/_shared.md`
- Personal settings go in `config/devdocs-forge-agent.yml`, not `package.json`
- System updates via `git pull` will update system files but never touch user files

---

## Configuration Priority

Settings are resolved in this order (higher = wins):

1. Command-line flags (`--type`, `--file`, `--source-url`)
2. `.env` environment variables (`DEVDOCS_PROVIDER`, `DEVDOCS_OUTPUT_DIR`)
3. `config/devdocs-forge-agent.yml`
4. Built-in defaults in `src/config/config.schema.ts`

---

## API Key Rules

- API keys MUST go in `.env` only
- `.env` is in `.gitignore` — it is never committed
- Config files (`.yml`) must never contain API keys, even as examples
- Logs must never print API keys
- Generated output must never contain API keys

---

## Output Structure

Every generation run produces a self-contained output folder:

```
output/{slug}-{YYYY-MM-DD}/
  index.md              ← Main generated document (always present)
  metadata.json         ← Generation metadata (always present)
  review-checklist.md   ← Human review checklist (always present)
  source-summary.md     ← Source usage summary (always present)
  docs/{slug}.md        ← Docusaurus-specific file (docusaurus mode only)
  blog/{slug}.md        ← Blog-specific file (blog mode only)
```

Folders are additive — running generate twice creates two separate folders.
Neither folder is ever deleted automatically.
