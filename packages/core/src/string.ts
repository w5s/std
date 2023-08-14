import type { Int } from './integer.js';
import type { Option } from './option.js';

const NativeString = globalThis.String;

export namespace String {
  const indexToOption = (value: number): Option<Int> => (value < 0 ? undefined : (value as Int));

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
  export function fromCodePoint(...code: number[]): string {
    return NativeString.fromCodePoint(...code);
  }

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
  export function at(string: string, index: number): Option<string> {
    const stringIndex = index < 0 ? index + string.length : index;

    return string[stringIndex] ?? undefined;
  }

  /**
   * Joins the given array of strings.
   *
   * @example
   * ```typescript
   * String.concat(['a', 'b', 'c']) // 'abc'
   * ```
   * @category Guard
   * @param parts - a tested value
   */
  export function concat(parts: string[]): string {
    return parts.join('');
  }

  /**
   * Return true if `anyValue` is a `string`
   *
   * @example
   * ```typescript
   * String.hasInstance(Array.empty()) // true
   * String.hasInstance(null)) // false
   * ```
   * @category Guard
   * @param anyValue - a tested value
   */
  export function hasInstance(anyValue: unknown): anyValue is string {
    return typeof anyValue === 'string';
  }

  /**
   * Return true if the size of the array is 0
   *
   * @example
   * ```typescript
   * String.isEmpty('');// true
   * String.isEmpty('abc');// false
   * ```
   * @category Guard
   * @param string - The string
   */
  export function isEmpty(string: string): boolean {
    return string.length === 0;
  }

  /**
   * Joins the given array of strings.
   *
   * @example
   * ```typescript
   * String.join('|', ['a', 'b', 'c']) // 'a|b|c'
   * ```
   * @category Guard
   * @param separator - the separator
   * @param parts - a tested value
   */
  export function join(separator: string, parts: string[]): string {
    return parts.join(separator);
  }

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
  export function size(string: string): Int {
    return string.length as Int;
  }

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
  export function indexOf(string: string, searchString: string, fromIndex?: number): Option<Int> {
    return string.length > 0 ? indexToOption(string.indexOf(searchString, fromIndex)) : undefined;
  }

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
  export function lastIndexOf(string: string, searchString: string, fromIndex?: number): Option<Int> {
    return string.length > 0 ? indexToOption(string.lastIndexOf(searchString, fromIndex)) : undefined;
  }

  /**
   * Returns the index of the last occurrence of `searchString` in a string.
   *
   * @example
   * ```typescript
   * String.includes('abc', 'ab'); // true
   * String.includes('abc', 'absent'); // false
   * ```
   * @param string - The string
   * @param searchString - The string to search
   */
  export function includes(string: string, searchString: string): boolean {
    return string.includes(searchString);
  }
}
