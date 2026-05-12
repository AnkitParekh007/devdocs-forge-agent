import { z } from 'zod';

export const ConfigSchema = z.object({
  project: z
    .object({
      name: z.string().default('My Docs Project'),
      default_output_type: z.string().default('docusaurus'),
      output_dir: z.string().default('output'),
      input_dir: z.string().default('input'),
    })
    .default({}),

  model: z
    .object({
      provider: z.string().default('mock'),
      temperature: z.number().min(0).max(2).default(0.3),
      max_tokens: z.number().int().positive().default(6000),
    })
    .default({}),

  writing: z
    .object({
      audience: z.string().default('intermediate developers'),
      tone: z.string().default('clear, practical, friendly'),
      style: z.string().default('developer documentation'),
      include_summary: z.boolean().default(true),
      include_faq: z.boolean().default(true),
      include_troubleshooting: z.boolean().default(true),
      include_code_explanations: z.boolean().default(true),
      include_review_checklist: z.boolean().default(true),
    })
    .default({}),

  docusaurus: z
    .object({
      sidebar_position: z.number().int().default(1),
      tags: z.array(z.string()).default(['tutorial', 'documentation']),
    })
    .default({}),

  safety: z
    .object({
      require_permission_notice: z.boolean().default(true),
      require_human_review: z.boolean().default(true),
      avoid_plagiarism: z.boolean().default(true),
      include_source_attribution: z.boolean().default(true),
    })
    .default({}),

  video_intake: z
    .object({
      enabled: z.boolean().default(true),
      allow_url_only_generation: z.boolean().default(false),
      require_transcript: z.boolean().default(true),
      allow_force_for_low_confidence: z.boolean().default(true),
      min_tech_confidence_score: z.number().int().default(60),
      min_transcript_words: z.number().int().default(150),
      allowed_domains: z
        .array(z.string())
        .default(['youtube.com', 'youtu.be', 'vimeo.com']),
      preferred_categories: z
        .array(z.string())
        .default(['Education', 'Science & Technology', 'Howto & Style']),
      technical_keywords: z
        .array(z.string())
        .default([
          'angular', 'react', 'vue', 'svelte', 'nextjs', 'nuxt', 'typescript',
          'javascript', 'python', 'rust', 'golang', 'java', 'kotlin', 'swift',
          'docker', 'kubernetes', 'terraform', 'aws', 'gcp', 'azure',
          'graphql', 'rest', 'api', 'microservices', 'devops', 'cicd',
          'testing', 'vitest', 'jest', 'playwright', 'cypress',
          'tutorial', 'course', 'walkthrough', 'coding', 'programming',
          'build', 'deploy', 'setup', 'install', 'configure', 'debug',
          'llm', 'ai', 'machine learning', 'deep learning', 'neural',
          'database', 'sql', 'mongodb', 'redis', 'postgresql',
        ]),
      blocked_keywords: z
        .array(z.string())
        .default([
          'song', 'music', 'trailer', 'prank', 'vlog', 'reaction',
          'gaming', 'gameplay', 'unboxing', 'review', 'shorts',
          'dance', 'funny', 'meme', 'challenge', 'tiktok',
        ]),
    })
    .default({}),
});

export type DocuForgeConfig = z.infer<typeof ConfigSchema>;
export type VideoIntakeConfig = z.infer<typeof ConfigSchema>['video_intake'];
