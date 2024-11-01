import { describe, it, expect } from 'vitest';
import { NotImplementedError } from './NotImplementedError.js';
import { describeError } from './Testing.js';

describe(NotImplementedError, () => {
  describeError({ describe, it, expect })(NotImplementedError, {
    defaultParameters: () => ({}),
    expectedName: 'NotImplementedError',
    expectedDefaultMessage: 'Not implemented',
  });
});
