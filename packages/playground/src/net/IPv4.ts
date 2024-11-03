/* eslint-disable no-bitwise */
import { Comparable, type Codec, type Int, type Option } from '@w5s/core';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import { compare as numberCompare } from '@w5s/core/dist/Number/compare.js';

export type IPv4Address = Int;

/**
 * IPv4 string type
 */
export interface IPv4
  extends Struct<{
    [Struct.type]: 'IPv4';
    ipv4: IPv4Address;
  }> {}
const IPv4Type = Struct.define<IPv4>('IPv4');

const IPv4Format = {
  parse(expression: string): Option<IPv4> {
    const parts = expression.split('.');

    // Check for exactly 4 parts
    if (parts.length === 4) {
      // Parse each part and ensure it’s a valid number between 0 and 255
      const result = parts.map((part) => {
        const num = Number.parseInt(part, 10);
        return num >= 0 && num <= 255 ? num : undefined;
      });

      // If any part is undefined, the IP is invalid
      if (!result.includes(undefined)) {
        return of(...(result as [number, number, number, number]));
      }
    }
    return undefined;
  },
  stringify({ ipv4 }: IPv4): string {
    return `${(ipv4 >>> 24) & 0xff}.${(ipv4 >>> 16) & 0xff}.${(ipv4 >>> 8) & 0xff}.${ipv4 & 0xff}`;
  },
};

const IPv4Codec: Codec<IPv4> = {
  codecEncode: (input) => IPv4Format.stringify(input),
  codecDecode: (input, { ok, error }) => {
    if (typeof input === 'string') {
      const parsed = IPv4Format.parse(input);
      if (parsed != null) {
        return ok(parsed);
      }
    }
    return error(input, 'IPv4');
  },
  codecSchema: () => ({
    type: 'string',
    format: 'ipv4',
  }),
};

function fromNumber(value: number): IPv4 {
  return IPv4Type({ ipv4: (value & 0xff_ff_ff_ff) as IPv4Address });
}

function of(_0: number, _1: number, _2: number, _3: number) {
  return IPv4Type({ ipv4: ((_0 << 24) | (_1 << 16) | (_2 << 8) | _3) as IPv4Address });
}

function compare(left: IPv4, right: IPv4): number {
  return numberCompare(left.ipv4 >>> 0, right.ipv4 >>> 0);
}

const IPv4Comparable = Comparable<IPv4>({
  compare,
});

/**
 * IPv4 Type and Codec definition
 *
 * @namespace
 */
export const IPv4 = Callable({
  ...IPv4Type,
  ...IPv4Codec,
  ...IPv4Format,
  ...IPv4Comparable,
  fromNumber,
  of,
  [Callable.symbol]: fromNumber,
});
