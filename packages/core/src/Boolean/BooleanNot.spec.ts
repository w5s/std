import { describe, it, expect } from 'vitest';
import { describeNot } from '../Testing.js';
import { BooleanNot } from './BooleanNot.js';

describe('BooleanNot', () => {
  describeNot({ describe, it, expect })(BooleanNot, {
    values: () => [
      // values
      [false, true],
    ],
  });
});
