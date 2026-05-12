---
title: "Build minimal local web preview for generated docs"
labels: ["good first issue", "frontend", "enhancement"]
---

## Summary

Add a `npm run preview` command that serves generated Markdown files as a local web preview so developers can review their documentation in a browser before publishing to Docusaurus or GitBook.

## Background

After running `npm run generate`, developers have Markdown files in `output/`. Currently they must either open the raw Markdown in an editor or push to a docs site to preview. A local preview server would close this gap.

This should be a **minimal, dependency-light** implementation. No React build step, no database, no auth. The target is a readable, functional preview — not a polished UI.

## Approach Options

### Option A: Serve Markdown as HTML (lightweight)
Use Node.js `http` module + a Markdown-to-HTML library (e.g., `marked`) to serve files in `output/` as HTML pages. Add minimal CSS for readability.

### Option B: Wrap an existing static site tool
Use `npx serve` or `npx live-server` pointed at the `output/` directory. Simpler, but less custom.

### Option C: Docusaurus local preview
If the user has Docusaurus installed, offer a `preview --docusaurus` flag that copies docs to their Docusaurus `docs/` folder and runs `npx docusaurus start`.

The preferred approach is **Option A** for zero extra runtime dependencies.

## Files to Touch

| File | Change |
|------|--------|
| `src/cli/commands/preview.command.ts` | Create — HTTP server for output/ |
| `src/cli/index.ts` | Register `preview` command |
| `package.json` | Add `"preview": "tsx src/cli/index.ts preview"` script |
| `README.md` | Add `npm run preview` to CLI commands section |
| `docs/USAGE.md` | Document preview command |

## Acceptance Criteria

- [ ] `npm run preview` starts a local HTTP server (default: `http://localhost:4000`)
- [ ] Lists all output directories as a clickable index page
- [ ] Renders Markdown as readable HTML (tables, code blocks, headings work)
- [ ] `--port` flag to change the port
- [ ] `--dir` flag to preview a specific output directory
- [ ] No extra npm dependencies for the minimal version (use `marked` only if needed, or native string template)
- [ ] Graceful shutdown on Ctrl+C
- [ ] README updated
- [ ] `docs/USAGE.md` updated
- [ ] Screenshots added to the PR description

## Difficulty

Medium — Node.js HTTP server + Markdown rendering. No complex UI work needed.

## How to Get Started

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
npm run demo  # generate some output first
# Then implement the preview command
npm test
```

Questions? Comment before opening a PR. Include your chosen approach (A/B/C) in the comment.
