import { describeBounded } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Bounded } from './Bounded.js';

describe(Bounded, () => {
  describeBounded(Bounded(), {
    maxValue: Number.MAX_VALUE,
    minValue: Number.MIN_VALUE,
  });
  describeBounded(
    Bounded({
      fromNumber: (v) => ({ custom: true, value: v }),
    }),
    {
      maxValue: { custom: true, value: Number.MAX_VALUE },
      minValue: { custom: true, value: Number.MIN_VALUE },
    },
  );
});
