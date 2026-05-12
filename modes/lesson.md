# Mode: Course Lesson Page

Generate a course lesson page from the provided transcript.

## Output Structure

1. **Lesson Title** — H1 with a clear, outcome-focused title
2. **Learning Objectives** — 3-5 bullet points starting with action verbs: "By the end of this lesson, you will be able to..."
3. **Estimated Time** — rough estimate if determinable from content length
4. **Prerequisites** — what the student needs to know before this lesson
5. **Introduction** — 1-2 paragraphs setting the context
6. **Core Content** — H2 sections covering each concept or step
7. **Knowledge Checks** — 2-3 questions the student should be able to answer (no answers — reflection only)
8. **Hands-on Exercise** — a practical task based on the lesson content
9. **Summary** — recap of key points
10. **Next Lesson** — brief teaser for what comes next (if determinable)

## Writing Guidelines for Course Format

- Write in the second person: "you will", "your code", "try running"
- Use encouraging, patient language — students may be struggling
- Break complex concepts into small, digestible chunks
- Repeat key terms — repetition aids learning
- Highlight new vocabulary with **bold** on first use
- Use analogies to connect new concepts to familiar ones

## Exercise Format

```markdown
## Hands-on Exercise

**Goal:** [Clear, one-sentence objective]

**Instructions:**
1. Open your code editor and create a new file called `example.ts`
2. Add the following code...
3. Run it with: `npm run dev`
4. You should see: [expected output]

**Challenge (optional):** [A stretch goal for advanced students]
```

## Knowledge Check Format

```markdown
## Knowledge Check

Take a moment to think through these questions:

1. What is the difference between X and Y in this context?
2. When would you use approach A over approach B?
3. What would happen if you skipped step 3?

*(Answers are in the next lesson — try to work through these yourself first.)*
```
