/* eslint-disable unicorn/custom-error-definition */
/* eslint-disable prefer-destructuring */
import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.ReferenceError}
 *
 * The ReferenceError object represents an error when a variable that doesn't exist (or hasn't yet been initialized) in the current scope is referenced.
 *
 * @example
 * ```typescript
 * import { ReferenceError } from '@w5s/error';
 *
 * try {
 *   throw new ReferenceError("Hello");
 * } catch (e) {
 *   console.log(e instanceof ReferenceError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "ReferenceError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class ReferenceError extends Error {
  name: 'ReferenceError';
}
// @ts-ignore Ignore duplicate
export declare function ReferenceError(message?: string, options?: ErrorOptions): ReferenceError;
// @ts-ignore Ignore duplicate
export const ReferenceError = globalThis.ReferenceError;
