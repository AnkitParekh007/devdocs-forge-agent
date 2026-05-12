import { describe, it, expect } from 'vitest';
import { classifyTechVideo } from '../src/intake/tech-video-classifier.js';

describe('classifyTechVideo', () => {
  // ── High confidence ───────────────────────────────────────
  it('gives high confidence for strong tech title (angular tutorial)', () => {
    const result = classifyTechVideo({
      title: 'Angular Signals Tutorial — Complete Guide',
      description: 'Learn Angular signals in this step-by-step tutorial',
      tags: ['angular', 'signals', 'tutorial'],
      durationSeconds: 720,
    });
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.confidence).toBe('high');
    expect(result.isLikelyTechVideo).toBe(true);
    expect(result.positiveSignals.length).toBeGreaterThan(0);
  });

  it('gives high confidence when category is Science & Technology', () => {
    const result = classifyTechVideo({
      title: 'Build a REST API with Node.js',
      categoryName: 'Science & Technology',
      durationSeconds: 900,
    });
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.confidence).toBe('high');
    // Verify category signal was detected
    const hasCategory = result.positiveSignals.some((s) => s.includes('Science & Technology'));
    expect(hasCategory).toBe(true);
  });

  it('gives high confidence for Docker tutorial with all signals', () => {
    const result = classifyTechVideo({
      title: 'Docker Crash Course for Beginners',
      description: 'Complete docker tutorial covering containers and images',
      tags: ['docker', 'devops', 'containers'],
      categoryName: 'Education',
      durationSeconds: 2400,
    });
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.confidence).toBe('high');
  });

  // ── Low confidence ────────────────────────────────────────
  it('gives low confidence for music video', () => {
    const result = classifyTechVideo({
      title: 'Never Gonna Give You Up (Official Music Video)',
      categoryName: 'Music',
      durationSeconds: 213,
    });
    expect(result.score).toBeLessThan(35);
    expect(result.confidence).toBe('low');
    expect(result.isLikelyTechVideo).toBe(false);
    expect(result.negativeSignals.length).toBeGreaterThan(0);
  });

  it('gives low confidence for gaming content', () => {
    const result = classifyTechVideo({
      title: 'Epic Minecraft Gameplay 2024',
      categoryName: 'Gaming',
      durationSeconds: 1200,
    });
    expect(result.score).toBeLessThan(35);
    expect(result.confidence).toBe('low');
  });

  it('gives low confidence when no metadata is provided', () => {
    const result = classifyTechVideo({});
    expect(result.score).toBeLessThan(35);
    expect(result.confidence).toBe('low');
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toMatch(/no video metadata/i);
  });

  it('gives low confidence for a prank video title', () => {
    const result = classifyTechVideo({
      title: 'PRANK: I replaced my friends laptop!',
    });
    // -30 from "prank" keyword, no positive signals
    expect(result.score).toBeLessThan(35);
    expect(result.confidence).toBe('low');
  });

  // ── Medium confidence ─────────────────────────────────────
  it('gives medium confidence for mixed signals', () => {
    // Long video that mentions "coding" but short description, no category, no tags
    const result = classifyTechVideo({
      title: 'My coding journey — 2024 recap',
      durationSeconds: 1200,
    });
    // title has "coding" (+30), duration (+10) = 40, which is medium (35-59)
    expect(result.score).toBeGreaterThanOrEqual(35);
    expect(result.score).toBeLessThan(60);
    expect(result.confidence).toBe('medium');
  });

  // ── Score never goes below 0 ──────────────────────────────
  it('score is never negative', () => {
    const result = classifyTechVideo({
      title: 'music song reaction vlog prank gaming',
      categoryName: 'Entertainment',
    });
    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  // ── Category detection ────────────────────────────────────
  it('awards +20 for Education category', () => {
    const before = classifyTechVideo({ title: 'Some neutral video title' });
    const after = classifyTechVideo({
      title: 'Some neutral video title',
      categoryName: 'Education',
    });
    expect(after.score - before.score).toBe(20);
  });

  it('awards +20 for Howto & Style category', () => {
    const before = classifyTechVideo({ title: 'Some neutral video title' });
    const after = classifyTechVideo({
      title: 'Some neutral video title',
      categoryName: 'Howto & Style',
    });
    expect(after.score - before.score).toBe(20);
  });
});
