import { logger } from '../../utils/logger.js';

interface ProviderInfo {
  name: string;
  label: string;
  envKey: string;
  modelEnv: string;
  defaultModel: string;
  note: string;
}

const PROVIDERS: ProviderInfo[] = [
  {
    name: 'mock',
    label: 'Mock (built-in)',
    envKey: '(none required)',
    modelEnv: '(none)',
    defaultModel: 'mock-v1',
    note: 'Default. No API key needed. Great for testing.',
  },
  {
    name: 'openai',
    label: 'OpenAI',
    envKey: 'OPENAI_API_KEY',
    modelEnv: 'OPENAI_MODEL',
    defaultModel: 'gpt-4.1-mini',
    note: 'https://platform.openai.com/api-keys',
  },
  {
    name: 'anthropic',
    label: 'Anthropic Claude',
    envKey: 'ANTHROPIC_API_KEY',
    modelEnv: 'ANTHROPIC_MODEL',
    defaultModel: 'claude-3-5-sonnet-latest',
    note: 'https://console.anthropic.com/',
  },
  {
    name: 'gemini',
    label: 'Google Gemini',
    envKey: 'GEMINI_API_KEY',
    modelEnv: 'GEMINI_MODEL',
    defaultModel: 'gemini-2.0-flash',
    note: 'https://aistudio.google.com/',
  },
  {
    name: 'ollama',
    label: 'Ollama (local)',
    envKey: '(none required)',
    modelEnv: 'OLLAMA_MODEL',
    defaultModel: 'llama3',
    note: 'Local HTTP API at OLLAMA_BASE_URL, default http://localhost:11434',
  },
];

export async function providersCommand(): Promise<void> {
  logger.section('devdocs-forge-agent providers');

  const active = process.env.DEVDOCS_PROVIDER ?? 'mock';

  for (const p of PROVIDERS) {
    const arrow = p.name === active ? '\x1b[32m→\x1b[0m' : ' ';
    const label = p.name === active ? `\x1b[1m${p.label}\x1b[0m  \x1b[32m(active)\x1b[0m` : p.label;
    console.log(`  ${arrow}  ${label}`);
    console.log(`       Key env: ${p.envKey}`);
    console.log(`       Model env: ${p.modelEnv}  (default: ${p.defaultModel})`);
    console.log(`       ${p.note}`);
    logger.line();
  }

  logger.dim('Set DEVDOCS_PROVIDER in your .env to switch providers.');
  logger.dim('Want to add Ollama, Groq, or OpenRouter? See docs/PROVIDERS.md');
}
