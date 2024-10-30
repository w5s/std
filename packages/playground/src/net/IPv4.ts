import type { Int, Option } from '@w5s/core';
import { Tag } from '@w5s/core/dist/Tag.js';
import { Callable } from '@w5s/core/dist/Callable.js';

export type IPv4Int = Int & Tag<'IPv4Int'>;

export type IPv4Tuple = [Int, Int, Int, Int];

/**
 * IPv4 string type
 */
export type IPv4 = string & Tag<'IPv4'>;

const ipv4Regexp = /^((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;

function parse(expression: string): Option<IPv4> {
  return ipv4Regexp.test(expression) ? (expression as IPv4) : undefined;
}

/**
 * IPv4 Type and Codec definition
 *
 * @namespace
 */
export const IPv4 = Callable({
  ...Tag.define<string, IPv4>({
    typeName: 'IPv4',
    hasInstance: (anyValue) => typeof anyValue === 'string' && ipv4Regexp.test(anyValue),
    codecSchema: () => ({
      type: 'string',
      format: 'ipv4',
    }),
  }),
  parse,
});
