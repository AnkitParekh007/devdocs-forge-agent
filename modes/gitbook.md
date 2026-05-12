# Mode: GitBook Documentation Page

Generate a documentation page formatted for GitBook.

## GitBook Formatting Rules

GitBook uses standard Markdown with a few conventions:
- No frontmatter required (GitBook uses SUMMARY.md for navigation)
- Use H1 for page title
- Use H2/H3 for sections
- Hint blocks replace admonitions

## GitBook Hint Blocks

Use GitBook hint syntax for callouts:

```markdown
{% hint style="info" %}
This is an info note.
{% endhint %}

{% hint style="warning" %}
This is a warning.
{% endhint %}

{% hint style="danger" %}
Critical information.
{% endhint %}

{% hint style="success" %}
Success or tip.
{% endhint %}
```

## Output Structure

1. **Title** — H1 page title
2. **Overview** — 2-3 sentence intro (no heading needed)
3. **Prerequisites** — H2 section
4. **Core Concepts** — H2 sections for each major concept
5. **Step-by-step guide** — numbered steps with code examples
6. **Configuration** — table or code blocks for config values
7. **Common Issues** — quick troubleshooting if present in transcript
8. **Summary** — brief recap
9. **Source** — attribution footer if source URL provided

## Tables in GitBook

GitBook renders standard Markdown tables:

```markdown
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| name   | string | "" | The display name |
```

## Page Navigation Hint

End each page with a suggestion for what to read next, formatted as:

```markdown
---
*Continue to [Next Topic](./next-topic.md) →*
```
