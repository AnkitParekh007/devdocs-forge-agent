# /devdocs-forge-agent-doctor

Run setup diagnostics and fix any issues.

## Usage

```
/devdocs-forge-agent-doctor
```

## Steps

1. Run: `npm run doctor`
2. Analyze the output
3. For each WARN: suggest the fix command
4. For each FAIL: explain the cause and exact fix steps
5. Re-run doctor after fixes to confirm resolution

## Common Fixes

| Issue | Fix |
|-------|-----|
| config missing | `npm run init` |
| .env missing | `cp .env.example .env` |
| API key missing | Edit `.env` and set the key |
| input/ missing | `npm run init` |
| Node.js too old | Upgrade to Node.js 18+ |
