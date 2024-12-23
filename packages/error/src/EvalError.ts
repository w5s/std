/* eslint-disable unicorn/custom-error-definition */
/* eslint-disable prefer-destructuring */

import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.EvalError}
 *
 * @example
 * ```ts
 * import { EvalError } from '@w5s/error';
 *
 * try {
 *   throw new EvalError("Hello");
 * } catch (e) {
 *   console.log(e instanceof RangeEvalErrorError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "EvalError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class EvalError extends Error {
  name: 'EvalError';
}
// @ts-ignore Ignore duplicate
export declare function EvalError(message?: string, options?: ErrorOptions): EvalError;
// @ts-ignore Ignore duplicate
export const EvalError = globalThis.EvalError;
