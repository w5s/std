import { describe } from 'vitest';
import { describeZero } from '../Testing.js';
import { BigIntZero } from './BigIntZero.js';

describe('BigIntZero', () => {
  describeZero(BigIntZero, {
    nonZero: () => [1n, 2n, -1n],
  });
});
