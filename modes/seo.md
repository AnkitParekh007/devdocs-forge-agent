# Mode: SEO Metadata

Generate SEO metadata and keyword suggestions from the provided transcript.

## Output Format

Generate a structured metadata block, then supporting content:

```markdown
# SEO Metadata: [Topic]

## Primary Metadata

- **Title tag:** [60-70 chars, includes primary keyword]
- **Meta description:** [150-160 chars, includes primary keyword, compelling CTA]
- **Canonical URL suggestion:** /docs/[kebab-slug]
- **Primary keyword:** [main target keyword phrase]
- **Secondary keywords:** [3-5 related phrases]

## Open Graph Tags

```html
<meta property="og:title" content="[OG Title — can be longer than title tag]" />
<meta property="og:description" content="[OG description]" />
<meta property="og:type" content="article" />
```

## Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Twitter title]" />
<meta name="twitter:description" content="[Twitter description — 200 chars max]" />
```

## Keyword Analysis

| Keyword | Intent | Difficulty | Notes |
|---------|--------|------------|-------|
| [keyword 1] | Informational | Low | Target in title |
| [keyword 2] | Tutorial | Medium | Use in H2 headings |

## Content Recommendations

Based on the transcript, consider adding:
- [suggestion 1]
- [suggestion 2]

## Internal Link Suggestions

- Link to: [related topic 1]
- Link from: [related topic 2]
```

## Writing Guidelines

- Title tag: include the primary keyword in the first 60 characters
- Meta description: write as a value proposition, not a summary
- Do not keyword stuff — natural language only
- Primary keyword should appear in: title, first paragraph, at least one H2, meta description
- Suggest keywords that match developer search intent (e.g., "how to use X", "X tutorial", "X vs Y")
- Focus on long-tail keywords — more specific = easier to rank for in technical niches
