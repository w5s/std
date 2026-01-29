import { describe } from 'vitest';
import { describeZero } from '@w5s/core/dist/Testing.js';
import { Zero } from './Zero.js';

describe(Zero, () => {
  describeZero(Zero(), {
    nonZero: () => [1, 2, -1],
  });
  const CustomConversion = {
    fromNumber: (v: number) => ({ custom: true, value: v }),
    asNumber: (v: { custom: true; value: number }) => v.value,
  };
  describeZero(Zero(CustomConversion), {
    nonZero: () => [
      { custom: true, value: 1 },
      { custom: true, value: 2 },
      { custom: true, value: -1 },
    ],
  });
});
