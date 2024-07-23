import { describe, expect, it } from 'vitest';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { DecodeError, Result } from '@w5s/core';
import { BigDecimal } from './BigDecimal.js';

describe('()', () => {
  it('constructs from parameters', () => {
    expect(BigDecimal(1n, 100)).toEqual({
      _: 'BigDecimal',
      value: 1n,
      scale: 100,
    });
    expect(BigDecimal(1n)).toEqual({
      _: 'BigDecimal',
      value: 1n,
      scale: 0,
    });
  });
  it('constructs from string', () => {
    expect(BigDecimal('2')).toEqual(BigDecimal(2n, 0));
    expect(BigDecimal('-2')).toEqual(BigDecimal(-2n, 0));
    expect(BigDecimal('0.123')).toEqual(BigDecimal(123n, 3));
    expect(BigDecimal('200')).toEqual(BigDecimal(200n, 0));
    expect(BigDecimal('20000000')).toEqual(BigDecimal(20_000_000n, 0));
    expect(BigDecimal('-20000000')).toEqual(BigDecimal(-20_000_000n, 0));
    expect(BigDecimal('2.00')).toEqual(BigDecimal(200n, 2));
    expect(BigDecimal('0.0000200')).toEqual(BigDecimal(200n, 7));
    // expect(BigDecimal('')).toEqual(BigDecimal.normalize(BigDecimal(0n, 0)));
    // @ts-expect-error A is not valid
    expect(() => BigDecimal('A')).toThrow(new Error('A is not a valid BigDecimal'));
    expect(() => BigDecimal('1E5')).toThrow(new Error('1E5 is not a valid BigDecimal'));
  });
  describeType({ describe, it, expect })(BigDecimal, {
    typeName: 'BigDecimal',
    instances: () => [BigDecimal('0'), BigDecimal('-2')],
    notInstances: () => [null, undefined, '-2', 2],
  });
  describeCodec({ describe, it, expect })(BigDecimal, {
    encode: [
      [BigDecimal('0'), '0m'],
      [BigDecimal('1.1'), '1.1m'],
    ],
    decode: [
      ['1.0m', Result.Ok(BigDecimal('1.0'))],
      ['-2.1m', Result.Ok(BigDecimal('-2.1'))],
      ['2.1', Result.Error(DecodeError({ message: 'Cannot decode 2.1 as BigDecimal', input: '2.1' }))],
      [undefined, Result.Error(DecodeError({ message: 'Cannot decode undefined as BigDecimal', input: undefined }))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as BigDecimal', input: null }))],
    ],
    schema: () => ({ type: 'string', format: 'bigdecimal' }),
  });
});
