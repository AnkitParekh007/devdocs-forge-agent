# Building a Simple AI Agent with Node.js

All right, let's build a minimal AI agent from scratch. Not a framework, not a library wrapper, just raw Node.js and a direct API call so you can see exactly what is happening under the hood.

## What We Are Building

An agent is basically a loop. You give it a goal, it decides what tool to use, it runs the tool, it looks at the result, and it loops until it thinks it is done. That is the whole concept.

For our demo, we are building an agent that can:
1. Answer a question directly if it knows the answer
2. Search a small knowledge base if it does not
3. Return a final answer to the user

## Project Setup

```bash
mkdir my-agent
cd my-agent
npm init -y
npm install dotenv
```

Create a .env file with your API key. We will use Anthropic in this demo but the pattern works with any provider.

```
ANTHROPIC_API_KEY=your-key-here
```

## The Agent Loop

Here is the core structure. This is not production code, it is a learning demo:

```javascript
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new Anthropic();

async function runAgent(userQuestion) {
  const messages = [
    { role: 'user', content: userQuestion }
  ];

  // Simple single-turn for now — we'll add the loop next
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-latest',
    max_tokens: 1024,
    messages,
  });

  return response.content[0].text;
}

const answer = await runAgent('What is the capital of France?');
console.log(answer);
```

## Adding a Tool

Now let's add a simple search tool. In a real agent, this would call a search API or vector database. Here we are using a hardcoded knowledge base for clarity:

```javascript
const knowledgeBase = {
  'node version': 'The current LTS version of Node.js is 20.x',
  'typescript release': 'TypeScript 5.5 was released in June 2024',
};

function searchKnowledge(query) {
  const key = Object.keys(knowledgeBase).find(k =>
    query.toLowerCase().includes(k)
  );
  return key ? knowledgeBase[key] : null;
}
```

## The Full Agent

The agent checks the tool first, then falls back to the model:

```javascript
async function agent(question) {
  // Step 1: Try the tool
  const toolResult = searchKnowledge(question);

  if (toolResult) {
    console.log('[Tool] Found answer in knowledge base');
    return toolResult;
  }

  // Step 2: Ask the model
  console.log('[LLM] Asking the model...');
  return await runAgent(question);
}
```

## Key Takeaways

This demo shows the fundamental pattern: tools first, model as fallback. Real production agents add retries, tool selection by the model, memory, and multi-step reasoning. But the loop is always the same.

For learning more, check out the Anthropic documentation on tool use and the various open-source agent frameworks like LangChain, LlamaIndex, and the Anthropic Agent SDK.

That is the demo. Let me know what you want to build next.
