import { describe, it, expect } from 'vitest';
import {
  describeBounded,
  describeCodec,
  describeComparable,
  describeIndexable,
  describeType,
} from '@w5s/core/dist/Testing.js';
import { DecodeError, Result } from '@w5s/core';
import { IPv4 } from './IPv4.js';

describe('IPv4', () => {
  describeType({ describe, it, expect })(IPv4, {
    typeName: 'IPv4',
    instances: () => [IPv4(0xff_ff_ff_ff)],
    notInstances: () => [undefined, 0xff_ff_ff_ff, '127.0.0.1'],
  });
  describe('of', () => {
    it('should return an IPv4 instance', () => {
      expect(IPv4.of(0, 0, 0, 0)).toEqual(IPv4(0x00_00_00_00));
      expect(IPv4.of(127, 0, 0, 1)).toEqual(IPv4(0x7f_00_00_01));
      expect(IPv4.of(0, 0, 0, 1)).toEqual(IPv4(0x00_00_00_01));
      expect(IPv4.of(192, 168, 0, 1)).toEqual(IPv4(0xc0_a8_00_01));
      expect(IPv4.of(255, 255, 255, 255)).toEqual(IPv4(0xff_ff_ff_ff));
    });
  });
  describe('parse', () => {
    it('should return an IPv4 instance', () => {
      expect(IPv4.parse('127.0.0.1')).toEqual(IPv4.of(127, 0, 0, 1));
      expect(IPv4.parse('')).toEqual(undefined);
    });
  });
  describe('stringify', () => {
    it('should return an IPv4 instance', () => {
      const ip = IPv4.of(127, 0, 0, 1);
      expect(IPv4.stringify(ip)).toEqual('127.0.0.1');
    });
  });
  describeCodec({ describe, it, expect })(IPv4, {
    decode: [
      ['127.0.0.1', Result.Ok(IPv4.of(127, 0, 0, 1))],
      [null, Result.Error(DecodeError({ message: 'Cannot decode null as IPv4', input: null }))],
    ],
    encode: [
      [IPv4.of(127, 0, 0, 1), '127.0.0.1'],
      [IPv4.of(192, 168, 0, 1), '192.168.0.1'],
    ],
    schema: () => ({
      type: 'string',
      format: 'ipv4',
    }),
  });
  describeComparable({ describe, it, expect })(IPv4, {
    ordered: () => [
      // lower to higher
      IPv4.of(0, 0, 0, 0),
      IPv4.of(127, 0, 0, 1),
      IPv4.of(192, 168, 0, 1),
      IPv4.of(192, 168, 0, 255),
      IPv4.of(255, 255, 255, 255),
    ],
    equivalent: () => [
      [IPv4.of(0, 0, 0, 1), IPv4.of(0, 0, 0, 1)],
      [IPv4.of(192, 168, 0, 1), IPv4.of(192, 168, 0, 1)],
    ],
  });
  describeBounded({ describe, it, expect })(IPv4, {
    minValue: IPv4.of(0, 0, 0, 0),
    maxValue: IPv4.of(255, 255, 255, 255),
  });
  describeIndexable({ describe, it, expect })(IPv4, {
    index: [
      [IPv4.minValue.ipv4, IPv4.minValue],
      [IPv4.maxValue.ipv4, IPv4.maxValue],
    ],
    range: [
      [
        IPv4.of(192, 0, 0, 0),
        IPv4.of(192, 0, 0, 5),
        [
          IPv4.of(192, 0, 0, 0),
          IPv4.of(192, 0, 0, 1),
          IPv4.of(192, 0, 0, 2),
          IPv4.of(192, 0, 0, 3),
          IPv4.of(192, 0, 0, 4),
          IPv4.of(192, 0, 0, 5),
        ],
      ],
    ],
  });
});