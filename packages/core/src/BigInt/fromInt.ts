import type { Int } from '../Int.js';

/**
 * Convert an integer to a bigint
 *
 * @example
 * ```ts
 * BigInt.fromNumber(Int(1));// 1n
 * BigInt.fromNumber(Int(-1));// -1n
 * ```
 * @param value - the number to convert
 */
// eslint-disable-next-line unicorn/prefer-native-coercion-functions
export function fromInt(value: Int): bigint {
  return BigInt(value);
}
