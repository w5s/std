import type { Int } from './Int.js';
import type { Option } from './Option.js';
import type { Array } from './Array.js';
import { Comparable } from './Comparable.js';

const NativeString = globalThis.String;
const indexToOption = (value: number): Option<Int> => (value < 0 ? undefined : (value as Int));

const StringComparable = Comparable<string>({
  compare(left, right) {
    return left === right ? 0 : left < right ? -1 : 1;
  },
});

/**
 * A collection of functions to manipulate `string`
 *
 * @namespace
 */
export const String = {
  ...StringComparable,
  /**
   * Return a new string from all parts passed as arguments
   *
   * @example
   * ```typescript
   * String.of('a', 'b', 'c') // 'abc'
   * ```
   * @category Constructor
   * @param args - a list of parts
   */
  of(...args: Array<string>): string {
    return args.join('');
  },
  /**
   * Returns a string created by using the specified code point.
   *
   * @example
   * ```typescript
   * String.fromCodePoint(65, 9731) == "A☃"
   * ```
   * @category Constructor
   * @param code - an array of string codes
   */
  fromCodePoint(...code: number[]): string {
    return NativeString.fromCodePoint(...code);
  },

  /**
   * Return the character at the `index` position
   *
   * @example
   * ```typescript
   * const string = 'foo';
   * String.at(string, 1) // Option.Some('bar')
   * String.at(string, -1) //  Option.Some('baz') i.e. the last
   * String.at(string, 99) // Option.None
   * ```
   * @category Accessor
   * @param string - The string
   * @param index - The zero based position
   */
  at(string: string, index: number): Option<string> {
    const stringIndex = index < 0 ? index + string.length : index;

    return string[stringIndex] ?? undefined;
  },

  /**
   * Joins the given array of strings.
   *
   * @example
   * ```typescript
   * String.concat(['a', 'b', 'c']) // 'abc'
   * ```
   * @category Combinator
   * @param parts - a tested value
   */
  concat(parts: Array<string>): string {
    return parts.join('');
  },

  /**
   * Return true if `anyValue` is a `string`
   *
   * @example
   * ```typescript
   * String.hasInstance(Array.empty()) // true
   * String.hasInstance(null)) // false
   * ```
   * @category Type
   * @param anyValue - a tested value
   */
  hasInstance(anyValue: unknown): anyValue is string {
    return typeof anyValue === 'string';
  },

  /**
   * Return true if the size of the array is 0
   *
   * @example
   * ```typescript
   * String.isEmpty('');// true
   * String.isEmpty('abc');// false
   * ```
   * @category Predicate
   * @param string - The string
   */
  isEmpty(string: string): boolean {
    return string.length === 0;
  },

  /**
   * Joins the given array of strings.
   *
   * @example
   * ```typescript
   * String.join('|', ['a', 'b', 'c']) // 'a|b|c'
   * ```
   * @category Combinator
   * @param separator - the separator
   * @param parts - a tested value
   */
  join(separator: string, parts: Array<string>): string {
    return parts.join(separator);
  },

  /**
   * Return the length of the string
   *
   * @example
   * ```typescript
   * String.size('') // 0
   * String.size('foo bar') // 6
   * ```
   * @category Accessor
   * @param string - The string
   */
  size(string: string): Int {
    return string.length as Int;
  },

  /**
   * Returns the index of the first occurrence of `searchString` in a string.
   *
   * @example
   * ```typescript
   * String.indexOf('aa', 'a'); // Option.Some(0)
   * String.indexOf('aaa', 'a', 1); // Option.Some(1)
   * String.indexOf('ab', 'absent'); // Option.None
   * ```
   * @param string - The string
   * @param searchString - The string to search
   * @param fromIndex - The character index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  indexOf(string: string, searchString: string, fromIndex?: number): Option<Int> {
    return string.length > 0 ? indexToOption(string.indexOf(searchString, fromIndex)) : undefined;
  },

  /**
   * Returns the index of the last occurrence of `searchString` in a string.
   *
   * @example
   * ```typescript
   * String.lastIndexOf('aa', 'a'); // Option.Some(1)
   * String.lastIndexOf('aaa', 'a', 1); // Option.Some(1)
   * String.lastIndexOf('ab', 'absent'); // Option.None
   * ```
   * @param string - The string
   * @param searchString - The string to search
   * @param fromIndex - The character index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  lastIndexOf(string: string, searchString: string, fromIndex?: number): Option<Int> {
    return string.length > 0 ? indexToOption(string.lastIndexOf(searchString, fromIndex)) : undefined;
  },

  /**
   * Returns the index of the last occurrence of `searchString` in a string.
   *
   * @example
   * ```typescript
   * String.includes('abc', 'ab'); // true
   * String.includes('abc', 'absent'); // false
   * ```
   * @category Predicate
   * @param string - The string
   * @param searchString - The string to search
   */
  includes(string: string, searchString: string): boolean {
    return string.includes(searchString);
  },

  /**
   * Returns true if string starts with searchString
   *
   * @example
   * ```typescript
   * String.startsWith('abc', 'ab'); // true
   * String.startsWith('abc', 'bc'); // false
   * ```
   * @category Predicate
   * @param string - The string
   * @param searchString - The string to search
   */
  startsWith(string: string, searchString: string) {
    return string.startsWith(searchString);
  },

  /**
   * Returns true if string ends with searchString
   *
   * @example
   * ```typescript
   * String.endsWith('abc', 'bc'); // true
   * String.endsWith('abc', 'ab'); // false
   * ```
   * @category Predicate
   * @param string - The string
   * @param searchString - The string to search
   */
  endsWith(string: string, searchString: string) {
    return string.endsWith(searchString);
  },

  /**
   * Split a string into substrings using the specified separator and return them as an array.
   *
   * @example
   * ```typescript
   * String.split('a|b|c', '|'); // ['a', 'b', 'c']
   * String.split('a|b|c', '|', 2); // ['a', 'b']
   * ```
   * @param string - The string
   * @param separator - A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
   * @param limit - A value used to limit the number of elements returned in the array.
   */
  split(
    string: string,
    separator: string | RegExp | { [Symbol.split](string: string, limit?: number): string[] },
    limit?: number
  ): Array<string> {
    return string.split(
      // @ts-ignore Typing is correct
      separator,
      limit
    );
  },
};
