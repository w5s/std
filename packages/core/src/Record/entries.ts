import type { RecordKey } from '../Record.js';
import { keys } from './keys.js';

/**
 * Return an iterator over all [key, value]
 *
 * @example
 * ```typescript
 * const record = { first: 1, second: 2 };
 * Array.from(Record.entries(record)); // [['first', 1], ['second', 2]]
 * ```
 * @param self - the record
 */
export function entries<Key extends RecordKey, Value>(self: Record<Key, Value>): Iterable<[Key, Value]> {
  return {
    *[Symbol.iterator]() {
      for (const key of keys(self)) {
        yield [key, self[key]];
      }
    },
  };
}
