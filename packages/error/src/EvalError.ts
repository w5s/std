import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.EvalError}
 *
 * The EvalError object indicates an error regarding the global eval() function. This exception is not thrown by JavaScript anymore, however the EvalError object remains for compatibility.
 *
 * @example
 * ```typescript
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
export interface EvalError extends Error {
  name: 'EvalError';
}
export const EvalError = globalThis.EvalError as unknown as {
  (message?: string, options?: ErrorOptions): EvalError;
  new (message?: string, options?: ErrorOptions): EvalError;
};
