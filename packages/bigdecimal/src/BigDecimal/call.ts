import { panic } from '@w5s/error/dist/panic.js';
import { of } from './of.js';
import { parse } from './parse.js';
import type { BigDecimalString } from '../BigDecimal.js';
import type { BigDecimal } from './BigDecimal.js';

export function call(stringValue: BigDecimalString): BigDecimal;
export function call(value: bigint, scale?: number): BigDecimal;
export function call(value: string | bigint, scale?: number): BigDecimal {
  return typeof value === 'string'
    ? (parse(value) ?? panic(new TypeError(`${String(value)} is not a valid BigDecimal`)))
    : of(value, scale ?? 0);
}
