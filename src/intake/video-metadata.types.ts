export interface VideoMetadata {
  platform: 'youtube' | 'vimeo' | 'unknown';
  videoId?: string;
  url: string;
  title?: string;
  description?: string;
  channelTitle?: string;
  categoryId?: string;
  categoryName?: string;
  tags?: string[];
  durationSeconds?: number;
  publishedAt?: string;
}

export interface TranscriptValidationResult {
  hasTranscript: boolean;
  wordCount: number;
  /** True if word count >= min_transcript_words (default 150) */
  isLongEnough: boolean;
  warnings: string[];
  errors: string[];
}

export interface TechVideoClassificationResult {
  isLikelyTechVideo: boolean;
  confidence: 'low' | 'medium' | 'high';
  score: number;
  positiveSignals: string[];
  negativeSignals: string[];
  warnings: string[];
}

export interface IntakeValidationResult {
  canGenerate: boolean;
  urlValid: boolean;
  transcriptValid: boolean;
  techVideoValid: boolean;
  metadata?: VideoMetadata;
  transcript?: TranscriptValidationResult;
  classification?: TechVideoClassificationResult;
  errors: string[];
  warnings: string[];
}

/** Config subset relevant to intake validation */
export interface VideoIntakeConfig {
  enabled: boolean;
  allow_url_only_generation: boolean;
  require_transcript: boolean;
  allow_force_for_low_confidence: boolean;
  min_tech_confidence_score: number;
  min_transcript_words: number;
  allowed_domains: string[];
  preferred_categories: string[];
  technical_keywords: string[];
  blocked_keywords: string[];
}
