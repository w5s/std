/* eslint-disable no-bitwise */
import type { Bounded, Codec, Int, Option } from '@w5s/core';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import { Comparable } from '@w5s/core/dist/Comparable.js';
import { Indexable } from '@w5s/core/dist/Indexable.js';
import { compare as bigintCompare } from '@w5s/core/dist/BigInt/compare.js';

export type IPv6Address = bigint;

/**
 * IPv6 string type
 */
export interface IPv6
  extends Struct<{
    [Struct.type]: 'IPv6';
    ipv6: IPv6Address;
  }> {}
const IPv6Type = Struct.define<IPv6>('IPv6');

const bigIntByteAt = (ipv6Value: bigint, index: number) =>
  Number((ipv6Value >> BigInt((7 - index) * 16)) & 0xff_ffn) as Int;
const bigIntStringifyAt = (ipv6Value: bigint, index: number): string => {
  const byte = bigIntByteAt(ipv6Value, index);
  return byte === 0 ? '' : byte.toString(16);
};

const IPv6Format = {
  parse(expression: string): Option<IPv6> {
    let parts = expression.split(':');
    if (parts.length >= 3 && parts.length <= 8) {
      parts = [...Array.from({ length: 8 - parts.length }, () => '0'), ...parts];

      // Convert each part to a 16-bit integer, then shift and combine
      const bigintAddress = parts.reduce((acc, part) => (acc << 16n) + BigInt(`0x${part === '' ? '0' : part}`), 0n);
      return fromBigInt(bigintAddress);
    }

    return undefined;
  },

  stringify({ ipv6 }: IPv6): string {
    // Convert bigint to 8 segments of 16-bit hex values
    return [
      bigIntStringifyAt(ipv6, 0),
      bigIntStringifyAt(ipv6, 1),
      bigIntStringifyAt(ipv6, 2),
      bigIntStringifyAt(ipv6, 3),
      bigIntStringifyAt(ipv6, 4),
      bigIntStringifyAt(ipv6, 5),
      bigIntStringifyAt(ipv6, 6),
      bigIntStringifyAt(ipv6, 7),
    ]
      .join(':')
      .replaceAll(/^(:){2,}/g, '::');
  },
};

const IPv6Codec: Codec<IPv6> = {
  codecEncode: (input) => IPv6Format.stringify(input),
  codecDecode: (input, { ok, error }) => {
    if (typeof input === 'string') {
      const parsed = IPv6Format.parse(input);
      if (parsed != null) {
        return ok(parsed);
      }
    }
    return error(input, 'IPv6');
  },
  codecSchema: () => ({
    type: 'string',
    format: 'ipv6',
  }),
};

function fromBigInt(value: bigint): IPv6 {
  return IPv6Type({ ipv6: value });
}

function of(...parts: [number, number, number, number, number, number, number, number]): IPv6 {
  const bigintAddress = parts.reduce((acc, part) => (acc << 16n) + BigInt(part), 0n);
  return fromBigInt(bigintAddress);
}

function compare(left: IPv6, right: IPv6): number {
  return bigintCompare(left.ipv6, right.ipv6);
}

const IPv6Comparable = Comparable<IPv6>({
  compare,
});

const IPv6Bounded: Bounded<IPv6> = {
  minValue: fromBigInt(0n),
  maxValue: fromBigInt(0xff_ff_ff_ff_ff_ff_ff_ff_ff_ff_ff_ff_ff_ff_ff_ffn),
};

const IPv6Indexable = Indexable<IPv6, bigint>({
  indexType: 'bigint',
  at: (index) => fromBigInt(index),
  indexOf: (value) => value.ipv6,
});

/**
 * IPv6 Type and Codec definition
 *
 * @namespace
 */
export const IPv6 = Callable({
  ...IPv6Type,
  ...IPv6Codec,
  ...IPv6Format,
  ...IPv6Comparable,
  ...IPv6Bounded,
  ...IPv6Indexable,
  fromBigInt,
  of,
  [Callable.symbol]: of,
});
