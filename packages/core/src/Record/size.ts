import type { Int } from '../Int.js';
import type { RecordKey } from '../Record.js';

/**
 * Return the number of entries in the record
 *
 * @example
 * ```typescript
 * const record = { first: 1, second: 2 };
 * Record.size(record); // 2
 * ```
 * @category Accessor
 * @param record - the record
 */
export function size<D extends Record<RecordKey, any>>(record: D): Int {
  return Object.keys(record).length as Int;
}
