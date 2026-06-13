import { describeBounded } from '@w5s/core/Testing';
import { describe } from 'vitest';

import { Continue, NetworkAuthenticationRequired } from './status.all.js';
import { StatusBounded } from './StatusBounded.js';

describe('StatusBounded', () => {
  describeBounded(StatusBounded, {
    maxValue: NetworkAuthenticationRequired,
    minValue: Continue,
  });
});
