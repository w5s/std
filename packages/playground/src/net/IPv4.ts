/* eslint-disable no-bitwise */
import type { Codec, Int, Option } from '@w5s/core';
import { Struct } from '@w5s/core/dist/Struct.js';
import { Callable } from '@w5s/core/dist/Callable.js';
import { NotImplementedError, throwError } from '@w5s/error';

// const ipv4Regexp = /^((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;

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
  parse(_expression: string): Option<IPv4> {
    throwError(NotImplementedError());
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

/**
 * IPv4 Type and Codec definition
 *
 * @namespace
 */
export const IPv4 = Callable({
  ...IPv4Type,
  ...IPv4Codec,
  ...IPv4Format,
  fromNumber,
  of,
  [Callable.symbol]: fromNumber,
});
