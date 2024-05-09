import type { Option } from '../Option.js';

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
