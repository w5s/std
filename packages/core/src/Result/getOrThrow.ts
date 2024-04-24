import type { Result } from '../Result.js';
import { isOk } from './isOk.js';

/**
 * Returns the `value` if {@link Result.Ok}, throw `error` if {@link Result.Error}.
 *
 * @deprecated *⚠ Impure function that may throw an error, its use is generally discouraged.*
 * @example
 * ```typescript
 * let x = Ok('foo');
 * Result.getOrThrow(x);// 'foo'
 *
 * let x = Error('foo');
 * Result.getOrThrow(x);// throw 'error'
 * ```
 * @category Accessor
 * @param result - a Result object
 */
export function getOrThrow<V>(result: Result<V, unknown>): V {
  if (isOk(result)) {
    return result.value;
  }
  throw result.error;
}
