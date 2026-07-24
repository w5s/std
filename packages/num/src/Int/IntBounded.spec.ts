import { describeBounded } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { IntBounded } from './IntBounded.js';

describe('IntBounded', () => {
  describeBounded(IntBounded, {
    maxValue: Number.MAX_SAFE_INTEGER,
    minValue: Number.MIN_SAFE_INTEGER,
  });
});
