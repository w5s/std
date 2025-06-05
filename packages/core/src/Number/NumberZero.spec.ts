import { describe } from 'vitest';
import { describeZero } from '../Testing.js';
import { NumberZero } from './NumberZero.js';

describe('NumberZero', () => {
  describeZero(NumberZero, {
    nonZero: () => [1, 2, -1],
  });
});
