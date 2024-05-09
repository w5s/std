import type { Bounded } from '../Bounded.js';

export const NumberBounded: Bounded<number> = {
  minValue: globalThis.Number.MIN_VALUE,
  maxValue: globalThis.Number.MAX_VALUE,
};
