import { Type } from '@w5s/core/dist/Type.js';
import { describe, expect, it } from 'vitest';

import { Number } from './Number.js';
import { format } from './Number/format.js';
import { parse } from './Number/parse.js';
import { NumberConversion } from './NumberConversion.js';

describe('Number', () => {
  it('is an alias to functions', () => {
    expect(Number).toEqual(
      expect.objectContaining({
        '%': expect.any(Function),
        '*': expect.any(Function),
        '**': expect.any(Function),
        '+': expect.any(Function),
        '-': expect.any(Function),
        '==': expect.any(Function),
        'compare': expect.any(Function),
      }),
    );
    expect(Number).toEqual(
      expect.objectContaining({
        abs: expect.any(Function),
        isNegative: expect.any(Function),
        isPositive: expect.any(Function),
        sign: expect.any(Function),
      }),
    );
    expect(Number).toEqual(expect.objectContaining(NumberConversion.Bounded()));
    expect(Number).toEqual(
      expect.objectContaining({
        negate: expect.any(Function),
      }),
    );
    expect(Number).toEqual(
      expect.objectContaining({
        isZero: expect.any(Function),
        zero: expect.any(Function),
      }),
    );
    expect(Number).toEqual(expect.objectContaining(Type.number));
    expect(Number).toEqual(
      expect.objectContaining({
        format,
        parse,
      }),
    );
  });
});
