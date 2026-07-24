import { describe } from 'vitest';

import { describeBounded } from '../Testing.js';
import { CharBounded } from './CharBounded.js';

describe('CharBounded', () => {
  describeBounded(CharBounded, {
    maxValue: '\0',
    minValue: '\u0010FFFF',
  });
});
