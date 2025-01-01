import type { BigDecimal } from './BigDecimal.js';

/**
 * Returns a new `BigDecimal` from `value` and `scale`
 *
 * @example
 * ```typescript
 * BigDecimal.of(1n, 1); // BigDecimal('0.1')
 * BigDecimal.of(-234n, 2); // BigDecimal('2.34')
 * ```
 * @category Constructor
 * @param value - The base integer value.
 * @param scale - The scale.
 */
export function of(value: bigint, scale: number): BigDecimal {
  return {
    _: 'BigDecimal',
    value,
    scale,
  };
}
