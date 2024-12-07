import { UUID as UUIDType } from '@w5s/core/dist/Type/UUID.js';
import type { UUID, UUIDString } from '../UUID.js';

/**
 * UUID constructor
 *
 * @example
 * ```typescript
 * const uuid = UUID.of('1c19548b-7cac-4222-b722-dc38f2870669');
 * ```
 * @category Constructor
 * @param value - the string representation
 */
export function of(value: UUIDString): UUID {
  return UUIDType.wrap(value);
}
