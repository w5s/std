import type { BigDecimal } from './BigDecimal.js';

/**
 * @internal
 * @param self the BigDecimal to scale
 * @param newScale the new scale to apply
 * @returns {bigint} the scaled BigDecimal value
 * @example
 */
export function __scaleValue(self: BigDecimal, newScale: number): bigint {
  const { value, scale } = self;
  if (newScale > scale) {
    return value * 10n ** BigInt(newScale - scale);
  }

  if (newScale < scale) {
    return value / 10n ** BigInt(scale - newScale);
  }

  return value;
}
