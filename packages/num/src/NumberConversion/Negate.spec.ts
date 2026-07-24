import { describeNegate } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { Comparable } from './Comparable.js';
import { Negate } from './Negate.js';

describe(Negate, () => {
  describeNegate(
    { ...Negate(), ...Comparable() },
    {
      values: () => [
        [0, 0],
        [1, -1],
        [2, -2],
      ],
    },
  );

  const CustomConversion = {
    asNumber: (v: { custom: true; value: number }) => v.value,
    fromNumber: (v: number) => ({ custom: true, value: v }),
  };
  describeNegate(
    { ...Negate(CustomConversion), ...Comparable(CustomConversion) },
    {
      values: () => [
        [
          { custom: true, value: 0 },
          { custom: true, value: 0 },
        ],
        [
          { custom: true, value: 1 },
          { custom: true, value: -1 },
        ],
        [
          { custom: true, value: 2 },
          { custom: true, value: -2 },
        ],
      ],
    },
  );
});
