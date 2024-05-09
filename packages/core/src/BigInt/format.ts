/**
 * Return string representation of bigint using `radix`
 *
 * @example
 * ```typescript
 * BigInt.format(1024n, 10);// '1024'
 * BigInt.format(1024n, 16);// '400'
 * ```
 * @param self - an integer
 * @param radix - an optional base (ex: 10, 16)
 */
export function format(self: bigint, radix?: number) {
  return self.toString(radix);
}
