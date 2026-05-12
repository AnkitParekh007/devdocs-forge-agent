export interface GenerateOptions {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface Provider {
  /** Human-readable provider name */
  readonly name: string;
  /** Model identifier being used */
  readonly model: string;
  /** Generate text from a prompt */
  generate(options: GenerateOptions): Promise<string>;
}
