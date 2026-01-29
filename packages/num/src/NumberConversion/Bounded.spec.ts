import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { Bounded } from './Bounded.js';

describe(Bounded, () => {
  describeBounded(Bounded(), {
    minValue: Number.MIN_VALUE,
    maxValue: Number.MAX_VALUE,
  });
  describeBounded(
    Bounded({
      fromNumber: (v) => ({ custom: true, value: v }),
    }),
    {
      minValue: { custom: true, value: Number.MIN_VALUE },
      maxValue: { custom: true, value: Number.MAX_VALUE },
    },
  );
});
