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
 * @param self - the record
 */
export function values<Key extends RecordKey, Value>(self: Record<Key, Value>): Iterable<Value> {
  return {
    *[Symbol.iterator]() {
      for (const key of keys(self)) {
        yield self[key];
      }
    },
  };
}
