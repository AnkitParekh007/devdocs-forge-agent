---
id: configuration
title: Configuration
sidebar_position: 4
description: Full configuration reference for devdocs-forge-agent.yml.
---

# Configuration

DevDocs Forge Agent is configured via `config/devdocs-forge-agent.yml`. This file is safe to commit — never put API keys here.

## Create the config

```bash
npm run init
```

Or copy the example:

```bash
cp config/devdocs-forge-agent.example.yml config/devdocs-forge-agent.yml
```

## Full reference

```yaml title="config/devdocs-forge-agent.yml"
project:
  name: "My Docs Project"
  default_output_type: "docusaurus"  # used when --type is not passed
  output_dir: "output"
  input_dir: "input"

model:
  provider: "mock"       # overridden by DEVDOCS_PROVIDER env var
  temperature: 0.3
  max_tokens: 6000

writing:
  audience: "intermediate developers"
  tone: "clear, practical, friendly"
  style: "developer documentation"
  include_summary: true
  include_faq: true
  include_troubleshooting: true
  include_code_explanations: true
  include_review_checklist: true

docusaurus:
  sidebar_position: 1
  tags:
    - tutorial
    - documentation

safety:
  require_permission_notice: true
  require_human_review: true
  avoid_plagiarism: true
  include_source_attribution: true

video_intake:
  enabled: true
  allow_url_only_generation: false   # blocked by design
  require_transcript: true
  allow_force_for_low_confidence: true
  min_tech_confidence_score: 60
  min_transcript_words: 150
  allowed_domains:
    - youtube.com
    - youtu.be
    - vimeo.com
  preferred_categories:
    - Education
    - Science & Technology
    - Howto & Style
  technical_keywords:
    - angular
    - react
    - typescript
    - docker
    - kubernetes
    - api
    - tutorial
    # ... add your own
  blocked_keywords:
    - song
    - music
    - vlog
    - gaming
    # ... add your own
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `DEVDOCS_PROVIDER` | AI provider: `mock`, `openai`, `anthropic`, `gemini` |
| `OPENAI_API_KEY` | OpenAI API key |
| `OPENAI_MODEL` | OpenAI model (default: `gpt-4.1-mini`) |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `ANTHROPIC_MODEL` | Anthropic model (default: `claude-3-5-sonnet-latest`) |
| `GEMINI_API_KEY` | Gemini API key |
| `GEMINI_MODEL` | Gemini model (default: `gemini-2.0-flash`) |
| `YOUTUBE_API_KEY` | YouTube Data API key (optional — for video URL classification) |

Environment variables take priority over config file values.

## Writing profile

`modes/_profile.md` (created by `npm run init`) lets you customize every generation:

```markdown title="modes/_profile.md"
## Target audience

Intermediate to senior developers working with web frameworks.

## Writing tone

Clear, direct, and practical. No filler words.

## Branding

Company: Acme Corp
Product: AcmeSDK
GitHub: acme/acmesdk
```

Edit this file freely — it is never overwritten by upgrades.
