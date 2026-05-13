import http from 'http';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { logger } from '../../utils/logger.js';
import { DocuForgeError } from '../../utils/errors.js';

interface PreviewCommandOptions {
  port?: string;
  dir?: string;
}

const CSS = `
  body { font-family: system-ui, sans-serif; max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem; line-height: 1.7; color: #1a1a1a; }
  a { color: #0070f3; }
  pre { background: #f4f4f4; padding: 1rem; border-radius: 6px; overflow-x: auto; }
  code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; font-size: 0.9em; }
  pre code { background: none; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
  th { background: #f0f0f0; }
  h1, h2, h3 { margin-top: 2rem; }
`;

function indexPage(outputDir: string): string {
  const entries = fs.readdirSync(outputDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .sort((a, b) => b.name.localeCompare(a.name));

  const links = entries.length > 0
    ? entries.map(e => `<li><a href="/${e.name}/">📁 ${e.name}</a></li>`).join('\n')
    : '<li><em>No output found — run <code>npm run generate</code> first.</em></li>';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>devdocs-forge-agent Preview</title><style>${CSS}</style></head><body>
    <h1>📄 devdocs-forge-agent Preview</h1>
    <p>Click a directory to browse its files:</p>
    <ul>${links}</ul>
    <hr><p style="color:#888;font-size:0.85rem">Serving: <code>${outputDir}</code></p>
  </body></html>`;
}

function directoryPage(dirPath: string, dirName: string, urlBase: string): string {
  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md') || f.endsWith('.json'))
    .sort();

  const links = files
    .map(f => `<li><a href="${urlBase}${f}">${f.endsWith('.md') ? '📝' : '📋'} ${f}</a></li>`)
    .join('\n');

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${dirName}</title><style>${CSS}</style></head><body>
    <p><a href="/">← All outputs</a></p>
    <h1>${dirName}</h1>
    <ul>${links}</ul>
  </body></html>`;
}

function markdownPage(filePath: string): string {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const body = marked(raw) as string;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${path.basename(filePath)}</title><style>${CSS}</style></head><body>
    <p><a href="javascript:history.back()">← Back</a></p>
    <hr>
    ${body}
  </body></html>`;
}

function handleRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  outputDir: string
): void {
  const urlPath = decodeURIComponent(req.url ?? '/');
  const fsPath = path.join(outputDir, urlPath.replace(/^\//, ''));

  // Security: block path traversal
  if (!fsPath.startsWith(outputDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  if (urlPath === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexPage(outputDir));
    return;
  }

  if (urlPath.endsWith('/') && fs.existsSync(fsPath) && fs.statSync(fsPath).isDirectory()) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(directoryPage(fsPath, path.basename(fsPath), urlPath));
    return;
  }

  if (fsPath.endsWith('.md') && fs.existsSync(fsPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(markdownPage(fsPath));
    return;
  }

  if (fsPath.endsWith('.json') && fs.existsSync(fsPath)) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(fs.readFileSync(fsPath, 'utf-8'));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
}

export async function previewCommand(opts: PreviewCommandOptions): Promise<void> {
  const port = parseInt(opts.port ?? '4000', 10);
  const outputDir = path.resolve(opts.dir ?? 'output');

  if (!fs.existsSync(outputDir)) {
    throw new DocuForgeError(
      `Output directory not found: ${outputDir}`,
      'MISSING_OUTPUT_DIR',
      'Run npm run generate or npm run demo first.',
    );
  }

  logger.section('devdocs-forge-agent preview');

  const server = http.createServer((req, res) => {
    handleRequest(req, res, outputDir);
  });

  server.listen(port, () => {
    logger.ok(`Preview server running at http://localhost:${port}`);
    logger.info(`Serving: ${outputDir}`);
    logger.dim('Press Ctrl+C to stop.');
  });

  process.on('SIGINT', () => {
    logger.line();
    logger.info('Shutting down preview server...');
    server.close(() => process.exit(0));
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });

  // Keep the process alive
  await new Promise(() => {});
}
