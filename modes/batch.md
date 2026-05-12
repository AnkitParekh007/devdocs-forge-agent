# Mode: Batch Processing Rules

This mode describes how devdocs-forge-agent handles batch processing of multiple transcripts.

## Batch Behavior

When `devdocs-forge-agent batch --dir input/` is run:

1. All `.md` and `.txt` files in the specified directory are discovered
2. Files are processed sequentially (not in parallel) to avoid rate limiting
3. Each file gets its own output folder: `output/{slug}-{YYYY-MM-DD}/`
4. The output type defaults to `project.default_output_type` from config
5. Errors in one file do not stop processing of other files
6. A summary report is printed at the end

## Per-File Output

Each file produces:
- `output/{slug}-{date}/index.md` — main generated content
- `output/{slug}-{date}/metadata.json` — generation metadata
- `output/{slug}-{date}/review-checklist.md` — human review checklist
- `output/{slug}-{date}/source-summary.md` — input summary

## Batch Report Format

```
devdocs-forge-agent batch

Processing 3 files from input/

  OK   angular-signals-tutorial.md → output/angular-signals-tutorial-2025-01-15/
  OK   ai-agent-demo.md           → output/ai-agent-demo-2025-01-15/
  WARN product-demo.md            → Empty input file — skipped

Batch complete: 2 succeeded, 0 failed, 1 skipped
```

## Batch Rules for AI Agent

When generating content in batch mode:
- Apply the same quality rules as single-file generation
- Each file is processed independently — do not carry context between files
- Use the configured default output type for all files unless overridden
- Never skip the review checklist — every output needs one
- Log clearly which file failed and why, so users can fix and retry

## Adding Source URLs in Batch

To associate a source URL with a specific file in batch mode, add YAML frontmatter to the transcript:

```markdown
---
source_url: https://example.com/my-tutorial
---

# Tutorial content starts here...
```
