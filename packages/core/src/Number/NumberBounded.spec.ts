import { describe, it, expect } from 'vitest';
import { NumberBounded } from './NumberBounded.js';
import { describeBounded } from '../Testing.js';

describe('NumberBounded', () => {
  describeBounded({ describe, it, expect })(NumberBounded, {
    minValue: globalThis.Number.MIN_VALUE,
    maxValue: globalThis.Number.MAX_VALUE,
  });
});
