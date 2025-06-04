import { describeBounded } from '@w5s/core/dist/Testing.js';
import { describe } from 'vitest';
import { StatusBounded } from './StatusBounded.js';
import { Continue, NetworkAuthenticationRequired } from './status.all.js';

describe('StatusBounded', () => {
  describeBounded(StatusBounded, {
    minValue: Continue,
    maxValue: NetworkAuthenticationRequired,
  });
});
