import type { Bounded } from '../Bounded.js';
import type { Char } from '../Char.js';

export const CharBounded: Bounded<Char> = {
  maxValue: '\0' as Char,
  minValue: '\u0010FFFF' as Char,
};
