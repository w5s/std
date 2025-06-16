import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { NumberBounded } from './NumberBounded.js';

describe('NumberBounded', () => {
  describeBounded(NumberBounded, {
    minValue: globalThis.Number.MIN_VALUE,
    maxValue: globalThis.Number.MAX_VALUE,
  });
});
