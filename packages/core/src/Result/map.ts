import type { Result } from '../Result.js';
import { Ok } from './Ok.js';
import { isOk } from './isOk.js';

/**
 * Maps a `Result<ValueFrom, Error>` to `Result<ValueTo, Error>` by applying a function to a contained {@link Result.Ok} value, leaving a {@link Result.Error} value untouched.
 * This function can be used to compose the results of two functions.
 *
 * @example
 * ```typescript
 * const result = Ok('foo');
 * Result.map(result, (value) => `${value}_bar`));// Ok('foo_bar')
 * ```
 * @param result - a Result object
 * @param fn - the mapper function
 */
export function map<VFrom, VTo, E>(result: Result<VFrom, E>, fn: (value: VFrom) => VTo): Result<VTo, E> {
  return isOk(result) ? Ok(fn(result.value)) : result;
}
