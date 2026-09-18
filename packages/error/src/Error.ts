import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.Error}
 *
 * @example
 * ```typescript
 * import { Error } from '@w5s/error';
 *
 * throw new Error('my message', { cause: someError });
 * ```
 */
export interface Error {
  /**
   * Error cause
   */
  cause?: unknown;

  /**
   * Error message
   */
  message: string;

  /**
   * Error name
   */
  name: 'Error';

  /**
   * Error stack description (when supported)
   */
  stack?: string;

}
export const Error = globalThis.Error as unknown as {
  (message?: string, options?: ErrorOptions): Error;
  new (message?: string, options?: ErrorOptions): Error;
};
