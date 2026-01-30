import type { IntConversion } from '../IntConversion.js';
import type { NumberConversion } from '../NumberConversion.js';

export function __toNumberConversion<T>(intConversion: IntConversion<T>): NumberConversion<T> {
  const { fromInt, asInt } = intConversion;
  return {
    fromNumber: fromInt,
    asNumber: asInt,
  };
}
