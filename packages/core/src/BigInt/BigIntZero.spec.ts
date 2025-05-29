import { describe, it, expect } from 'vitest';
import { describeZero } from '../Testing.js';
import { BigIntZero } from './BigIntZero.js';

describe('BigIntZero', () => {
  describeZero({ describe, it, expect })(BigIntZero, {
    nonZero: () => [1n, 2n, -1n],
  });
});
