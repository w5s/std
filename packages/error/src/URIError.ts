/* eslint-disable unicorn/custom-error-definition */
/* eslint-disable prefer-destructuring */
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
// @ts-ignore Ignore duplicate
export declare class URIError extends Error {
  name: 'URIError';
}
// @ts-ignore Ignore duplicate
export declare function URIError(message?: string, options?: ErrorOptions): URIError;
// @ts-ignore Ignore duplicate
export const URIError = globalThis.URIError;
