import { describeBounded } from '@w5s/core/Testing';
import { describe } from 'vitest';
import { StatusBounded } from './StatusBounded.js';
import { Continue, NetworkAuthenticationRequired } from './status.all.js';

describe('StatusBounded', () => {
  describeBounded(StatusBounded, {
    minValue: Continue,
    maxValue: NetworkAuthenticationRequired,
  });
});
