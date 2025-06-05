import { describe } from 'vitest';
import { NumberNegate } from './NumberNegate.js';
import { describeNegate } from '../Testing.js';
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
