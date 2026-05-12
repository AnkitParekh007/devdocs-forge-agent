# Setup Guide

## Prerequisites

- **Node.js 18 or later** — [nodejs.org](https://nodejs.org)
- **npm 9+** — included with Node.js
- **Git** — [git-scm.com](https://git-scm.com)
- An API key for OpenAI, Anthropic, or Gemini *(optional — mock mode works without one)*

Check your Node.js version:
```bash
node --version  # Should output v18.x.x or higher
```

## Installation

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
```

## Configuration

```bash
cp .env.example .env
```

Edit `.env` and set your provider. To start with mock mode (no API key needed):

```env
DEVDOCS_PROVIDER=mock
```

Then initialize your workspace:

```bash
npm run init
```

This creates `config/devdocs-forge-agent.yml`, the `input/` and `output/` directories, and copies the profile template.

## Verify Setup

```bash
npm run doctor
```

You should see all `OK` statuses. Warnings for missing `.env` or config are normal and resolved by the steps above.

## First Generation

```bash
npm run examples
npm run generate -- --file input/angular-signals-tutorial.md --type docusaurus
```

Generated files appear in `output/angular-signals-tutorial-{date}/`.

## Upgrading

```bash
git pull origin main
npm install
npm run doctor
```

System files update automatically. Your `input/`, `output/`, `config/`, and `modes/_profile.md` are never touched by updates.
