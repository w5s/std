import type { ErrorOptions } from './ErrorOptions.js';

/**
 * Alias to native {@link globalThis.URIError}
 *
 * The URIError object represents an error when a global URI handling function was used in a wrong way.
 *
 * @example
 * ```typescript
 * import { URIError } from '@w5s/error';
 *
 * try {
 *   throw new URIError("Hello");
 * } catch (e) {
 *   console.log(e instanceof URIError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "URIError"
 *   console.log(e.stack); // Stack of the error
 * }
 * ```
 */
export interface URIError extends Error {
  name: 'URIError';
}
export const URIError = globalThis.URIError as unknown as {
  (message?: string, options?: ErrorOptions): URIError;
  new (message?: string, options?: ErrorOptions): URIError;
};
