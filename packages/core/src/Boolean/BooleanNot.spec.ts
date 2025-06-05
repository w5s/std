import { describe } from 'vitest';
import { describeNot } from '../Testing.js';
import { BooleanNot } from './BooleanNot.js';

describe('BooleanNot', () => {
  describeNot(BooleanNot, {
    values: () => [
      // values
      [false, true],
    ],
  });
});
