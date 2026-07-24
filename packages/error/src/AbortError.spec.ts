import { describe, expect, it } from 'vitest';

import { AbortError } from './AbortError.js';
import { describeError } from './Testing.js';

describe(AbortError, () => {
  describeError({ describe, expect, it })(AbortError, {
    defaultParameters: () => ({}),
    expectedDefaultMessage: 'This operation was aborted',
    expectedName: 'AbortError',
  });
});
