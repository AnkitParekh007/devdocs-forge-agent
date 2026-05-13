---
id: installation
title: Installation
sidebar_position: 3
description: Detailed installation and setup instructions.
---

# Installation

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | 18.0.0 or later |
| npm | 9.0.0 or later |
| Git | Any recent version |

Check your versions:

```bash
node --version   # v18.x.x or higher
npm --version    # 9.x.x or higher
git --version
```

## Clone the repository

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
```

## Initial setup

```bash
cp .env.example .env
npm run init
```

`npm run init` creates:
- `config/devdocs-forge-agent.yml` — your project config
- `input/` — drop transcripts here
- `output/` — generated docs appear here
- `modes/_profile.md` — your writing profile (customize this)

## Verify setup

```bash
npm run doctor
```

Expected output:

```
devdocs-forge-agent doctor
────────────────────────────
  OK   Node.js v22.x.x    >= 18 required
  OK   package.json
  OK   config/devdocs-forge-agent.yml
  OK   .env
  OK   provider: mock
  OK   API key             not required in mock mode
  WARN YOUTUBE_API_KEY     title-only classification (optional)
  OK   input/
  OK   output/
  OK   modes/
  OK   examples/

  ✓ All checks passed. You are ready to generate docs!
```

The `YOUTUBE_API_KEY` warning is expected — this is optional and only needed for full video URL metadata classification.

## Configure your AI provider

Edit `.env` to switch from mock mode to a real provider:

```env title=".env"
# Choose one:
DEVDOCS_PROVIDER=mock       # default — no key needed
DEVDOCS_PROVIDER=openai
DEVDOCS_PROVIDER=anthropic
DEVDOCS_PROVIDER=gemini
```

See [Providers](/docs/providers) for full setup instructions for each provider.

## Configure your project

Edit `config/devdocs-forge-agent.yml`:

```yaml
project:
  name: "My Docs Project"
  default_output_type: "docusaurus"

writing:
  audience: "intermediate developers"
  tone: "clear, practical, friendly"
```

See [Configuration](/docs/configuration) for all options.

## Customize your writing profile

Edit `modes/_profile.md` to set your target audience, writing style, and branding preferences. This file is applied to every generation run.

## Upgrading

```bash
git pull origin main
npm install
npm run doctor
```

Your `input/`, `output/`, `config/`, and `modes/_profile.md` are never touched by upgrades.
