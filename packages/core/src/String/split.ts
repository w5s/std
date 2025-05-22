/**
 * Split a string into substrings using the specified separator and return them as an array.
 *
 * @example
 * ```typescript
 * String.split('a|b|c', '|'); // ['a', 'b', 'c']
 * String.split('a|b|c', '|', 2); // ['a', 'b']
 * ```
 * @param self - The string
 * @param separator - A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
 * @param limit - A value used to limit the number of elements returned in the array.
 */
export function split(
  self: string,
  separator: string | RegExp | { [Symbol.split](string: string, limit?: number): string[] },
  limit?: number,
): Array<string> {
  return self.split(
    // @ts-ignore Typing is correct
    separator,
    limit,
  );
}
