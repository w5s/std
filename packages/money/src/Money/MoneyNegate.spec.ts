import { describe } from 'vitest';
import { describeNegate } from '@w5s/core/dist/Testing.js';
import { MoneyNegate } from './MoneyNegate.js';
import { MoneyComparable } from './MoneyComparable.js';
import { ANY } from '../Testing.js';

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
