import { CodecError, Result } from '@w5s/core';
import { describeCodec, describeType } from '@w5s/core/dist/Testing.js';
import { describe, expect, it } from 'vitest';

import { BigDecimal } from './BigDecimal.js';

describe('()', () => {
  it('constructs from parameters', () => {
    expect(BigDecimal(1n, 100)).toMatchObject({
      _: 'BigDecimal',
      scale: 100,
      value: 1n,
    });
  });
  describeType(BigDecimal, () => ({
    inspect: [
      [BigDecimal.create({ scale: 0, value: 0n }), '0m'],
      [BigDecimal.create({ scale: 1, value: 11n }), '1.1m'],
    ],
    instances: [BigDecimal.create({ scale: 0, value: 0n }), BigDecimal.create({ scale: 0, value: -2n })],
    notInstances: [null, undefined, '-2', 2],
    typeName: 'BigDecimal',
  }));
  describeCodec(BigDecimal, () => ({
    decode: [
      ['1.0m', Result.Ok(BigDecimal.create({ scale: 1, value: 10n }))],
      ['-2.1m', Result.Ok(BigDecimal.create({ scale: 1, value: -21n }))],
      ['2.1', Result.Error(new CodecError({ input: '2.1', message: 'Cannot decode "2.1" as BigDecimal' }))],
      [undefined, Result.Error(new CodecError({ input: undefined, message: 'Cannot decode undefined as BigDecimal' }))],
      [null, Result.Error(new CodecError({ input: null, message: 'Cannot decode null as BigDecimal' }))],
    ],
    encode: [
      [BigDecimal.create({ scale: 0, value: 0n }), '0m'],
      [BigDecimal.create({ scale: 1, value: 11n }), '1.1m'],
    ],
    schema: { format: 'bigdecimal', type: 'string' },
  }));
});
