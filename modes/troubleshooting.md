# Mode: Troubleshooting Guide

Generate a troubleshooting guide from the provided transcript.

## Output Structure

1. **Title** — "Troubleshooting: [Topic]"
2. **Before You Start** — quick checklist of things to verify first
3. **Common Errors** — H2 for each error category
4. **Each error entry** — symptom → cause → fix
5. **Diagnostic Checklist** — ordered list of debugging steps
6. **Still Stuck?** — escalation path (docs, issues, community)

## Error Entry Format

Use this format for each issue:

```markdown
### Error: [Error Message or Symptom]

**Symptom:** What the user sees (exact error message in backticks, or behavior description)

**Cause:** Why this happens

**Fix:**
\`\`\`bash
# Commands to resolve it
\`\`\`

Or: step-by-step instructions.

**Prevention:** How to avoid this in the future (if applicable)
```

## Writing Guidelines

- Lead with the exact error message when possible — users search for it
- Be specific about the cause — "npm version too old" not "environment issue"
- Every fix must be actionable — no "try reinstalling" without specific steps
- Use `code formatting` for all commands, file paths, and error messages
- If a fix has multiple steps, number them
- If there are multiple possible causes, present them as "Option A / Option B"

## Categories to Consider

Based on the transcript, organize by:
- Installation errors
- Configuration errors
- Runtime errors
- Build/compile errors
- Integration errors
- Performance issues
- Compatibility issues

## Diagnostic Section Format

```markdown
## Diagnostic Checklist

Before opening an issue, work through these steps:

1. Verify Node.js version: `node --version` (must be >= 18)
2. Check your config file is valid YAML
3. Confirm your API key is set in `.env`
4. Run `npm run doctor` to see a full status report
5. Check the [GitHub Issues](link) for known problems
```
