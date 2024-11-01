import { describe, it, expect } from 'vitest';
import { TimeoutError } from './TimeoutError.js';
import { describeError } from './Testing.js';

describe('TimeoutError', () => {
  describeError({ describe, it, expect })(TimeoutError, {
    defaultParameters: () => ({}),
    expectedName: 'TimeoutError',
    expectedDefaultMessage: 'Operation timed out',
  });
});
