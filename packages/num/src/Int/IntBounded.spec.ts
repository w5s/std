import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { IntBounded } from './IntBounded.js';

describe('IntBounded', () => {
  describeBounded(IntBounded(), {
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
  });
  describeBounded(
    IntBounded({
      fromInt: (v) => ({ custom: true, value: v }),
    }),
    {
      minValue: { custom: true, value: Number.MIN_SAFE_INTEGER },
      maxValue: { custom: true, value: Number.MAX_SAFE_INTEGER },
    },
  );
});
