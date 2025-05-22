import type { UUID } from '../UUID.js';

/**
 * Returns a bigint from UUID
 *
 * @example
 * ```typescript
 * const uuid = UUID('1c19548b-7cac-4222-b722-dc38f2870669');
 * const bigint = UUID.toBigInt(uuid);// BigInt('Ox1c19548b7cac4222b722dc38f2870669');
 * ```
 * @param self
 */
export function toBigInt(self: UUID): bigint {
  return BigInt(`0x${self.replaceAll('-', '')}`);
}
