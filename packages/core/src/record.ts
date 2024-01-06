/* eslint-disable jsdoc/require-yields */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Int } from './int.js';
import type { Option } from './option.js';

const hasOwn: typeof Object.hasOwn =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn ?? ((object, property) => Object.prototype.hasOwnProperty.call(object, property));
const emptyRecord = Object.freeze({}) as Record<any, any>;
const ownKeys = <Key extends AnyKey>(record: Record<Key, any>) => Reflect.ownKeys(record) as Key[];

type AnyKey = string | symbol;

/**
 * A Record is an immutable mapping `{ [string]: value }`
 */
export type Record<Key extends AnyKey, Value> = {
  readonly [P in Key]: Value;
};

/**
 * A collection of functions to manipulate Record
 *
 * @namespace
 */
export const Record = {
  /**
   * Return a new {@link Record} from an iterable of [key, value]
   *
   * @example
   * ```typescript
   * const record = Record.from([['a', 1], ['b', 2]]); // frozen { a: 1, b: 2}
   * ```
   * @category Constructor
   */
  from<Key extends AnyKey, Value>(iterable: Iterable<[Key, Value]>): Record<Key, Value> {
    const returnValue = {} as unknown as {
      [P in Key]: Value;
    };
    for (const [key, value] of iterable) {
      returnValue[key] = value;
    }

    return returnValue;
  },

  /**
   * Return an empty {@link Record}
   *
   * @example
   * ```typescript
   * const empty = Record.empty(); // frozen {}
   * ```
   * @category Constructor
   */
  empty<Key extends AnyKey, Value = any>(): Record<Key, Value> {
    return emptyRecord;
  },

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
  has<Key extends AnyKey>(record: Record<Key, any>, key: Key): boolean {
    return hasOwn(record, key);
  },

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
  keys<Key extends AnyKey>(record: Record<Key, any>): IterableIterator<Key> {
    return ownKeys(record).values();
  },

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
  *entries<Key extends AnyKey, Value>(record: Record<Key, Value>): IterableIterator<[Key, Value]> {
    for (const key of ownKeys(record)) {
      yield [key, record[key]!];
    }
  },

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
  *values<Key extends AnyKey, Value>(record: Record<Key, Value>): IterableIterator<Value> {
    for (const key of ownKeys(record)) {
      yield record[key]!;
    }
  },

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
  get<Key extends AnyKey, Value>(record: Record<Key, Value>, key: Key): Option<Value> {
    return hasOwn(record, key) ? record[key] : undefined;
  },

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
  set<Key extends AnyKey, Value>(record: Record<Key, Value>, key: Key, value: Value): Record<Key, Value> {
    return record[key] === value
      ? record
      : {
          ...record,
          [key]: value,
        };
  },

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
  forEach<Key extends AnyKey, Value, D extends Record<Key, Value>>(
    record: D,
    fn: (value: Value, key: Key, record: D) => unknown
  ): void {
    for (const key of ownKeys(record)) {
      fn(record[key]!, key, record);
    }
  },

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
  size<D extends Record<AnyKey, any>>(record: D): Int {
    return Object.keys(record).length as Int;
  },

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
  delete<Key extends AnyKey, Value>(record: Record<Key, Value>, key: Key): Record<Key, Value> {
    if (hasOwn(record, key)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...newRecord } = record;

      return newRecord as Record<Key, Value>;
    }

    return record;
  },
};
