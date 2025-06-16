import type { Bounded } from '@w5s/core';

export const NumberBounded: Bounded<number> = {
  minValue: globalThis.Number.MIN_VALUE,
  maxValue: globalThis.Number.MAX_VALUE,
};
