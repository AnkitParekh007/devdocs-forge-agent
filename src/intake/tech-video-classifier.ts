import type { VideoMetadata, TechVideoClassificationResult, VideoIntakeConfig } from './video-metadata.types.js';

const DEFAULT_TECH_KEYWORDS = [
  'angular', 'react', 'vue', 'svelte', 'nextjs', 'nuxt', 'remix',
  'javascript', 'typescript', 'node', 'nodejs', 'nestjs', 'express',
  'python', 'java', 'spring', 'go', 'rust', 'kotlin', 'swift',
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'devops', 'terraform',
  'api', 'database', 'sql', 'mongodb', 'postgres', 'redis',
  'ai agent', 'llm', 'rag', 'mcp', 'openai', 'anthropic', 'gemini', 'langchain',
  'tutorial', 'course', 'walkthrough', 'coding', 'build', 'crash course',
  'programming', 'developer', 'software', 'framework', 'library',
  'ci/cd', 'github actions', 'testing', 'deployment',
];

const DEFAULT_BLOCKED_KEYWORDS = [
  'music', 'song', 'mv', 'official audio', 'lyric video',
  'movie', 'film', 'trailer', 'short film',
  'vlog', 'daily vlog', 'travel vlog',
  'prank', 'challenge', 'reaction',
  'gameplay', 'gaming', 'let\'s play', 'speedrun',
  'comedy', 'skit', 'meme',
  'sports', 'nba', 'nfl', 'soccer', 'football',
  'news', 'politics', 'debate',
  'cooking', 'recipe', 'food',
];

const TECH_CATEGORY_NAMES = ['science & technology', 'education', 'howto & style'];
const NON_TECH_CATEGORY_NAMES = ['music', 'entertainment', 'sports', 'gaming', 'comedy'];

/**
 * Classifies whether a video is likely a technical/tutorial video using keyword scoring.
 * Pure function — no I/O, no API calls.
 */
export function classifyTechVideo(
  metadata: Partial<VideoMetadata>,
  config?: Partial<VideoIntakeConfig>,
): TechVideoClassificationResult {
  const techKeywords = config?.technical_keywords ?? DEFAULT_TECH_KEYWORDS;
  const blockedKeywords = config?.blocked_keywords ?? DEFAULT_BLOCKED_KEYWORDS;
  const minScore = config?.min_tech_confidence_score ?? 60;

  let score = 0;
  const positiveSignals: string[] = [];
  const negativeSignals: string[] = [];
  const warnings: string[] = [];

  const titleLower = (metadata.title ?? '').toLowerCase();
  const descLower = (metadata.description ?? '').toLowerCase().slice(0, 2000);
  const tagsLower = (metadata.tags ?? []).map((t) => t.toLowerCase());
  const categoryLower = (metadata.categoryName ?? '').toLowerCase();

  // Strong tech keyword in title (+30)
  const strongTechInTitle = techKeywords.find((kw) => titleLower.includes(kw));
  if (strongTechInTitle) {
    score += 30;
    positiveSignals.push(`title contains "${strongTechInTitle}" (+30)`);
  }

  // Description has technical keyword (+20, once)
  const techInDesc = techKeywords.find((kw) => descLower.includes(kw));
  if (techInDesc) {
    score += 20;
    positiveSignals.push(`description mentions "${techInDesc}" (+20)`);
  }

  // Tags contain programming terms (+15)
  const techInTags = tagsLower.find((tag) => techKeywords.some((kw) => tag.includes(kw)));
  if (techInTags) {
    score += 15;
    positiveSignals.push(`tags include "${techInTags}" (+15)`);
  }

  // Category is tech-friendly (+20)
  if (TECH_CATEGORY_NAMES.some((cat) => categoryLower.includes(cat))) {
    score += 20;
    positiveSignals.push(`category is "${metadata.categoryName}" (+20)`);
  }

  // Duration > 3 minutes (+10)
  if (metadata.durationSeconds && metadata.durationSeconds > 180) {
    score += 10;
    positiveSignals.push(`duration > 3 minutes (+10)`);
  }

  // Negative keyword in title (-30)
  const blockedInTitle = blockedKeywords.find((kw) => titleLower.includes(kw));
  if (blockedInTitle) {
    score -= 30;
    negativeSignals.push(`title contains "${blockedInTitle}" (-30)`);
  }

  // Non-tech category (-20)
  if (NON_TECH_CATEGORY_NAMES.some((cat) => categoryLower.includes(cat))) {
    score -= 20;
    negativeSignals.push(`category is "${metadata.categoryName}" (-20)`);
  }

  // No metadata available at all — can't classify well
  if (!metadata.title && !metadata.description && !metadata.categoryName) {
    warnings.push('No video metadata available — classification is based on URL only');
    score = Math.max(score, 0);
  } else if (!metadata.title) {
    warnings.push('Video title not available — classification accuracy reduced');
  }

  // Apply minimum of 0
  const finalScore = Math.max(0, score);

  const confidence: 'low' | 'medium' | 'high' =
    finalScore >= minScore ? 'high' : finalScore >= 35 ? 'medium' : 'low';

  return {
    isLikelyTechVideo: finalScore >= 35,
    confidence,
    score: finalScore,
    positiveSignals,
    negativeSignals,
    warnings,
  };
}

/** Format duration seconds as mm:ss or h:mm:ss */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
