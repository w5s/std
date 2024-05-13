import type { BigDecimal } from './BigDecimal.js';
import { scale } from './scale.js';

/**
 * Returns a normalized `value`
 *
 * @example
 * ```ts
 * BigDecimal.normalize(BigDecimal('1.020')); //  BigDecimal('1.02')
 * BigDecimal.normalize(BigDecimal('1.0200')); //  BigDecimal('1.02')
 * ```
 * @param value
 */
export function normalize(value: BigDecimal) {
  const digits = String(value.value);
  let trail = 0;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    if (digits[i] === '0') {
      trail += 1;
    } else {
      break;
    }
  }

  if (trail === 0) {
    return value;
  }
  return scale(value, value.scale - trail);
}
