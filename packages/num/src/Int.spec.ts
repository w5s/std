import { describe, it, expect } from 'vitest';
import { describeType, describeCodec, describeAsString } from '@w5s/core/dist/Testing.js';
import { CodecError, Result } from '@w5s/core';
import { Int } from './Int.js';
import { parse } from './Int/parse.js';
import { format } from './Int/format.js';
import { IntBounded } from './Int/IntBounded.js';
import { IntSigned } from './Int/IntSigned.js';
import { IntIndexable } from './Int/IntIndexable.js';
import { IntNegate } from './Int/IntNegate.js';
import { IntZero } from './Int/IntZero.js';

describe('Int', () => {
  const minValue = Number.MIN_SAFE_INTEGER;
  const maxValue = Number.MAX_SAFE_INTEGER;
  it('is an alias to functions', () => {
    expect(Int).toEqual(expect.objectContaining(IntBounded));
    expect(Int).toEqual(expect.objectContaining(IntSigned));
    expect(Int).toEqual(expect.objectContaining(IntIndexable));
    expect(Int).toEqual(expect.objectContaining(IntNegate));
    expect(Int).toEqual(expect.objectContaining(IntZero));
    expect(Int).toEqual(
      expect.objectContaining({
        parse,
        format,
      }),
    );
  });
  describeType(Int, () => ({
    typeName: 'Int',
    instances: [0 as Int, 1 as Int, 2 as Int, -1 as Int, minValue as Int, maxValue as Int],
    notInstances: ['1', 1.1, undefined, minValue - 1, maxValue + 1],
  }));
  describeCodec(Int, () => ({
    decode: [
      [1, Result.Ok(Int(1))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as Int', input: null }))],
    ],
    encode: [
      [Int(0), 0],
      [Int(1), 1],
    ],
    schema: {
      type: 'integer',
    },
  }));
  describeAsString(Int, () => [
    [Int(1), '1'],
    [Int(2), '2'],
  ]);
  describe('()', () => {
    it('returns or throw when wrong value', () => {
      expect(Int(1)).toBe(1);
      expect(() => {
        Int(1.1);
      }).toThrow(new TypeError('1.1 is not a valid Int'));
    });
  });

  describe('type', () => {
    it('should avoid type mismatch', () => {
      const square = (value: Int) => Int(value * value);
      // @ts-expect-error number is not a Int32
      square(0);

      square(Int(0));
    });
  });
});
