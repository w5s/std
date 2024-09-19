import { describeBounded } from '@w5s/core/dist/Testing.js';
import { describe, it, expect } from 'vitest';
import { StatusBounded } from './StatusBounded.js';
import { Continue, NetworkAuthenticationRequired } from './status.all.js';

describe('StatusBounded', () => {
  describeBounded({ describe, it, expect })(StatusBounded, {
    minValue: Continue,
    maxValue: NetworkAuthenticationRequired,
  });
});
