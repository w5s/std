import type { BigDecimal } from './BigDecimal.js';
import { __scaleValue } from './__scaleValue.js';
import { of } from './of.js';

/**
 * Scales a given `BigDecimal` to the specified scale.
 *
 * @example
 * ```typescript
 * const value = BigDecimal('1.02');
 * BigDecimal.scale(value, 1); //  BigDecimal('1.0')
 * BigDecimal.scale(value, 3); //  BigDecimal('1.020')
 * ```
 *
 * @category Scaling
 * @param self - The `BigDecimal` object.
 * @param newScale - The new scale
 */
export function scale(self: BigDecimal, newScale: number): BigDecimal {
  if (self.scale === newScale) {
    return self;
  }
  const newValue = __scaleValue(self, newScale);
  return newValue === self.value ? self : of(newValue, newScale);
}
