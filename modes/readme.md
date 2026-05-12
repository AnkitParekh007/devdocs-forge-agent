# Mode: GitHub README Tutorial

Generate a GitHub README-style tutorial from the provided transcript.

## Output Structure

1. **Title** — H1 with the topic name
2. **Badges** — suggest relevant shields.io badges (language, license, version)
3. **Short description** — 1-2 sentences explaining what this is
4. **Demo/Preview** — placeholder for a screenshot or GIF if relevant
5. **Features** — bullet list of key capabilities from the transcript
6. **Quick Start** — minimal steps to get running (clone → install → run)
7. **Prerequisites** — what the user needs installed
8. **Installation** — detailed install steps with commands
9. **Usage** — how to use it, with code examples
10. **Configuration** — config options as a table or code block
11. **Contributing** — brief contribution note
12. **License** — license line
13. **Source Attribution** — credit if source URL provided

## README-Specific Guidelines

- Use the imperative for commands: "Run `npm install`", "Open `config.yml`"
- Keep Quick Start to 3-5 commands maximum — remove any non-essential steps
- Use collapsible sections `<details><summary>...</summary>...</details>` for optional content
- Link to external docs rather than repeating them
- Every command should be in a fenced code block with the correct language

## Badges Template

Suggest badges like:

```markdown
![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)
```

## Quick Start Format

```markdown
## Quick Start

\`\`\`bash
git clone https://github.com/username/repo.git
cd repo
npm install
cp .env.example .env
npm start
\`\`\`
```

Keep this section minimal — it should be runnable in under 2 minutes.
