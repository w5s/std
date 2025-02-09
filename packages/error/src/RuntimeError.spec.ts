import { describe, it, expect } from 'vitest';
import { RuntimeError } from './RuntimeError.js';
import { describeError } from './Testing.js';

describe(RuntimeError, () => {
  describeError({ describe, it, expect })(RuntimeError, {
    defaultParameters: () => ({}),
    expectedName: 'RuntimeError',
    expectedDefaultMessage: 'An error occurred during program execution',
  });
});
