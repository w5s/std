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
export interface AggregateError<Errors extends Array<any> | Iterable<any>> extends Error {
  /**
   * Array of error
   */
  errors: Errors extends Array<any> ? Array<[...Errors]> : Errors extends Iterable<infer T> ? Array<T> : never;

  name: 'AggregateError';

}
export const AggregateError = globalThis.AggregateError as unknown as {
  <Errors extends Array<any> | Iterable<any>>(errors: Errors, message?: string): AggregateError<Errors>;
  new<Errors extends Array<any> | Iterable<any>>(errors: Errors, message?: string): AggregateError<Errors>;
};
