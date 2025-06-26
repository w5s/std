import type { RecordKey } from '../Record.js';

/**
 * Return a new record including the new `[key, value]`
 *
 * @example
 * ```typescript
 * const record = { myProperty: 'myValue' };
 * Record.set(record, 'myOtherProperty', 'myOtherValue'); // { myProperty: 'myValue', myOtherProperty: 'myOtherValue' }
 * ```
 * @param self - the record
 * @param key - the entry key
 * @param value - the entry value
 */
export function set<Key extends RecordKey, Value>(
  self: Record<Key, Value>,
  key: Key,
  value: Value,
): Record<Key, Value> {
  return self[key] === value
    ? self
    : {
        ...self,
        [key]: value,
      };
}
