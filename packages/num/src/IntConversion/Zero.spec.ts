import { describe } from 'vitest';
import { describeZero } from '@w5s/core/dist/Testing.js';
import { Zero } from './Zero.js';
import type { Int } from '../index.js';

describe(Zero, () => {
  describeZero(Zero(), {
    nonZero: () => [1, 2, -1],
  });
  const CustomConversion = {
    fromInt: (v: Int) => ({ custom: true, value: v }),
    asInt: (v: { custom: true; value: Int }) => v.value,
  };
  describeZero(Zero(CustomConversion), {
    nonZero: () => [
      { custom: true, value: 1 },
      { custom: true, value: 2 },
      { custom: true, value: -1 },
    ],
  });
});
