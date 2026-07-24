import { describeZero } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Zero } from './Zero.js';

describe(Zero, () => {
  describeZero(Zero(), {
    nonZero: () => [1, 2, -1],
  });
  const CustomConversion = {
    asNumber: (v: { custom: true; value: number }) => v.value,
    fromNumber: (v: number) => ({ custom: true, value: v }),
  };
  describeZero(Zero(CustomConversion), {
    nonZero: () => [
      { custom: true, value: 1 },
      { custom: true, value: 2 },
      { custom: true, value: -1 },
    ],
  });
});
