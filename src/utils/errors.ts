export class DocuForgeError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly hint?: string,
  ) {
    super(message);
    this.name = 'DocuForgeError';
  }
}

export function handleError(error: unknown): never {
  if (error instanceof DocuForgeError) {
    console.error(`\n  \x1b[31m\x1b[1mError:\x1b[0m ${error.message}`);
    if (error.hint) {
      console.error(`  \x1b[2mHint: ${error.hint}\x1b[0m`);
    }
  } else if (error instanceof Error) {
    console.error(`\n  \x1b[31m\x1b[1mUnexpected error:\x1b[0m ${error.message}`);
  } else {
    console.error(`\n  \x1b[31m\x1b[1mUnknown error\x1b[0m`);
  }
  process.exit(1);
}
