# Safety & Responsible Use

## The One Rule That Matters Most

**Only use transcripts you own, created, or have explicit permission to process.**

devdocs-forge-agent is built for:
- Your own recorded tutorials, talks, and demos
- Your internal training notes
- Content you are licensed or authorized to document
- Your personal learning notes from sessions you attended

---

## What This Tool Does NOT Do

devdocs-forge-agent intentionally does not include:
- YouTube transcript scraping
- Video downloading
- Platform API access to extract content
- Any mechanism to pull content from third-party platforms

If you want to document a YouTube tutorial, contact the creator and ask for their transcript or permission.

---

## AI Hallucination Risk

AI systems can and do make mistakes. Generated documentation may contain:
- Incorrect function names or API signatures
- Wrong configuration values
- Invented package versions or deprecated APIs
- Inaccurate steps or explanations

**Always review generated documentation before publishing.** The review checklist in every output folder is there for a reason.

---

## Attribution Best Practices

If you process a transcript that belongs to someone else (with permission):
- Include a clear "Source:" attribution in the generated doc
- Credit the original creator
- Link to the original content
- Note that the doc is AI-generated from a transcript

Use the `--source-url` flag to include source attribution automatically:

```bash
npm run generate -- --file input/tutorial.md --type docusaurus --source-url https://example.com/tutorial
```

---

## Platform Terms of Service

When using content from any platform (YouTube, Coursera, Udemy, etc.):
- Read and follow their Terms of Service
- Respect creators' stated usage preferences
- Do not use content in ways the creator has not authorized
- Do not publish AI-generated docs that reproduce substantial portions of copyrighted content

---

## Copyright and Plagiarism

Using devdocs-forge-agent to plagiarize tutorial creators is:
- Against the purpose of this tool
- Potentially a copyright violation
- Harmful to the creator community

Document your own work. Give credit for others'.
