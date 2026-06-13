import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/Testing';
import { IntBounded } from './IntBounded.js';

describe('IntBounded', () => {
  describeBounded(IntBounded, {
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
  });
});
