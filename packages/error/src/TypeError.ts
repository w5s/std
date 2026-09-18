import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.TypeError}
 *
 * The TypeError object represents an error when an operation could not be performed, typically (but not exclusively) when a value is not of the expected type.
 *
 * @example
 * ```typescript
 * import { TypeError } from '@w5s/error';
 *
 * try {
 *   throw new TypeError("Hello");
 * } catch (e) {
 *   console.log(e instanceof TypeError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "TypeError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
export interface TypeError extends Error {
  name: 'TypeError';
}
export const TypeError = globalThis.TypeError as unknown as {
  (message?: string, options?: ErrorOptions): TypeError;
  new (message?: string, options?: ErrorOptions): TypeError;
};
