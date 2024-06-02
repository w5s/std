/**
 * Return a new record including the new `[key, value]`
 *
 * @example
 * ```typescript
 * const record = { myProperty: 'myValue' };
 * Record.set(record, 'myOtherProperty', 'myOtherValue'); // { myProperty: 'myValue', myOtherProperty: 'myOtherValue' }
 * ```
 * @param record - the record
 * @param key - the entry key
 * @param value - the entry value
 */
export function set<Key extends string | symbol, Value>(
  record: Record<Key, Value>,
  key: Key,
  value: Value
): Record<Key, Value> {
  return record[key] === value
    ? record
    : {
        ...record,
        [key]: value,
      };
}
