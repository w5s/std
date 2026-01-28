import { describe } from 'vitest';
import { describeNegate } from '@w5s/core/dist/Testing.js';
import { Negate } from './Negate.js';
import { Int } from '../Int.js';
import { Comparable } from './Comparable.js';

describe(Negate, () => {
  describeNegate(
    { ...Negate(), ...Comparable() },
    {
      values: () => [
        [Int(0), Int(0)],
        [Int(1), Int(-1)],
        [Int(2), Int(-2)],
      ],
    },
  );

  const CustomConversion = {
    fromInt: (v: Int) => ({ custom: true, value: v }),
    asInt: (v: { custom: true; value: Int }) => v.value,
  };
  describeNegate(
    { ...Negate(CustomConversion), ...Comparable(CustomConversion) },
    {
      values: () => [
        [
          { custom: true, value: Int(0) },
          { custom: true, value: Int(0) },
        ],
        [
          { custom: true, value: Int(1) },
          { custom: true, value: Int(-1) },
        ],
        [
          { custom: true, value: Int(-2) },
          { custom: true, value: Int(2) },
        ],
      ],
    },
  );
});
