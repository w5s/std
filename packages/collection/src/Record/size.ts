import type { Int } from '@w5s/core';
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
 * @param self - the record
 */
export function size<D extends Record<RecordKey, any>>(self: D): Int {
  return Object.keys(self).length as Int;
}
