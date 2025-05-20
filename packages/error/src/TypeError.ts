/* eslint-disable unicorn/custom-error-definition */
/* eslint-disable prefer-destructuring */
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
// @ts-ignore Ignore duplicate
export declare class TypeError extends Error {
  name: 'TypeError';
}
// @ts-ignore Ignore duplicate
export declare function TypeError(message?: string, options?: ErrorOptions): TypeError;
// @ts-ignore Ignore duplicate
export const TypeError = globalThis.TypeError;
