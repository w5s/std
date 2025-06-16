import { describe } from 'vitest';
import { describeNegate } from '@w5s/core/dist/Testing.js';
import { NumberNegate } from './NumberNegate.js';
import { NumberComparable } from './NumberComparable.js';

describe('NumberNegate', () => {
  describeNegate(
    { ...NumberNegate, ...NumberComparable },
    {
      values: () => [
        [0, 0],
        [0.5, -0.5],
        [1, -1],
      ],
    },
  );
});
