import { __hasOwn } from '@w5s/core/dist/__hasOwn.js';
import type { RecordKey } from '../Record.js';

/**
 * Return true if `record` contains `key`
 *
 * @example
 * ```typescript
 * const record = { myProperty: 'myValue' };
 * Record.has(record, 'myProperty'); // true
 * Record.has(record, 'nonExistent'); // false
 * ```
 * @param self - the record
 * @param key - the entry key
 */
export function has<Key extends RecordKey>(self: Record<Key, any>, key: Key): boolean {
  return __hasOwn(self, key);
}
