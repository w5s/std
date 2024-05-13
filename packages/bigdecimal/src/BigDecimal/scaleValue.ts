import type { BigDecimal } from './BigDecimal.js';

export function scaleValue({ value, scale }: BigDecimal, newScale: number): bigint {
  return newScale > scale
    ? value * 10n ** BigInt(newScale - scale)
    : newScale < scale
      ? value / 10n ** BigInt(scale - newScale)
      : value;
}
