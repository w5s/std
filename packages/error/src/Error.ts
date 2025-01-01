/* eslint-disable prefer-destructuring */
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
// @ts-ignore Ignore duplicate
export declare class Error {
  /**
   * Error name
   */
  name: 'Error';

  /**
   * Error message
   */
  message: string;

  /**
   * Error stack description (when supported)
   */
  stack?: string;

  /**
   * Error cause
   */
  cause?: unknown;

  /**
   * Error constructor
   *
   * @param message - the error message
   * @param options - the error options
   */
  constructor(message?: string, options?: ErrorOptions);
}
// @ts-ignore Ignore duplicate
export declare function Error(message?: string, options?: ErrorOptions): Error;

// @ts-ignore Ignore duplicate
export const Error: typeof Error = globalThis.Error;
