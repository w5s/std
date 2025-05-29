import { describe, it, expect } from 'vitest';
import { describeZero } from '../Testing.js';
import { NumberZero } from './NumberZero.js';

describe('NumberZero', () => {
  describeZero({ describe, it, expect })(NumberZero, {
    nonZero: () => [1, 2, -1],
  });
});
