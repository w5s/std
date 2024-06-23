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
 * @param record - the record
 * @param key - the entry key
 */
export function get<Key extends RecordKey, Value>(record: Record<Key, Value>, key: Key): Option<Value> {
  return has(record, key) ? record[key] : undefined;
}
