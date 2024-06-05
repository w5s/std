import { fromNumber as intFromNumber } from '../Int/fromNumber.js';
/**
 * Convert a number to a bigint
 *
 * @example
 * ```ts
 * BigInt.fromNumber(1);// Option.Some(1n)
 * BigInt.fromNumber(-1);// Option.Some(-1n)
 * BigInt.fromNumber(1.1);// Option.None
 * BigInt.fromNumber(Number.MAX_SAFE_INTEGER + 1);// Option.None
 * BigInt.fromNumber(Number.MIN_SAFE_INTEGER - 1);// Option.None
 * ```
 * @param value - the number to convert
 */
export function fromNumber(value: number) {
  const intValue = intFromNumber(value);
  return intValue === undefined ? undefined : BigInt(intValue);
}
