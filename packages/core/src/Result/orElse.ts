import type { Result } from '../Result.js';
import { isOk } from './isOk.js';

/**
 * Calls `fn` if the result is {@link Result.Error}, otherwise returns the {@link Result.Ok} value of self.
 * This function can be used for control flow based on result values.
 *
 * @example
 * ```typescript
 * const handleError = (message: string) => Result.Ok(message + '_handled');
 * Result.orElse(Result.Error('TestError'), square); // Result.Ok('TestError_handled')
 * Result.orElse(Result.Ok(4), square); // Result.Ok(4)
 * ```
 * @param self - a Result object
 * @param fn - a error mapping function
 */
export function orElse<VFrom, EFrom, VTo, ETo>(
  self: Result<VFrom, EFrom>,
  fn: (error: EFrom) => Result<VTo, ETo>,
): Result<VFrom | VTo, ETo> {
  return isOk(self) ? self : fn(self.error);
}
