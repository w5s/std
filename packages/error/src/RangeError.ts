/* eslint-disable unicorn/custom-error-definition */
/* eslint-disable prefer-destructuring */

import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.RangeError}
 *
 * A RangeError is thrown when trying to pass a value as an argument to a function that does not allow a range that includes the value.
 *
 * @example
 * ```typescript
 * import { RangeError } from '@w5s/error';
 *
 * try {
 *   throw new RangeError("Hello");
 * } catch (e) {
 *   console.log(e instanceof RangeError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "RangeError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class RangeError extends Error {
  name: 'RangeError';
}
// @ts-ignore Ignore duplicate
export declare function RangeError(message?: string, options?: ErrorOptions): RangeError;
// @ts-ignore Ignore duplicate
export const RangeError = globalThis.RangeError;
