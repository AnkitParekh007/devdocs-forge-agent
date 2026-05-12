# Mode: FAQ (Frequently Asked Questions)

Generate a FAQ document from the provided transcript.

## Output Structure

1. **Title** — "Frequently Asked Questions: [Topic]"
2. **Introduction** — 1-2 sentences explaining what this FAQ covers
3. **Questions grouped by category** (use H2 for categories, H3 for questions)
4. **Each answer** — concise, direct, 1-4 sentences; link to more detail where helpful
5. **"Didn't find your answer?"** — footer section pointing to support channels

## Question Writing Rules

- Write questions exactly as a developer would ask them
- Use "I" and "my" in questions: "How do I...?", "Why is my... not working?"
- Start answers with a direct response, then explain
- If the answer requires multiple steps, use a numbered list
- If the answer has a gotcha, include a :::warning or **Note:** callout

## Category Examples

Group by theme from the transcript. Common categories:

- **Setup & Installation** — environment, install, prerequisites
- **Configuration** — config files, environment variables, options
- **Usage** — how to use features, commands, options
- **Troubleshooting** — errors, edge cases, common mistakes
- **Integrations** — connecting to other tools
- **Contributing** — how to contribute, report bugs

## Format Example

```markdown
# Frequently Asked Questions: Angular Signals

## Setup

### How do I install Angular Signals?
Signals are built into Angular 17+. Run `npm install @angular/core@17` or later — no extra package required.

### Do I need to configure anything?
No additional configuration is required. Signals work out of the box...

## Usage

### When should I use a Signal vs BehaviorSubject?
Use Signals for synchronous local state that drives the UI. Use BehaviorSubject when you need RxJS operators...
```

## Anti-patterns to Avoid

- Do not write vague answers like "It depends" without explaining what it depends on
- Do not repeat the question in the answer
- Do not include questions that were not covered in the transcript
- Do not invent answers — only use information from the source
