import type { Result } from '../Result.js';
import { isOk } from './isOk.js';

/**
 * Calls `fn` if the result is {@link Result.Ok}, otherwise returns the {@link Result.Error} value of self.
 * This function can be used for control flow based on `Result` values.
 *
 * @example
 * ```typescript
 * const square = (num: number): Result<number, 'TestError'> => Result.Ok(num * num);
 * Result.andThen(Result.Ok(4), square); // Result.Ok(16)
 * Result.andThen(Result.Error('TestError'), square); // Result.Error('TestError')
 * ```
 * @param self - a Result object
 * @param fn - a value mapping function
 */
export function andThen<VFrom, EFrom, VTo, ETo>(
  self: Result<VFrom, EFrom>,
  fn: (value: VFrom) => Result<VTo, ETo>,
): Result<VTo, EFrom | ETo> {
  return isOk(self) ? fn(self.value) : self;
}
