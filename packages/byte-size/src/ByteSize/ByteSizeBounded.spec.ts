import { describe } from 'vitest';
import { describeBounded } from '@w5s/core/dist/Testing.js';
import { ByteSizeBounded } from './ByteSizeBounded.js';

describe('ByteSizeBounded', () => {
  describeBounded(ByteSizeBounded, {
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
  });
});
