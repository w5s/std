import type { RecordKey } from '../Record.js';

const hasOwn: typeof Object.hasOwn =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn ?? ((object, property) => Object.prototype.hasOwnProperty.call(object, property));

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
  return hasOwn(self, key);
}
