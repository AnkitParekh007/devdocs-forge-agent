# /devdocs-forge-agent-batch

Process all transcripts in a directory.

## Usage

```
/devdocs-forge-agent-batch
```

## Steps

1. Ask the user which directory to process (default: `input/`)
2. Ask for output type (default: from config)
3. List the files that will be processed
4. Run: `npm run batch -- --dir <dir> [--type <type>]`
5. Show the batch summary
6. Run `npm run verify` on all outputs

## Notes

- Processes `.md` and `.txt` files only
- Each file gets its own output folder
- Errors in one file do not stop other files
- Review `review-checklist.md` in each output folder before publishing
