import { describe, expect, it } from 'vitest';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { CodecError, Result } from '@w5s/core';
import { BigDecimal } from './BigDecimal.js';

describe('()', () => {
  it('constructs from parameters', () => {
    expect(BigDecimal(1n, 100)).toMatchObject({
      _: 'BigDecimal',
      value: 1n,
      scale: 100,
    });
  });
  describeType(BigDecimal, () => ({
    typeName: 'BigDecimal',
    instances: [BigDecimal.create({ value: 0n, scale: 0 }), BigDecimal.create({ value: -2n, scale: 0 })],
    notInstances: [null, undefined, '-2', 2],
    inspect: [
      [BigDecimal.create({ value: 0n, scale: 0 }), '0m'],
      [BigDecimal.create({ value: 11n, scale: 1 }), '1.1m'],
    ],
  }));
  describeCodec(BigDecimal, () => ({
    encode: [
      [BigDecimal.create({ value: 0n, scale: 0 }), '0m'],
      [BigDecimal.create({ value: 11n, scale: 1 }), '1.1m'],
    ],
    decode: [
      ['1.0m', Result.Ok(BigDecimal.create({ value: 10n, scale: 1 }))],
      ['-2.1m', Result.Ok(BigDecimal.create({ value: -21n, scale: 1 }))],
      ['2.1', Result.Error(new CodecError({ message: 'Cannot decode "2.1" as BigDecimal', input: '2.1' }))],
      [undefined, Result.Error(new CodecError({ message: 'Cannot decode undefined as BigDecimal', input: undefined }))],
      [null, Result.Error(new CodecError({ message: 'Cannot decode null as BigDecimal', input: null }))],
    ],
    schema: { type: 'string', format: 'bigdecimal' },
  }));
});
