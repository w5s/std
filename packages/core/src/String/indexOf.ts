import type { Int } from '../Int.js';
import type { Option } from '../Option.js';

/**
 * Returns the index of the first occurrence of `searchString` in a string.
 *
 * @example
 * ```typescript
 * String.indexOf('aa', 'a'); // Option.Some(0)
 * String.indexOf('aaa', 'a', 1); // Option.Some(1)
 * String.indexOf('ab', 'absent'); // Option.None
 * ```
 * @param self - The string
 * @param searchString - The string to search
 * @param fromIndex - The character index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
 */
export function indexOf(self: string, searchString: string, fromIndex?: number): Option<Int> {
  if (self.length === 0) {
    return undefined;
  }
  const index = self.indexOf(searchString, fromIndex);
  return index === -1 ? undefined : (index as Int);
}
