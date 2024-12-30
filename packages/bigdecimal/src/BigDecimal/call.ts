import { throwError } from '@w5s/error/dist/throwError.js';
import { of } from './of.js';
import { parse } from './parse.js';
import type { BigDecimalString } from '../BigDecimal.js';
import type { BigDecimal } from './BigDecimal.js';

export function call(stringValue: BigDecimalString): BigDecimal;
export function call(value: bigint, scale?: number): BigDecimal;
export function call(value: string | bigint, scale?: number): BigDecimal {
  return typeof value === 'string'
    ? (parse(value) ?? throwError(new TypeError(`${String(value)} is not a valid BigDecimal`)))
    : of(value, scale ?? 0);
}
