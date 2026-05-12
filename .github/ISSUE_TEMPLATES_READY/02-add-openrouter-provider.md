---
title: "Add OpenRouter provider support"
labels: ["good first issue", "provider", "enhancement"]
---

## Summary

Add an OpenRouter provider so users can access 100+ models (GPT-4, Claude, Llama, Mistral, Gemma, etc.) through a single unified API key.

## Background

[OpenRouter](https://openrouter.ai) provides an OpenAI-compatible chat completions API that supports dozens of providers and models. Since devdocs-forge-agent already has an OpenAI provider using native fetch, OpenRouter support requires minimal changes — mainly just pointing at a different base URL and adding an `HTTP-Referer` header.

## Files to Touch

| File | Change |
|------|--------|
| `src/providers/openrouter.provider.ts` | Create — implement Provider interface |
| `src/providers/provider-registry.ts` | Add `'openrouter'` case |
| `.env.example` | Add `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` |
| `docs/PROVIDERS.md` | Document OpenRouter setup |
| `tests/provider-registry.test.ts` | Add test case |

## Implementation Guide

OpenRouter uses the OpenAI chat completions format at `https://openrouter.ai/api/v1/chat/completions`.

Required headers:
- `Authorization: Bearer ${OPENROUTER_API_KEY}`
- `HTTP-Referer: https://github.com/AnkitParekh007/devdocs-forge-agent`
- `X-Title: devdocs-forge-agent`

The response format is identical to OpenAI: `choices[0].message.content`.

## Acceptance Criteria

- [ ] `DEVDOCS_PROVIDER=openrouter npm run generate -- --file ...` works with a valid key
- [ ] `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` read from environment
- [ ] Clear error message when key is missing (not a stack trace)
- [ ] `docs/PROVIDERS.md` updated with OpenRouter setup
- [ ] `.env.example` updated
- [ ] Tests updated

## Difficulty

Low — ~60 lines, very similar to the OpenAI provider already in the codebase.

## How to Get Started

```bash
git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git
cd devdocs-forge-agent
npm install
# Look at src/providers/openai.provider.ts as a reference
npm test
```
