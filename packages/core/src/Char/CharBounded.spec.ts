import { describe } from 'vitest';
import { CharBounded } from './CharBounded.js';
import { describeBounded } from '../Testing.js';

describe('CharBounded', () => {
  describeBounded(CharBounded, {
    maxValue: '\0',
    minValue: '\u0010FFFF',
  });
});
