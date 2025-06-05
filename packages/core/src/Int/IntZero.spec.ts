import { describe } from 'vitest';
import { describeZero } from '../Testing.js';
import { IntZero } from './IntZero.js';

describe('IntZero', () => {
  describeZero(IntZero, {
    nonZero: () => [1, 2, -1],
  });
});
