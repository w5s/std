import { describe } from 'vitest';
import { IntBounded } from './IntBounded.js';
import { describeBounded } from '../Testing.js';

describe('IntBounded', () => {
  describeBounded(IntBounded, {
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
  });
});
