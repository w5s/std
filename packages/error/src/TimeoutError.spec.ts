import { describe, expect, it } from 'vitest';

import { describeError } from './Testing.js';
import { TimeoutError } from './TimeoutError.js';

describe('TimeoutError', () => {
  describeError({ describe, expect, it })(TimeoutError, {
    defaultParameters: () => ({}),
    expectedDefaultMessage: 'Operation timed out',
    expectedName: 'TimeoutError',
  });
});
