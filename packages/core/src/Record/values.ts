import type { RecordKey } from '../Record.js';
import { keys } from './keys.js';

/**
 * Return an iterator over all values
 *
 * @example
 * ```typescript
 * const record = { first: 1, second: 2 };
 * Array.from(Record.entries(record)); // [1, 2]
 * ```
 * @param record - the record
 */
export function* values<Key extends RecordKey, Value>(record: Record<Key, Value>): IterableIterator<Value> {
  for (const key of keys(record)) {
    yield record[key];
  }
}
