import { describe, it, expect } from 'vitest';
import { InvariantError } from './InvariantError.js';
import { describeCustomError } from './Testing.js';

describe('InvariantError', () => {
  describeCustomError({ describe, it, expect })(InvariantError, {
    defaultParameters: () => ({}),
    expectedName: 'InvariantError',
    expectedDefaultMessage: 'An invariant error occurred',
  });
});
