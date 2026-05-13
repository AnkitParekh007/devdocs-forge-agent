---
id: introduction
title: Introduction
sidebar_position: 1
description: What is DevDocs Forge Agent and why does it exist?
---

# Introduction

**DevDocs Forge Agent** is a local-first AI documentation agent CLI that converts tutorial transcripts, product demos, and lesson notes into structured developer documentation.

You bring the transcript. DevDocs Forge Agent generates everything else.

## What problem does it solve?

Creating good developer documentation is time-consuming. Most developers have:

- Recorded tutorials or walkthroughs they haven't documented
- Product demos with no written follow-up
- Course lessons or internal training without searchable docs
- Learning notes from talks they attended

DevDocs Forge Agent closes the gap between "video content" and "publishable documentation" — without scraping, without lock-in, and without leaving your terminal.

## What it generates

| Input | Output |
|-------|--------|
| Tutorial transcript | Step-by-step developer guide |
| Product demo transcript | Help docs / onboarding page |
| Course lesson notes | Lesson page with objectives |
| Raw learning notes | Developer blog post |
| Bug walkthrough | Troubleshooting guide |
| API demo | README tutorial |

## Key principles

### Local-first

DevDocs Forge Agent runs entirely on your machine. No cloud backend, no data processing service, no account required. Your transcripts stay on your machine.

### Bring your own model key

Connect OpenAI, Anthropic Claude, or Google Gemini by setting one environment variable. Mock mode works without any API key — useful for development and demos.

### No YouTube scraping

DevDocs Forge Agent does not scrape YouTube, download captions, or access any video platform API for content. You always provide your own transcript file.

### Human review required

Every generation run creates a `review-checklist.md` alongside the generated docs. AI can hallucinate — generated documentation must be reviewed by a human before publishing.

## Who is it for?

- **Developer YouTubers** — turn tutorial recordings into Docusaurus sites
- **DevRel teams** — convert demo recordings into onboarding docs
- **Course creators** — generate lesson pages from lecture notes
- **Open-source maintainers** — create READMEs and troubleshooting guides
- **Technical bloggers** — draft dev.to posts from talk notes
- **SaaS engineering teams** — generate internal runbooks from Loom transcripts

## Next steps

- [Quick Start](/docs/quick-start) — generate your first doc in under 5 minutes
- [Installation](/docs/installation) — detailed setup instructions
- [CLI Commands](/docs/cli-commands) — full command reference
