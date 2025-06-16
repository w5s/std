import type { Bounded } from '@w5s/core';
import type { Int } from '../Int.js';

export const IntBounded: Bounded<Int> = {
  maxValue: Number.MAX_SAFE_INTEGER as Int,
  minValue: Number.MIN_SAFE_INTEGER as Int,
};
