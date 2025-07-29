import type { BigDecimal } from './BigDecimal.js';
import { scale } from './scale.js';

/**
 * Returns a normalized `value`
 *
 * @example
 * ```typescript
 * BigDecimal.normalize(BigDecimal('1.020')); //  BigDecimal('1.02')
 * BigDecimal.normalize(BigDecimal('1.0200')); //  BigDecimal('1.02')
 * ```
 * @category Scaling
 * @param self - The `BigDecimal` object.
 */
export function normalize(self: BigDecimal) {
  const digits = String(self.value);
  let trail = 0;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    if (digits[i] === '0') {
      trail += 1;
    } else {
      break;
    }
  }

  return trail === 0 ? (self.scale < 0 ? scale(self, 0) : self) : scale(self, self.scale - trail);
}
