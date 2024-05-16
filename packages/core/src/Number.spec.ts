import { describe, it, expect } from 'vitest';
import { Number } from './Number.js';
import { parse } from './Number/parse.js';
import { format } from './Number/format.js';
import { NumberComparable } from './Number/NumberComparable.js';
import { Type } from './Type.js';

describe('Number', () => {
  it('is an alias to functions', () => {
    expect(Number).toEqual(expect.objectContaining(NumberComparable));
    expect(Number).toEqual(expect.objectContaining(Type.Number));
    expect(Number).toEqual(
      expect.objectContaining({
        parse,
        format,
      })
    );
  });
});
