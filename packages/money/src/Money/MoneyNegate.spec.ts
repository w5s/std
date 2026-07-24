import { describeNegate } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';

import { ANY } from '../Testing.js';
import { MoneyComparable } from './MoneyComparable.js';
import { MoneyNegate } from './MoneyNegate.js';

describe('MoneyNegate', () => {
  describeNegate(
    { ...MoneyNegate, ...MoneyComparable },
    {
      values: () => [
        [ANY('0'), ANY('0')],
        [ANY('0.5'), ANY('-0.5')],
        [ANY('1'), ANY('-1')],
      ],
    },
  );
});
