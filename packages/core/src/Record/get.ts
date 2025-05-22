import type { Option } from '../Option.js';
import type { RecordKey } from '../Record.js';
import { has } from './has.js';

/**
 * Return an Option of value for the given `key`
 *
 * @example
 * ```typescript
 * const record = { myProperty: 'myValue' };
 * Record.get(record, 'myProperty'); // Option.Some('myValue')
 * Record.get(record, 'nonExistent'); // Option.None
 * ```
 * @category Accessor
 * @param self - the record
 * @param key - the entry key
 */
export function get<Key extends RecordKey, Value>(self: Record<Key, Value>, key: Key): Option<Value> {
  return has(self, key) ? self[key] : undefined;
}
