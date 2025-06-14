import { describe } from 'vitest';
import { describeZero } from '@w5s/core/dist/Testing.js';
import { BigIntZero } from './BigIntZero.js';

describe('BigIntZero', () => {
  describeZero(BigIntZero, {
    nonZero: () => [1n, 2n, -1n],
  });
});
