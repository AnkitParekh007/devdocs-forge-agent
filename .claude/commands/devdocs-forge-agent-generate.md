# /devdocs-forge-agent-generate

Generate documentation from a specific transcript file.

## Usage

```
/devdocs-forge-agent-generate
```

## Steps

1. List files in `input/` and ask the user which to process
2. Ask for output type (or use default from config)
3. Ask if they have a source URL to attribute
4. Run: `npm run generate -- --file <file> --type <type> [--source-url <url>]`
5. Show the output directory path
6. Remind the user to open `review-checklist.md`

## Available Output Types

- docusaurus, blog, docs, gitbook, readme, faq, troubleshooting, lesson, social, changelog, seo

## Notes

- Use mock provider by default (no API key needed)
- Generated files never overwrite previous runs
