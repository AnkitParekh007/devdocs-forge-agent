# Examples

Three example transcripts are included in `examples/transcripts/`. Copy them to `input/` with:

```bash
npm run examples
```

---

## Example 1: Angular Signals Tutorial

**File:** `examples/transcripts/angular-signals-tutorial.md`
**Topic:** Angular 17 Signals — reactive state management
**Good for:** Testing docusaurus, blog, faq modes

```bash
npm run generate -- --file input/angular-signals-tutorial.md --type docusaurus
npm run generate -- --file input/angular-signals-tutorial.md --type blog
npm run generate -- --file input/angular-signals-tutorial.md --type faq
```

See expected output in `examples/outputs/docusaurus-page.md` and `examples/outputs/blog-post.md`.

---

## Example 2: AI Agent Demo

**File:** `examples/transcripts/ai-agent-demo.md`
**Topic:** Building a minimal AI agent with Node.js
**Good for:** Testing docs, readme, lesson modes

```bash
npm run generate -- --file input/ai-agent-demo.md --type docs
npm run generate -- --file input/ai-agent-demo.md --type readme
npm run generate -- --file input/ai-agent-demo.md --type lesson
```

---

## Example 3: Product Demo Walkthrough

**File:** `examples/transcripts/product-demo.md`
**Topic:** Internal SaaS product walkthrough
**Good for:** Testing troubleshooting, faq, social modes

```bash
npm run generate -- --file input/product-demo.md --type faq
npm run generate -- --file input/product-demo.md --type troubleshooting
npm run generate -- --file input/product-demo.md --type social
```

---

## Adding Your Own Transcript

1. Create a Markdown or text file in `input/`
2. Optionally add YAML frontmatter with a source URL
3. Run generate with your preferred output type

Example transcript format:
```markdown
---
source_url: https://example.com/my-tutorial
---

# Tutorial Title

Introduction paragraph...

## Section 1

Content...
```

---

## Using With a Real API Key

Switch from mock to a real provider for production-quality output:

```bash
# In .env:
DEVDOCS_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Then generate:
npm run generate -- --file input/angular-signals-tutorial.md --type docusaurus
```

The output quality with a real provider is significantly better than mock mode.
