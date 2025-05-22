import type { Char } from '../Char.js';
import type { Option } from '../Option.js';

/**
 * Return the character at the `index` position
 *
 * @example
 * ```typescript
 * const string = 'bar';
 * String.at(string, 1) // Option.Some('a')
 * String.at(string, -1) //  Option.Some('r') i.e. the last
 * String.at(string, 99) // Option.None
 * ```
 * @category Accessor
 * @param self - The string
 * @param index - The zero based position
 */
export function at(self: string, index: number): Option<Char> {
  const stringIndex = index < 0 ? index + self.length : index;

  return (self[stringIndex] ?? undefined) as Option<Char>;
}
