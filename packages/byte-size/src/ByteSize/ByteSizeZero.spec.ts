import { describe } from 'vitest';
import { describeZero } from '@w5s/core/dist/Testing.js';
import { ByteSizeZero } from './ByteSizeZero.js';

describe('ByteSizeZero', () => {
  describeZero(ByteSizeZero, {
    nonZero: () => [1, 2, -1],
  });
});
