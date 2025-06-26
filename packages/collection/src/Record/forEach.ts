import type { RecordKey } from '../Record.js';
import { keys } from './keys.js';

/**
 * Call `fn(value, key, record)` on each entries in the record
 *
 * @example
 * ```typescript
 * const record = { first: 1, second: 2 };
 * Record.forEach(record, (value, key, record) => {
 *  // call (1, 'first', record)
 *  // call (2, 'second', record)
 * }); // 2
 * ```
 * @param self - the record
 * @param fn - callback called on each entry
 */
export function forEach<Key extends RecordKey, Value, D extends Record<Key, Value>>(
  self: D,
  fn: (value: Value, key: Key, record: D) => unknown,
): void {
  for (const key of keys(self)) {
    fn(self[key], key, self);
  }
}
