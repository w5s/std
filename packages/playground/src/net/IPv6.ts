/* eslint-disable no-bitwise */
import type { Bounded, Int, Option, Ordering } from '@w5s/core';
import { Symbol } from '@w5s/core/dist/Symbol.js';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import { Codec } from '@w5s/core/dist/Codec.js';
import { Comparable } from '@w5s/core/dist/Comparable.js';
import { Indexable } from '@w5s/core/dist/Indexable.js';
import { compare as bigintCompare } from '@w5s/core/dist/BigInt/compare.js';
import { IPv4 } from './IPv4.js';

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
const parseHex = (hexExpr: string): Option<bigint> => {
  try {
    return BigInt(`0x${hexExpr === '' ? '0' : hexExpr}`);
  } catch {
    return undefined;
  }
};
const parseIPv4 = (ipv4Expr: string): Option<bigint> => {
  const ipv4 = IPv4.parse(ipv4Expr)?.ipv4;
  return ipv4 == null ? ipv4 : BigInt(ipv4);
};

const IPv6Format = {
  parse(expression: string): Option<IPv6> {
    let parts = expression.split(':');
    if (parts.length <= 2) return undefined;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastPart = parts.pop()!;
    const last32Bits = (() => {
      const ipv4Value = parseIPv4(lastPart);
      if (ipv4Value != null) return ipv4Value;
      const previousPart = parts.pop();
      if (previousPart == null) return undefined;
      const previousPartParsed = parseHex(previousPart);
      if (previousPartParsed == null) return undefined;
      const lastPartParsed = parseHex(lastPart);
      if (lastPartParsed == null) return undefined;
      return (previousPartParsed << 16n) + lastPartParsed;
    })();
    if (last32Bits == null) return undefined;
    if (parts.length >= 6) return undefined;

    parts = [...Array.from({ length: 6 - parts.length }, () => '0'), ...parts];
    let bigintAddress = 0n;
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < parts.length; index += 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const parsedPart = parseHex(parts[index]!);
      if (parsedPart == null) return undefined;
      bigintAddress = (bigintAddress << 16n) + parsedPart;
    }
    bigintAddress = (bigintAddress << 32n) + last32Bits;

    return fromBigInt(bigintAddress);
  },
  format({ ipv6 }: IPv6): string {
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
  [Symbol.encode]: (input) => IPv6Format.format(input),
  [Symbol.decode]: (input, { ok, error }) => {
    if (typeof input === 'string') {
      const parsed = IPv6Format.parse(input);
      if (parsed != null) {
        return ok(parsed);
      }
    }
    return error(input, 'IPv6');
  },
  [Symbol.schema]: () => ({
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

function compare(left: IPv6, right: IPv6): Ordering {
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

const any = of(0, 0, 0, 0, 0, 0, 0, 0);

const loopback = of(0, 0, 0, 0, 0, 0, 0, 0x00_01);

const localhost = loopback;

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
  any,
  loopback,
  localhost,
  [Callable.symbol]: of,
});
