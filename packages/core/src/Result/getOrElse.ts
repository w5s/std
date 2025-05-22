import type { Result } from '../Result.js';
import { isOk } from './isOk.js';

/**
 * Returns the `value` if {@link Result.Ok}, `getDefaultValue()` if {@link Result.Error}.
 *
 * @example
 * ```typescript
 * let x = Ok('foo');
 * Result.getOrElse(x, () => 'bar');// 'foo'
 *
 * let x = Error('foo');
 * Result.getOrElse(x, () => 'bar');// 'bar'
 * ```
 * @category Accessor
 * @param self - a Result object
 * @param getDefaultValue - a function that returns default value
 */
export function getOrElse<V, VDefault>(self: Result<V, unknown>, getDefaultValue: () => VDefault): V | VDefault {
  return isOk(self) ? self.value : getDefaultValue();
}
