# Mode: General Documentation

Generate a general-purpose developer documentation page from the provided transcript.

## Output Structure

1. **Title** — Clear, descriptive H1
2. **Overview** — What this page covers (2-3 sentences)
3. **Prerequisites** — What the reader needs to know or have installed
4. **Core Concepts** — Explain the key ideas covered in the transcript
5. **Step-by-Step Instructions** — Numbered steps where applicable
6. **Code Examples** — Inline and block code with explanations
7. **Configuration Reference** — Tables for config options if present
8. **Troubleshooting** — Common issues and solutions (if mentioned in transcript)
9. **Summary** — What was covered
10. **Related Resources** — Links or topics to explore next
11. **Source Attribution** — Credit the original source if URL provided

## Writing Guidelines for Documentation Format

- Use imperative voice for instructions: "Click", "Run", "Open"
- Define technical terms on first use
- Use tables for parameter references and options
- Use numbered lists for sequential steps, bullets for unordered lists
- Keep each step focused on one action
- Include expected output after commands where helpful

## Audience Assumptions

- Developer audience familiar with the technology domain
- May be using this as a reference during implementation
- Needs enough context to understand but not so much as to be slowed down

## Documentation Standards

- Every code block must have a language tag
- Every major section must have an H2 heading
- Configuration examples must match reality — do not invent default values
- If a feature is experimental or beta, note it clearly
