import { describe, it, expect } from 'vitest';
import { describeZero } from '../Testing.js';
import { IntZero } from './IntZero.js';

describe('IntZero', () => {
  describeZero({ describe, it, expect })(IntZero, {
    nonZero: () => [1, 2, -1],
  });
});
