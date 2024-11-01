import { describe, it, expect } from 'vitest';
import { InvariantError } from './InvariantError.js';
import { describeError } from './Testing.js';

describe('InvariantError', () => {
  describeError({ describe, it, expect })(InvariantError, {
    defaultParameters: () => ({}),
    expectedName: 'InvariantError',
    expectedDefaultMessage: 'An invariant error occurred',
  });
});
