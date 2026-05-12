# Mode: Social Media Post Summaries

Generate social media post summaries from the provided transcript.

## Outputs to Generate

Generate all three formats in a single output, separated by clear headers:

### 1. LinkedIn Post (~150-300 words)

Structure:
- Hook — 1 bold statement or question on the first line (before the fold)
- Context — 2-3 sentences on why this matters
- Key insight — the main takeaway in plain language
- 3-5 bullet points with specifics from the transcript
- Call to action — "Follow for more", "Link in comments", etc.
- 3-5 hashtags

### 2. X (Twitter) Thread (5-7 tweets)

Structure:
- Tweet 1: Hook — strong statement of the topic (< 280 chars)
- Tweets 2-5: One insight or step per tweet
- Tweet 6: Summary tweet — "Here's what we covered:" + 3 bullets
- Tweet 7: CTA — like, follow, repost, or link to the full doc

Format each tweet with a number: `1/7`, `2/7`, etc.

### 3. dev.to / Hashnode Intro (~100 words)

Structure:
- 1-2 sentence hook
- 3-5 bullet teaser of what the article covers
- "Read the full guide:" + [placeholder link]

## Writing Guidelines for Social

- Write for scanning, not reading — key points must be visible at a glance
- Use emoji sparingly and purposefully (LinkedIn and dev.to tolerate more than X)
- Avoid jargon the target audience wouldn't know
- Never include placeholder API keys or sensitive info
- Do not invent statistics or performance benchmarks not in the transcript
- The goal is to drive clicks to the full documentation

## Hashtag Guidelines

- LinkedIn: 3-5 hashtags at the end, common dev hashtags (#webdev, #typescript, #tutorial)
- X: 1-2 inline hashtags max — do not stuff them
- dev.to: tags are set in the article metadata, not in the post body
