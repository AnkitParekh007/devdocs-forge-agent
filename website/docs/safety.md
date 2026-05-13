---
id: safety
title: Safety & Responsible Use
sidebar_position: 12
description: How devdocs-forge-agent handles content safety and responsible use.
---

# Safety & Responsible Use

## What devdocs-forge-agent never does

- **Scrapes YouTube transcripts or caption tracks** — the YouTube captions API is never called
- **Downloads video files or audio** — no `yt-dlp`, `youtube-dl`, or equivalent
- **Fetches transcript text from any URL** — URL-only generation is blocked at the CLI level
- **Generates docs from a URL without a user-provided file** — `--file` is always required with `--url`
- **Logs or prints API keys** — keys are never echoed in CLI output or written to output files
- **Commits `.env` files** — `.env` is in `.gitignore`

## Your content, your responsibility

devdocs-forge-agent is designed for processing **content you own or have permission to use**.

Before generating documentation:
- Confirm you have the right to use the source transcript
- Review AI output before publishing — AI can hallucinate facts
- Check the generated `review-checklist.md` before publishing
- Do not publish documentation without human review

## Video URL safety

When you pass `--url`, the Video Intake Guard runs three checks:

1. **URL validation** — only YouTube and Vimeo URLs are accepted
2. **Tech classification** — the video must score ≥ 35/100 on technical signals (or use `--force`)
3. **Transcript requirement** — you must always provide `--file` with your own transcript

The guard exists to make it explicit that you have reviewed the source and are providing your own words — not scraped content.

## AI output review

The `review-checklist.md` in every output directory includes:

- [ ] All facts verified against the source transcript
- [ ] Code snippets tested locally
- [ ] No API keys, secrets, or credentials in the output
- [ ] Source attribution included if required
- [ ] Headings match the transcript structure

**Always review this checklist before publishing.**

## API key security

- Store API keys in `.env` only — never in config files or source code
- `.env` is listed in `.gitignore` — never commit it
- Run `npm run verify` to check that generated output doesn't accidentally contain key-like strings
- If you suspect a key was exposed, rotate it immediately at your provider's dashboard

## Reporting issues

If you find a security issue, open a [GitHub issue](https://github.com/AnkitParekh007/devdocs-forge-agent/issues) or email the maintainer directly.

For general bugs and feature requests, use [GitHub Issues](https://github.com/AnkitParekh007/devdocs-forge-agent/issues).
