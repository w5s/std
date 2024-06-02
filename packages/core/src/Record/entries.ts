import { keys } from './keys.js';

/**
 * Return an iterator over all [key, value]
 *
 * @example
 * ```typescript
 * const record = { first: 1, second: 2 };
 * Array.from(Record.entries(record)); // [['first', 1], ['second', 2]]
 * ```
 * @param record - the record
 */
export function* entries<Key extends string | symbol, Value>(
  record: Record<Key, Value>
): IterableIterator<[Key, Value]> {
  for (const key of keys(record)) {
    yield [key, record[key]];
  }
}
