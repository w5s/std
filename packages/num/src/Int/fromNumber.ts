import type { Option } from '@w5s/core';
import type { Int } from '../Int.js';
import { IntBounded } from './IntBounded.js';

const MIN_SAFE_INTEGER = IntBounded.minValue;
const MAX_SAFE_INTEGER = IntBounded.maxValue;

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
  return value < MIN_SAFE_INTEGER || value > MAX_SAFE_INTEGER || Number.isNaN(value)
    ? undefined
    : value < 0
      ? (Math.ceil(value) as Int)
      : (Math.floor(value) as Int);
}
