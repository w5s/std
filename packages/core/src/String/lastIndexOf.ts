import type { Int } from '../Int.js';
import type { Option } from '../Option.js';

/**
 * Returns the index of the last occurrence of `searchString` in a string.
 *
 * @example
 * ```typescript
 * String.lastIndexOf('aa', 'a'); // Option.Some(1)
 * String.lastIndexOf('aaa', 'a', 1); // Option.Some(1)
 * String.lastIndexOf('ab', 'absent'); // Option.None
 * ```
 * @param self - The string
 * @param searchString - The string to search
 * @param fromIndex - The character index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
 */
export function lastIndexOf(self: string, searchString: string, fromIndex?: number): Option<Int> {
  if (self.length === 0) {
    return undefined;
  }
  const index = self.lastIndexOf(searchString, fromIndex);
  return index === -1 ? undefined : (index as Int);
}
