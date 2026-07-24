/**
 * Alias to native {@link globalThis.AggregateError}
 *
 * @example
 * ```typescript
 * import { AggregateError } from '@w5s/error';
 *
 * try {
 *   throw new AggregateError([new Error("some error")], "Hello");
 * } catch (e) {
 *   console.log(e instanceof AggregateError); // true
 *   console.log(e.message); // "Hello"
 *   console.log(e.name); // "AggregateError"
 *   console.log(e.errors); // [ Error: "some error" ]
 * }
 * ```
 */
// @ts-ignore Ignore duplicate
export declare class AggregateError<Errors extends Array<any> | Iterable<any>> extends Error {
  /**
   * Array of error
   */
  errors: Errors extends Array<any> ? Array<[...Errors]> : Errors extends Iterable<infer T> ? Array<T> : never;

  name: 'AggregateError';

  /**
   * AggregateError constructor
   *
   * @param errors an iterable of error
   * @param message the error message
   */
  constructor(errors: Errors, message?: string);
}
// @ts-ignore Ignore duplicate
export declare function AggregateError(errors: Iterable<any>, message?: string): AggregateError;
// @ts-ignore Ignore duplicate
export const AggregateError = globalThis.AggregateError;
