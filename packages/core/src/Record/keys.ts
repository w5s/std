const ownKeys = <Key extends string | symbol>(record: Record<Key, any>) => Reflect.ownKeys(record) as Key[];

/**
 * Return an iterator over all keys
 *
 * @example
 * ```typescript
 * const record = { first: 1, second: 2 };
 * Array.from(Record.keys(record)); // ['first', 'second']
 * ```
 * @param record - the record
 */
export function keys<Key extends string | symbol>(record: Record<Key, any>): IterableIterator<Key> {
  return ownKeys(record).values();
}
