import { describe } from 'vitest';
import { describeComparable } from '@w5s/core/dist/Testing.js';
import { Int } from '../Int.js';
import { Comparable } from './Comparable.js';

describe(Comparable, () => {
  describeComparable(Comparable(), {
    ordered: () => [Int(-1), Int(0), Int(1)],
    equivalent: () => [
      [Int(0), Int(0)],
      [Int(1), Int(1)],
      [Int(-1), Int(-1)],
    ],
  });
  describeComparable(
    Comparable({
      asNumber: (v: { custom: true; value: number }) => v.value,
    }),
    {
      ordered: () => [
        { custom: true, value: -1 },
        { custom: true, value: 0 },
        { custom: true, value: 1 },
      ],
      equivalent: () => [
        [
          { custom: true, value: 0 },
          { custom: true, value: 0 },
        ],
        [
          { custom: true, value: 1 },
          { custom: true, value: 1 },
        ],
        [
          { custom: true, value: -1 },
          { custom: true, value: -1 },
        ],
      ],
    },
  );
});
