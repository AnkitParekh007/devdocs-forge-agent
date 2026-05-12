# Launch Checklist — devdocs-forge-agent v0.1.0

This file tracks everything needed to launch the repository publicly. Complete each item before sharing the repo link.

---

## Code & Quality

- [x] All `your-username` placeholders replaced with `AnkitParekh007`
- [x] `package.json` repository URL, homepage, and bugs URL updated
- [x] `npm run build` compiles with zero TypeScript errors
- [x] `npm test` — 54/54 tests pass
- [x] `npm run demo` works on a fresh clone (doctor → examples → generate → verify)
- [x] `npm run doctor` shows all OK (YOUTUBE_API_KEY shows WARN — expected)
- [x] `config/devdocs-forge-agent.yml` includes `video_intake` section
- [ ] Push all commits to `main` branch: `git push origin main`

---

## GitHub Repository Setup

### Topics to Add

Go to https://github.com/AnkitParekh007/devdocs-forge-agent → **About** → **gear icon** → **Topics**

Add these topics:

```
ai  ai-agent  documentation  developer-tools  markdown  docusaurus
gitbook  openai  anthropic  gemini  typescript  cli  tutorial
transcript  docs-as-code  devrel  local-first  llm  technical-writing
open-source
```

Or use GitHub CLI (if authenticated):

```bash
gh repo edit AnkitParekh007/devdocs-forge-agent \
  --add-topic ai \
  --add-topic ai-agent \
  --add-topic documentation \
  --add-topic developer-tools \
  --add-topic markdown \
  --add-topic docusaurus \
  --add-topic gitbook \
  --add-topic openai \
  --add-topic anthropic \
  --add-topic gemini \
  --add-topic typescript \
  --add-topic cli \
  --add-topic tutorial \
  --add-topic transcript \
  --add-topic docs-as-code \
  --add-topic devrel \
  --add-topic local-first \
  --add-topic llm \
  --add-topic technical-writing \
  --add-topic open-source
```

### Repository Settings

- [ ] Set repository description: `AI documentation agent that turns tutorial transcripts into developer docs — local-first, bring your own model key`
- [ ] Set repository website: `https://github.com/AnkitParekh007/devdocs-forge-agent#readme`
- [ ] Enable Issues
- [ ] Enable Discussions (optional — for community Q&A)
- [ ] Enable "Preserve this repository" (optional — for archival)

### GitHub Labels

Create these labels before creating good first issues:

```bash
gh label create "good first issue" --color "#7057ff" --description "Good for newcomers"
gh label create "provider" --color "#0075ca" --description "AI provider related"
gh label create "mode" --color "#e4e669" --description "Output mode related"
gh label create "enhancement" --color "#a2eeef" --description "New feature or improvement"
gh label create "documentation" --color "#0075ca" --description "Documentation improvements"
gh label create "docusaurus" --color "#3ECC5F" --description "Docusaurus output mode"
gh label create "frontend" --color "#d93f0b" --description "UI/frontend work"
```

---

## Release v0.1.0

- [ ] Verify `git tag v0.1.0` does not already exist: `git tag -l v0.1.0`
- [ ] Create the release:

```bash
gh release create v0.1.0 \
  --title "v0.1.0 — CLI MVP" \
  --notes-file docs/release-notes/v0.1.0.md \
  --latest
```

Or via GitHub UI:
1. Go to https://github.com/AnkitParekh007/devdocs-forge-agent/releases
2. Click **Draft a new release**
3. Tag: `v0.1.0`
4. Target: `main`
5. Title: `v0.1.0 — CLI MVP`
6. Paste contents of `docs/release-notes/v0.1.0.md`
7. Check **Set as the latest release**
8. Click **Publish release**

---

## Good First Issues

Create these 5 issues (see `docs/GOOD_FIRST_ISSUES.md` for full issue creation commands):

- [ ] Issue #1: Add Ollama provider
- [ ] Issue #2: Add OpenRouter provider
- [ ] Issue #3: Add Mermaid diagram mode
- [ ] Issue #4: Improve Docusaurus frontmatter
- [ ] Issue #5: Build minimal web preview

---

## Pin on GitHub Profile

1. Go to https://github.com/AnkitParekh007
2. Click **Customize your pins**
3. Search for `devdocs-forge-agent`
4. Select it and drag it to position 1
5. Suggested pin order:
   1. devdocs-forge-agent ← this repo
   2. angular-ai-copilot-starter
   3. ngx-copilot-sdk
   4. ai-ui-agent-demo
   5. frontend-ai-patterns
   6. resume

---

## Promotion Checklist

- [ ] Post on Twitter/X with: `#buildinpublic #devtools #AI #OpenSource`
- [ ] Post on LinkedIn (developer audience)
- [ ] Submit to dev.to (write a short article about the project)
- [ ] Submit to Hacker News Show HN: `Show HN: devdocs-forge-agent — Turn tutorial transcripts into Docusaurus docs`
- [ ] Submit to Product Hunt (optional — schedule for weekday morning PT)
- [ ] Post in relevant Discord servers (Docusaurus, Anthropic, OpenAI communities)
- [ ] Submit to awesome-cli, awesome-ai-tools, or similar lists

---

## Demo Assets

- [x] `assets/devdocs-forge-agent-hero.svg` — hero image
- [x] `assets/demo-terminal.svg` — terminal output preview
- [x] `assets/generated-doc-preview.svg` — generated doc preview
- [x] `assets/video-intake-guard.svg` — Video Intake Guard preview
- [ ] Optional: Record a real terminal GIF using [VHS](https://github.com/charmbracelet/vhs), [Kap](https://getkap.co) (macOS), or [ScreenToGif](https://www.screentogif.com) (Windows)

To record a VHS GIF (if VHS is installed):
```bash
# Install VHS: https://github.com/charmbracelet/vhs
vhs scripts/demo.tape
```

---

## Post-Launch

- [ ] Watch for first stars and forks
- [ ] Respond to first issues within 48 hours
- [ ] Merge first contributor PR
- [ ] Tag `v0.1.1` after first bug fix
