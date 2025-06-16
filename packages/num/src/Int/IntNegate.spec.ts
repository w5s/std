import { describe } from 'vitest';
import { describeNegate } from '@w5s/core/dist/Testing.js';
import { IntNegate } from './IntNegate.js';
import { Int } from '../Int.js';
import { IntComparable } from './IntComparable.js';

describe('IntNegate', () => {
  describeNegate(
    { ...IntNegate, ...IntComparable },
    {
      values: () => [
        [Int(0), Int(0)],
        [Int(1), Int(-1)],
        [Int(2), Int(-2)],
      ],
    },
  );
});
