# Skill: devdocs-forge-agent

Convert tutorial transcripts and notes into structured developer documentation.

## Trigger Conditions

Use this skill when the user wants to:
- Convert a transcript to documentation
- Generate a blog post from a tutorial recording
- Create Docusaurus or GitBook pages from notes
- Generate FAQs or troubleshooting guides from demo walkthroughs
- Process multiple transcripts in batch

## Setup Check

Before using this skill, verify the environment:

```bash
npm run doctor
```

Fix any FAIL statuses before proceeding.

## Core Commands

```bash
# Single file
npm run generate -- --file input/transcript.md --type docusaurus

# Batch
npm run batch -- --dir input/

# Verify outputs
npm run verify
```

## Skill Rules

1. Only process transcripts the user owns or has permission to use
2. Default to mock provider (no API key needed)
3. Always review generated output before publishing
4. Include source attribution when a source URL is available
5. Never log or display API keys
6. Always generate a review checklist with each output

## Output Location

Generated files are in `output/{slug}-{YYYY-MM-DD}/`.
Key file: `output/{slug}-{date}/review-checklist.md` — must be reviewed before publishing.

## References

- [AGENTS.md](../../../AGENTS.md) — full agent instructions
- [docs/USAGE.md](../../../docs/USAGE.md) — all commands
- [docs/MODES.md](../../../docs/MODES.md) — output mode descriptions
