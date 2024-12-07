import type { UUID } from '../UUID.js';

/**
 * Returns an `UUID` with only `0`
 *
 * @example
 * ```typescript
 * const emptyUUID = UUID.empty();// '00000000-0000-0000-0000-000000000000'
 * ```
 * @category Constructor
 */
export function empty(): UUID {
  return '00000000-0000-0000-0000-000000000000' as UUID;
}
