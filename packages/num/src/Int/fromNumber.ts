import type { Option } from '@w5s/core';
import type { Int } from '../Int.js';

/**
 * Return a new integer from `value`
 *
 * @example
 * ```typescript
 * const intValue = Int.fromNumber(0.5);// 0
 * ```
 * @category Constructor
 * @param value - an initial numeric value
 */
export function fromNumber(value: number): Option<Int> {
  return value < Number.MIN_SAFE_INTEGER || value > Number.MAX_SAFE_INTEGER || Number.isNaN(value)
    ? undefined
    : value < 0
      ? (Math.ceil(value) as Int)
      : (Math.floor(value) as Int);
}
