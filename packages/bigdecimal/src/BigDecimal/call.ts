import { panic } from '@w5s/error/dist/panic.js';

import type { BigDecimalString } from '../BigDecimal.js';
import type { BigDecimal } from './BigDecimal.js';

import { of } from './of.js';
import { parse } from './parse.js';

export function call(stringValue: BigDecimalString): BigDecimal;
export function call(value: bigint, scale?: number): BigDecimal;
export function call(value: bigint | string, scale?: number): BigDecimal {
  return typeof value === 'string'
    ? (parse(value) ?? panic(new TypeError(`${value} is not a valid BigDecimal`)))
    : of(value, scale ?? 0);
}
