import type { BigDecimal } from '../BigDecimal/BigDecimal.js';

/**
 * @internal
 * @param self the BigDecimal to scale
 * @param newScale the new scale to apply
 * @returns the scaled BigDecimal value
 * @example
 */
export function bigDecimalScaleValue(self: BigDecimal, newScale: number): bigint {
  const { scale, value } = self;
  if (newScale > scale) {
    return value * 10n ** BigInt(newScale - scale);
  }

  return newScale < scale ? value / 10n ** BigInt(scale - newScale) : value;
}
