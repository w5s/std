import type { Int } from './integer.js';
import type { Option } from './option.js';

export namespace String {
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
}
