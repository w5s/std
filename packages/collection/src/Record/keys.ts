import type { RecordKey } from '../Record.js';

const ownKeys = <Key extends RecordKey>(record: Record<Key, any>) => Reflect.ownKeys(record) as Key[];

/**
 * Return an iterator over all keys
 *
 * @example
 * ```typescript
 * const record = { first: 1, second: 2 };
 * Array.from(Record.keys(record)); // ['first', 'second']
 * ```
 * @param self - the record
 */
export function keys<Key extends RecordKey>(self: Record<Key, any>): Iterable<Key> {
  return ownKeys(self);
}
