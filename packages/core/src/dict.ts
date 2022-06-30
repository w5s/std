/* eslint-disable jsdoc/require-yields */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Int } from './integer.js';
import type { Option } from './option.js';

// eslint-disable-next-line @typescript-eslint/unbound-method
const hasOwn = Object.prototype.hasOwnProperty;
const emptyDictionary = Object.freeze({});
const keyIterator = (dict: Dict<any>): IterableIterator<string> => Object.keys(dict).values();

/**
 * A Dictionary is an immutable mapping `{ [string]: value }`
 */
export type Dict<V> = Readonly<{
  [key: string]: V;
}>;

/**
 * Dict constructor. Alias of `from`
 *
 * @example
 * ```typescript
 * const dict = Dict({ a: 1, b: 2 })
 * const dictEntries = Dict([['a', 1], ['b', 2]])
 * ```
 * @category Constructor
 */
export function Dict<V>(iterable: Iterable<[string, V]>): Dict<V> {
  return Dict.from(iterable);
}
export namespace Dict {
  /**
   * Return a new dictionary from an iterable of [key, value]
   *
   * @example
   * ```typescript
   * const dict = Dict.from([['a', 1], ['b', 2]]); // frozen { a: 1, b: 2}
   * ```
   * @category Constructor
   */
  export function from<V>(iterable: Iterable<[string, V]>): Dict<V> {
    const returnValue: {
      [key: string]: V;
    } = {};
    for (const [key, value] of iterable) {
      returnValue[key] = value;
    }

    return returnValue;
  }

  /**
   * Return an empty dictionary
   *
   * @example
   * ```typescript
   * const empty = Dict.empty(); // frozen {}
   * ```
   * @category Constructor
   */
  export function empty<V = any>(): Dict<V> {
    return emptyDictionary;
  }

  /**
   * Return true if `dict` contains `key`
   *
   * @example
   * ```typescript
   * const dict = { myProperty: 'myValue' };
   * Dict.has(dict, 'myProperty'); // true
   * Dict.has(dict, 'nonExistent'); // false
   * ```
   * @param dict - the dictionary
   * @param key - the entry key
   */
  export function has(dict: Dict<any>, key: string): boolean {
    return hasOwn.call(dict, key);
  }

  /**
   * Return an iterator over all keys
   *
   * @example
   * ```typescript
   * const dict = { first: 1, second: 2 };
   * Array.from(Dict.keys(dict)); // ['first', 'second']
   * ```
   * @param dict - the dictionary
   */
  export function keys(dict: Dict<any>): IterableIterator<string> {
    return keyIterator(dict);
  }

  /**
   * Return an iterator over all [key, value]
   *
   * @example
   * ```typescript
   * const dict = { first: 1, second: 2 };
   * Array.from(Dict.entries(dict)); // [['first', 1], ['second', 2]]
   * ```
   * @param dict - the dictionary
   */
  export function* entries<V>(dict: Dict<V>): IterableIterator<[string, V]> {
    for (const key of keyIterator(dict)) {
      yield [key, dict[key]!];
    }
  }

  /**
   * Return an iterator over all values
   *
   * @example
   * ```typescript
   * const dict = { first: 1, second: 2 };
   * Array.from(Dict.entries(dict)); // [1, 2]
   * ```
   * @param dict - the dictionary
   */
  export function* values<V>(dict: Dict<V>): IterableIterator<V> {
    for (const key of keyIterator(dict)) {
      yield dict[key]!;
    }
  }

  /**
   * Return an Option of value for the given `key`
   *
   * @example
   * ```typescript
   * const dict = { myProperty: 'myValue' };
   * Dict.get(dict, 'myProperty'); // Option.Some('myValue')
   * Dict.get(dict, 'nonExistent'); // Option.None
   * ```
   * @category Accessor
   * @param dict - the dictionary
   * @param key - the entry key
   */
  export function get<V>(dict: Dict<V>, key: string): Option<V> {
    return hasOwn.call(dict, key) ? dict[key] : undefined;
  }

  /**
   * Return a new dictionary including the new `[key, value]`
   *
   * @example
   * ```typescript
   * const dict = { myProperty: 'myValue' };
   * Dict.set(dict, 'myOtherProperty', 'myOtherValue'); // { myProperty: 'myValue', myOtherProperty: 'myOtherValue' }
   * ```
   * @param dict - the dictionary
   * @param key - the entry key
   * @param value - the entry value
   */
  export function set<V>(dict: Dict<V>, key: string, value: V): Dict<V> {
    return dict[key] !== value
      ? {
          ...dict,
          [key]: value,
        }
      : dict;
  }

  /**
   * Call `fn(value, key, dict)` on each entries in the dictionary
   *
   * @example
   * ```typescript
   * const dict = { first: 1, second: 2 };
   * Dict.forEach(dict, (value, key, dict) => {
   *  // call (1, 'first', dict)
   *  // call (2, 'second', dict)
   * }); // 2
   * ```
   * @param dict - the dictionary
   * @param fn - callback called on each entry
   */
  export function forEach<V, D extends Dict<V>>(dict: D, fn: (value: V, key: string, dict: D) => unknown): void {
    for (const key of keyIterator(dict)) {
      fn(dict[key]!, key, dict);
    }
  }

  /**
   * Return the number of entries in the dictionary
   *
   * @example
   * ```typescript
   * const dict = { first: 1, second: 2 };
   * Dict.size(dict); // 2
   * ```
   * @category Accessor
   * @param dict - the dictionary
   */
  export function size<D extends Dict<any>>(dict: D): Int {
    return Object.keys(dict).length as Int;
  }
}

export declare namespace Dict {
  /**
   * Return a new dictionary without the `key`
   *
   * @example
   * ```typescript
   * const dict = { myProperty: 'myValue' };
   * Dict.delete(dict, 'myProperty'); // {}
   * ```
   * @param dict - the dictionary
   * @param key - the entry key
   */
  function _delete<V>(dict: Dict<V>, key: string): Dict<V>;
  export { _delete as delete };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
(Dict as any).delete = function _delete<V>(dict: Dict<V>, key: string): Dict<V> {
  if (hasOwn.call(dict, key)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...newDict } = dict;

    return newDict;
  }

  return dict;
};
