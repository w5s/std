import { describe, it, expect } from 'vitest';
import { Type } from '@w5s/core/dist/Type.js';
import { Number } from './Number.js';
import { parse } from './Number/parse.js';
import { format } from './Number/format.js';
import { NumberComparable } from './Number/NumberComparable.js';
import { NumberSigned } from './Number/NumberSigned.js';
import { NumberBounded } from './Number/NumberBounded.js';
import { NumberNegate } from './Number/NumberNegate.js';
import { NumberZero } from './Number/NumberZero.js';

describe('Number', () => {
  it('is an alias to functions', () => {
    expect(Number).toEqual(expect.objectContaining(NumberComparable));
    expect(Number).toEqual(expect.objectContaining(NumberSigned));
    expect(Number).toEqual(expect.objectContaining(NumberBounded));
    expect(Number).toEqual(expect.objectContaining(NumberNegate));
    expect(Number).toEqual(expect.objectContaining(NumberZero));
    expect(Number).toEqual(expect.objectContaining(Type.number));
    expect(Number).toEqual(
      expect.objectContaining({
        parse,
        format,
      }),
    );
  });
});
