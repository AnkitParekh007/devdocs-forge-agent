#!/usr/bin/env node
/**
 * devdocs-forge-agent — one-command demo
 *
 * Forces mock mode so the demo works without any API key.
 * Run: npm run demo
 */

import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Force mock mode — demo must work without API keys
const env = { ...process.env, DEVDOCS_PROVIDER: 'mock' };

const tsx = resolve(root, 'node_modules', '.bin', 'tsx');
const cli = resolve(root, 'src', 'cli', 'index.ts');

const run = (args) => {
  execSync(`"${tsx}" "${cli}" ${args}`, {
    stdio: 'inherit',
    env,
    cwd: root,
  });
};

console.log('');
console.log('  devdocs-forge-agent — demo (mock mode, no API key needed)');
console.log('  ──────────────────────────────────────────────────────────');
console.log('');

run('doctor');
console.log('');
run('examples');
console.log('');
run('generate --file examples/transcripts/angular-signals-tutorial.md --type docusaurus');
console.log('');
run('verify');
