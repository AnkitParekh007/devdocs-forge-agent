# /devdocs-forge-agent

Run the full devdocs-forge-agent documentation generation workflow.

## Usage

```
/devdocs-forge-agent
```

## What This Does

1. Run `npm run doctor` to verify setup
2. Ask the user which file to process and what output type they want
3. Run `npm run generate -- --file <file> --type <type>`
4. Open the generated `review-checklist.md` for the user to review
5. Run `npm run verify` on the output

## Pre-flight Check

Before running, verify:
- Node.js >= 18
- `config/devdocs-forge-agent.yml` exists (run `npm run init` if not)
- `.env` has a valid provider (mock is fine)
- Input file exists in `input/`

## Rules

- Never process files the user does not own or have permission to use
- Always show the review checklist after generation
- Never publish output without human review
- Default to mock provider if no API key is configured
