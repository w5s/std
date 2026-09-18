import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.SyntaxError}
 *
 * The SyntaxError object represents an error when trying to interpret syntactically invalid code. It is thrown when the JavaScript engine encounters tokens or token order that does not conform to the syntax of the language when parsing code.
 *
 * @example
 * ```typescript
 * import { SyntaxError } from '@w5s/error';
 *
 * try {
 *   throw new SyntaxError("Hello");
 * } catch (e) {
 *   console.log(e instanceof SyntaxError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "SyntaxError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
export interface SyntaxError extends Error {
  name: 'SyntaxError';
}
export const SyntaxError = globalThis.SyntaxError as unknown as {
  (message?: string, options?: ErrorOptions): SyntaxError;
  new (message?: string, options?: ErrorOptions): SyntaxError;
};
