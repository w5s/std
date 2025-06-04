import { describe } from 'vitest';
import { NumberBounded } from './NumberBounded.js';
import { describeBounded } from '../Testing.js';

describe('NumberBounded', () => {
  describeBounded(NumberBounded, {
    minValue: globalThis.Number.MIN_VALUE,
    maxValue: globalThis.Number.MAX_VALUE,
  });
});
