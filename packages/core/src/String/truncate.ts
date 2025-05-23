/**
 * Truncates a string to a specified length, adding '...' if necessary.
 *
 * @example
 * ```typescript
 * truncate('Hello World', 1); // 'Hello World'
 * truncate('Hello World', 5); // 'He...'
 * truncate('Hello World', 5,  { ellipsis: '[...]' }); // 'He[...]'
 * ```
 * @param self - The input string to truncate. If not provided or null/undefined,
 *                           will return the default truncation string ('...')
 * @param maxLength - The desired length of the output string
 */
export function truncate(self: string, maxLength: number, options: truncate.Options = truncate.defaultOptions): string {
  const { ellipsis = truncate.defaultOptions.ellipsis } = options;
  if (self.length > maxLength) {
    const end = maxLength - ellipsis.length;
    const truncated = self.slice(0, end);
    if (end < 1) {
      return ellipsis;
    }

    return `${truncated}${ellipsis}`;
  }
  return self;
}
export namespace truncate {
  export type Options = {
    ellipsis?: string;
  };
  export const defaultOptions = {
    ellipsis: '...',
  } satisfies Options;
}
