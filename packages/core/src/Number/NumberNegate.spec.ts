import { describe, it, expect } from 'vitest';
import { NumberNegate } from './NumberNegate.js';
import { describeNegate } from '../Testing.js';
import { NumberComparable } from './NumberComparable.js';

describe('NumberNegate', () => {
  describeNegate({ describe, it, expect })(
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
