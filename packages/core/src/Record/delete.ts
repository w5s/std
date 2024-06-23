import type { RecordKey } from '../Record.js';
import { has } from './has.js';

/**
 * Return a new record without the `key`
 *
 * @example
 * ```typescript
 * const record = { myProperty: 'myValue' };
 * Record.delete(record, 'myProperty'); // {}
 * ```
 * @param record - the record
 * @param key - the entry key
 */
export function $delete<Key extends RecordKey, Value>(record: Record<Key, Value>, key: Key): Record<Key, Value> {
  if (has(record, key)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...newRecord } = record;

    return newRecord as Record<Key, Value>;
  }

  return record;
}
