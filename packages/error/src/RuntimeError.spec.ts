import { describe, expect, it } from 'vitest';

import { RuntimeError } from './RuntimeError.js';
import { describeError } from './Testing.js';

describe(RuntimeError, () => {
  describeError({ describe, expect, it })(RuntimeError, {
    defaultParameters: () => ({}),
    expectedDefaultMessage: 'An error occurred during program execution',
    expectedName: 'RuntimeError',
  });
});
