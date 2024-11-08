import { describe, it, expect } from 'vitest';
import {
  describeBounded,
  describeCodec,
  describeComparable,
  describeIndexable,
  describeType,
} from '@w5s/core/dist/Testing.js';
import { DecodeError, Result } from '@w5s/core';
import { IPv6 } from './IPv6.js';

describe('IPv6', () => {
  describeType({ describe, it, expect })(IPv6, {
    typeName: 'IPv6',
    instances: () => [IPv6(0xff_ff, 0xff_ff, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x7f_00, 0x00_01)],
    notInstances: () => [undefined, 0xff_ff, '::ffff:127.0.0.1'],
  });

  describe('of', () => {
    it('should return an IPv6 instance', () => {
      expect(IPv6.of(0, 0, 0, 0, 0, 0, 0, 1)).toEqual(
        IPv6(0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_01),
      );
      expect(IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 0x00_01)).toEqual(
        IPv6(0xff_ff, 0xff_ff, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0xc0_a8, 0x00_01),
      );
    });
  });

  describe('parse', () => {
    it('should return an IPv6 instance', () => {
      expect(IPv6.parse('::ffff:7f00:1')).toEqual(
        IPv6.of(0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0xff_ff, 0x7f_00, 0x00_01),
      );
      // expect(IPv6.parse('::ffff:127.0.0.1')).toEqual(
      //   IPv6.of(0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0xff_ff, 0x7f_00, 0x00_01),
      // );
      expect(IPv6.parse('')).toEqual(undefined);
    });
  });

  describe('stringify', () => {
    it('should return an IPv6 address as a string', () => {
      const ip = IPv6.of(0, 0, 0, 0, 0, 0xff_ff, 0x7f_00, 0x00_01);
      expect(IPv6.stringify(ip)).toEqual('::ffff:7f00:1');
    });
  });

  describeCodec({ describe, it, expect })(IPv6, {
    decode: [
      ['::ffff:7f00:1', Result.Ok(IPv6.of(0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0xff_ff, 0x7f_00, 0x00_01))],
      // ['::ffff:127.0.0.1', Result.Ok(IPv6.of(0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0xff_ff, 0x7f_00, 0x00_01))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as IPv6', input: null }))],
    ],
    encode: [[IPv6.of(0x00_00, 0x00_00, 0x00_00, 0x00_00, 0x00_00, 0xff_ff, 0x7f_00, 0x00_01), '::ffff:7f00:1']],
    schema: () => ({
      type: 'string',
      format: 'ipv6',
    }),
  });

  describeComparable({ describe, it, expect })(IPv6, {
    ordered: () => [
      IPv6.of(0, 0, 0, 0, 0, 0, 0, 0),
      IPv6.of(0, 0, 0, 0, 0, 0, 0, 1),
      IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0, 0),
      IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 0x00_01),
    ],
    equivalent: () => [[IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0, 1), IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0, 1)]],
  });

  describeBounded({ describe, it, expect })(IPv6, {
    minValue: IPv6.of(0, 0, 0, 0, 0, 0, 0, 0),
    maxValue: IPv6.of(0xff_ff, 0xff_ff, 0xff_ff, 0xff_ff, 0xff_ff, 0xff_ff, 0xff_ff, 0xff_ff),
  });

  describeIndexable({ describe, it, expect })(IPv6, {
    index: [
      [IPv6.minValue.ipv6, IPv6.minValue],
      [IPv6.maxValue.ipv6, IPv6.maxValue],
    ],
    range: [
      [
        IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 0),
        IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 5),
        [
          IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 0),
          IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 1),
          IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 2),
          IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 3),
          IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 4),
          IPv6.of(0xff_ff, 0xff_ff, 0, 0, 0, 0, 0xc0_a8, 5),
        ],
      ],
    ],
  });
});
