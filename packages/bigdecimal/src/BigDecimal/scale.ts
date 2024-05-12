import type { BigDecimal } from '../BigDecimal.js';
import { scaleValue } from './scaleValue.js';
import { of } from './of.js';

/**
 * Scales a given `BigDecimal` to the specified scale.
 *
 * @example
 * ```ts
 * const value = BigDecimal('1.02');
 * BigDecimal.scale(value, 1); //  BigDecimal('1.0')
 * BigDecimal.scale(value, 3); //  BigDecimal('1.020')
 * ```
 *
 * @param value - The `BigDecimal` to scale.
 * @param newScale - The new scale
 */
export function scale(value: BigDecimal, newScale: number): BigDecimal {
  if (value.scale === newScale) {
    return value;
  }
  const newValue = scaleValue(value, newScale);
  return newValue === value.value ? value : of(newValue, newScale);
}
