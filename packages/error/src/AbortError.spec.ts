import { describe, it, expect } from 'vitest';
import { AbortError } from './AbortError.js';
import { describeError } from './Testing.js';

describe(AbortError, () => {
  describeError({ describe, it, expect })(AbortError, {
    defaultParameters: () => ({}),
    expectedName: 'AbortError',
    expectedDefaultMessage: 'The operation was aborted',
  });
});
