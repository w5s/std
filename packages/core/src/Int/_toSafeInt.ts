import type { Int } from '../Int.js';
import { IntBounded } from './IntBounded.js';

const MIN_SAFE_INTEGER = IntBounded.minValue;
const MAX_SAFE_INTEGER = IntBounded.maxValue;

export const _toSafeInt = (value: number): Int =>
  value < MIN_SAFE_INTEGER
    ? MIN_SAFE_INTEGER
    : value > MAX_SAFE_INTEGER
      ? MAX_SAFE_INTEGER
      : value < 0
        ? (Math.ceil(value) as Int)
        : (Math.floor(value) as Int);
