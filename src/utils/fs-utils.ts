import fs from 'node:fs';
import path from 'node:path';
import { DocuForgeError } from './errors.js';

export function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function readFile(filePath: string): string {
  if (!fileExists(filePath)) {
    throw new DocuForgeError(
      `File not found: ${filePath}`,
      'FILE_NOT_FOUND',
      `Check the path and try again.`,
    );
  }
  return fs.readFileSync(filePath, 'utf-8');
}

export function writeFile(filePath: string, content: string): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
}

export function listFiles(dirPath: string, extensions: string[]): string[] {
  if (!fileExists(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => extensions.some((ext) => f.endsWith(ext)))
    .map((f) => path.join(dirPath, f));
}

export function listDirs(dirPath: string): string[] {
  if (!fileExists(dirPath)) return [];
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(dirPath, d.name));
}

export function copyFile(src: string, dest: string): void {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
