import type { Int } from '../Int.js';

/**
 * Truncates a string to a specified length, adding '...' if necessary.
 *
 * @example
 * ```typescript
 * truncate('Hello World', { maxLength: 1 }); // 'Hello World'
 * truncate('Hello World', { maxLength: 5 }); // 'He...'
 * truncate('Hello World', { maxLength: 5, ellipsis: '[...]' }); // 'He[...]'
 * ```
 * @param self - The input string to truncate. If not provided or null/undefined,
 *                           will return the default truncation string ('...')
 * @param options - An optional object containing additional options for the truncation.
 */
export function truncate(self: string, options: truncate.Options = truncate.defaultOptions): string {
  const { ellipsis, maxLength } = {
    ...truncate.defaultOptions,
    ...options,
  };
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
    /**
     * A string to append at the end of the truncated string if it is shorter than the `maxLength`
     */
    ellipsis?: string;
    /**
     * The desired length of the output string
     */
    maxLength?: number;
  };
  export const defaultOptions = {
    ellipsis: '...',
    maxLength: 30 as Int,
  } satisfies Options;
}
