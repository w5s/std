import { describe, expect, it } from 'vitest';

import { InvariantError } from './InvariantError.js';
import { describeError } from './Testing.js';

describe('InvariantError', () => {
  describeError({ describe, expect, it })(InvariantError, {
    defaultParameters: () => ({}),
    expectedDefaultMessage: 'An invariant error occurred',
    expectedName: 'InvariantError',
  });
});
