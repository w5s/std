/* eslint-disable jsdoc/require-yields */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Int } from './integer.js';
import type { Option } from './option.js';

const hasOwn: typeof Object.hasOwn =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn ?? ((object, property) => Object.prototype.hasOwnProperty.call(object, property));
const emptyRecord = Object.freeze({});
const keyIterator = (record: Record<any>): IterableIterator<string> => Object.keys(record).values();

/**
 * A Record is an immutable mapping `{ [string]: value }`
 */
export type Record<V> = Readonly<{
  [key: string]: V;
}>;

/**
 * Record constructor. Alias of `from`
 *
 * @example
 * ```typescript
 * const record = Record({ a: 1, b: 2 })
 * const recordEntries = Record([['a', 1], ['b', 2]])
 * ```
 * @category Constructor
 */
export function Record<V>(iterable: Iterable<[string, V]>): Record<V> {
  return Record.from(iterable);
}
export namespace Record {
  /**
   * Return a new {@link Record} from an iterable of [key, value]
   *
   * @example
   * ```typescript
   * const record = Record.from([['a', 1], ['b', 2]]); // frozen { a: 1, b: 2}
   * ```
   * @category Constructor
   */
  export function from<V>(iterable: Iterable<[string, V]>): Record<V> {
    const returnValue: {
      [key: string]: V;
    } = {};
    for (const [key, value] of iterable) {
      returnValue[key] = value;
    }

    return returnValue;
  }

  /**
   * Return an empty {@link Record}
   *
   * @example
   * ```typescript
   * const empty = Record.empty(); // frozen {}
   * ```
   * @category Constructor
   */
  export function empty<V = any>(): Record<V> {
    return emptyRecord;
  }

  /**
   * Return true if `record` contains `key`
   *
   * @example
   * ```typescript
   * const record = { myProperty: 'myValue' };
   * Record.has(record, 'myProperty'); // true
   * Record.has(record, 'nonExistent'); // false
   * ```
   * @param record - the record
   * @param key - the entry key
   */
  export function has(record: Record<any>, key: string): boolean {
    return hasOwn(record, key);
  }

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
  export function keys(record: Record<any>): IterableIterator<string> {
    return keyIterator(record);
  }

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
  export function* entries<V>(record: Record<V>): IterableIterator<[string, V]> {
    for (const key of keyIterator(record)) {
      yield [key, record[key]!];
    }
  }

  /**
   * Return an iterator over all values
   *
   * @example
   * ```typescript
   * const record = { first: 1, second: 2 };
   * Array.from(Record.entries(record)); // [1, 2]
   * ```
   * @param record - the record
   */
  export function* values<V>(record: Record<V>): IterableIterator<V> {
    for (const key of keyIterator(record)) {
      yield record[key]!;
    }
  }

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
  export function get<V>(record: Record<V>, key: string): Option<V> {
    return hasOwn(record, key) ? record[key] : undefined;
  }

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
  export function set<V>(record: Record<V>, key: string, value: V): Record<V> {
    return record[key] !== value
      ? {
          ...record,
          [key]: value,
        }
      : record;
  }

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
   * @param record - the record
   * @param fn - callback called on each entry
   */
  export function forEach<V, D extends Record<V>>(record: D, fn: (value: V, key: string, record: D) => unknown): void {
    for (const key of keyIterator(record)) {
      fn(record[key]!, key, record);
    }
  }

  /**
   * Return the number of entries in the record
   *
   * @example
   * ```typescript
   * const record = { first: 1, second: 2 };
   * Record.size(record); // 2
   * ```
   * @category Accessor
   * @param record - the record
   */
  export function size<D extends Record<any>>(record: D): Int {
    return Object.keys(record).length as Int;
  }
}

export declare namespace Record {
  /**
   * Return a new record without the `key`
   *
   * @example
   * ```typescript
   * const record = { myProperty: 'myValue' };
   * Record.delete(record, 'myProperty'); // {}
   * ```
   * @param record - the record
   * @param key - the entry key
   */
  function _delete<V>(record: Record<V>, key: string): Record<V>;
  export { _delete as delete };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
(Record as any).delete = function _delete<V>(record: Record<V>, key: string): Record<V> {
  if (hasOwn(record, key)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...newRecord } = record;

    return newRecord;
  }

  return record;
};
