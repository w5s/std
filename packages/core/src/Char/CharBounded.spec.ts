import { describe, it, expect } from 'vitest';
import { CharBounded } from './CharBounded.js';
import { describeBounded } from '../Testing.js';

describe('CharBounded', () => {
  describeBounded({ describe, it, expect })(CharBounded, {
    maxValue: '\0',
    minValue: '\u0010FFFF',
  });
});
