import type { BigDecimal } from './BigDecimal.js';

/**
 * @internal
 * @example
 * @param self - the BigDecimal to scale
 * @param newScale - the new scale to apply
 * @returns the scaled BigDecimal value
 */
export function __scaleValue(self: BigDecimal, newScale: number): bigint {
  const { value, scale } = self;
  return newScale > scale
    ? value * 10n ** BigInt(newScale - scale)
    : newScale < scale
      ? value / 10n ** BigInt(scale - newScale)
      : value;
}
