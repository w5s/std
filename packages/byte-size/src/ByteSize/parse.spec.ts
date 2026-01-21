import { describe, expect, it } from 'vitest';
import { parse } from './parse.js';

describe(parse, () => {
  it.each([
    ['', undefined],
    ['1 B', 1],
    ['1 KB', 1024],
    ['1 MB', 1024 ** 2],
    ['1.5 MB', 1.5 * 1024 ** 2],
    ['2 GB', 2 * 1024 ** 3],
    ['0.5 TB', 0.5 * 1024 ** 4],
    ['100 PB', 100 * 1024 ** 5],
    ['1,024 B', 1024],
    ['   2 MB   ', 2 * 1024 ** 2],
    ['3.75 GB', 3.75 * 1024 ** 3],
    ['500', 500], // Default to bytes when no unit is provided
  ] as Array<[string, number | undefined]>)('parses valid file size strings', (input, expected) => {
    expect(parse(input)).toBe(expected);
  });
});
