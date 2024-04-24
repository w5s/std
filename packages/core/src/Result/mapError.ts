import type { Result } from '../Result.js';
import { Error } from './Error.js';
import { isOk } from './isOk.js';

/**
 * Maps a `Result<Value, ErrorFrom>` to `Result<Value, ErrorTo>` by applying a function to a contained {@link Result.Error} value, leaving a {@link Result.Ok} value untouched.
 * This function can be used to pass through a successful result while handling an error.
 *
 * @example
 * ```typescript
 * const result = Error('foo');
 * Result.mapError(result, (value) => `${value}_bar`));// Error('foo_bar')
 * ```
 * @param result - a Result object
 * @param fn - the error  mapper function
 */
export function mapError<V, EFrom, ETo>(result: Result<V, EFrom>, fn: (error: EFrom) => ETo): Result<V, ETo> {
  return isOk(result) ? result : Error(fn(result.error));
}
