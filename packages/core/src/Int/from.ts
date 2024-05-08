import type { Int } from '../Int.js';
import { _toSafeInt } from './_toSafeInt.js';

/**
 * Return a new integer from `value`
 *
 * @example
 * ```typescript
 * const intValue = Int.from(0.5);// 0
 * ```
 * @category Constructor
 * @param value - an initial numeric value
 */
export function from(value: number): Int {
  return _toSafeInt(value);
}
