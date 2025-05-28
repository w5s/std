import { describe, it, expect } from 'vitest';
import { IntNegate } from './IntNegate.js';
import { Int } from '../Int.js';
import { describeNegate } from '../Testing.js';
import { IntComparable } from './IntComparable.js';

describe('IntNegate', () => {
  describeNegate({ describe, it, expect })(
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
