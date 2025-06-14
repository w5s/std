import type { Int } from '@w5s/core/dist/Int.js';

/**
 * Convert an integer to a bigint
 *
 * @example
 * ```typescript
 * BigInt.fromInt(Int(1));// 1n
 * BigInt.fromInt(Int(-1));// -1n
 * ```
 * @param value - the number to convert
 */
// eslint-disable-next-line unicorn/prefer-native-coercion-functions
export function fromInt(value: Int): bigint {
  return BigInt(value);
}
